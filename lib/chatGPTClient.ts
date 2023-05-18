import { Character } from '@/lib/app.types';
import { supabase } from '@/lib/supabaseClient';
import sharp from 'sharp';

type GenerateCharacterResponse = {
  character: Character;
  imageUrl: string;
}

export class ChatGPTClient {
  private apiKey: string;
  private apiEndpoint: string;
  private apiImageEndpoint: string;
  private bucket: string;

  constructor() {
    this.apiKey = process.env.CHATGPT_API_KEY || '';
    this.apiEndpoint = 'https://api.openai.com/v1/completions';
    this.apiImageEndpoint = 'https://api.openai.com/v1/images/generations';
    this.bucket = 'images_public';
  }

  private checkKey() {
    if (this.apiKey === '') {
      throw new Error('No API key provided');
    }
  }

  async generateCharacter(request: string): Promise<GenerateCharacterResponse> {
    this.checkKey();
  
    const { size, species, challengeRating, isLegendary } = JSON.parse(request);

    const prompt = isLegendary ? 
    `Create a Dungeons and Dragons 5e ${size} ${species} with the challenge rating of ${challengeRating}. Present the data in the following JSON string format in one line (i.e., no line breaks): { "name": string, "background": string, "appearance": string, "attributes": { "STR": number, "DEX": number, "CON": number, "INT": number, "WIS": number, "CHA": number }, "skills": [{ "skill": string, "description": string }], "actions": [{ "action": string, "description": string }], "reactions": [{ "reaction": string, "description": string }] }. When applicable, skill, action, and reaction descriptions should include the dice modifier (e.g., +5) or dice roll (e.g., 2d8) and the damage type (e.g., slashing, fire).`
    :
    `Create a Dungeons and Dragons 5e ${size} ${species} with the challenge rating of ${challengeRating}. Present the data in the following JSON string format in one line (i.e., no line breaks): { "name": string, "background": string, "appearance": string, "attributes": { "STR": number, "DEX": number, "CON": number, "INT": number, "WIS": number, "CHA": number }, "skills": [{ "skill": string, "description": string }], "actions": [{ "action": string, "description": string }], "reactions": [{ "reaction": string, "description": string }], "legendary_actions": [{ "legendary_action": string, "description": string }] }. When applicable, skill, action, and reaction descriptions should include the dice modifier (e.g., +5) or dice roll (e.g., 2d8) and the damage type (e.g., slashing, fire).`
  
    const requestBody = {
      "model": "text-davinci-003",
      "prompt": prompt,
      "max_tokens": 1000,
      "stream": false,
      "logprobs": null
    };

    let retries = 0;

    while (retries < 2) {
      try {
        const response = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(requestBody),
        });
  
        if (!response.ok || !response.body) {
          throw new Error(`Error: ${response.statusText}`);
        }

        
        const uint8ArrayResponseBody = await response.arrayBuffer(); // Get response body as Uint8Array
        const responseBody = JSON.parse(new TextDecoder().decode(uint8ArrayResponseBody)); // Parse the JSON response
  
        console.log('responseBody', responseBody)

        const character: Character = {
          name: '',
          species: species,
          challenge_rating: challengeRating,
          attributes: {
            STR: 0,
            DEX: 0,
            CON: 0,
            INT: 0,
            WIS: 0,
            CHA: 0,
          },
          skills: [{ skill: '', description: '' }],
          actions: [{ action: '', description: '' }],
          reactions: [{ reaction: '', description: ''}],
          description: '',
          background: '',
          size,
          appearance: '',
        };
  
        // Get the first choice text, trim it, sanitize it, and parse it as JSON
        const choiceText = responseBody.choices[0].text.trim();
        const jsonStartIndex = choiceText.indexOf('{');
        const jsonEndIndex = choiceText.lastIndexOf('}') + 1;
        const trimmedJson = choiceText.slice(jsonStartIndex, jsonEndIndex);
        const parsedData = JSON.parse(trimmedJson);

        // Assign the parsed values to the character object
        character.attributes = getPropInsensitive(parsedData, 'attributes');
        if (!character.attributes || Object.values(character.attributes).some(val => !val)) {
          throw new Error('Attributes are empty or undefined');
        }

        character.skills = getPropInsensitive(parsedData, 'skills');
        if (!character.skills || Object.values(character.skills).some(val => !val)) {
          throw new Error('Skills are empty or undefined');
        }

        character.actions = getPropInsensitive(parsedData, 'actions');
        if (!character.actions || Object.values(character.actions).some(val => !val)) {
          throw new Error('Actions are empty or undefined');
        }

        character.reactions = getPropInsensitive(parsedData, 'reactions');

        character.background = getPropInsensitive(parsedData, 'background');
        if (!character.background) {
          throw new Error('Background is empty or undefined');
        }

        character.name = getPropInsensitive(parsedData, 'name');
        if (!character.name) {
          throw new Error('Name is empty or undefined');
        }

        
        character.appearance = getPropInsensitive(parsedData, 'appearance');
        if (!character.appearance) {
          throw new Error('Appearance is empty or undefined');
        }

        // Get image url
        const images = await this.createImage(character.name, character.appearance);
        if (!images) {
          throw new Error('Image url is empty or undefined');
        }
        const imageUrl = images[0];
        console.log('imageUrl', imageUrl);

        return { character, imageUrl };
      } catch (error) {
        console.error('Error generating character:', error);
        retries++;
        console.log(`Retrying... attempt ${retries}`);
      }
    }
    throw new Error(`Error generating character after ${retries} attempts`);
  }

  async createImage(name: string, description: string) {
    type ApiResponse = {
      created: number;
      data: { url: string }[];
    }    

    const requestBody = {
      "prompt": description,
      "n": 1,
      "size": "512x512"
    };

    try {
      const response = await fetch(this.apiImageEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const uint8ArrayResponseBody = await response.arrayBuffer(); // Get response body as Uint8Array
      const responseBody: ApiResponse = JSON.parse(new TextDecoder().decode(uint8ArrayResponseBody)); // Parse the JSON response

      console.log('responseBody', responseBody)

      // Upload images to Supabase storage
      const imageUrls = responseBody.data;
      if (!imageUrls || imageUrls.length === 0) {
        throw new Error('No images generated');
      }
      const uploadedImages = await Promise.all(
        imageUrls.map(async (url, index) => {
          // Fetch the image as a Buffer
          const imageResponse = await fetch(url.url);
          const imageArrayBuffer = await imageResponse.arrayBuffer();
          const imageBuffer = Buffer.from(imageArrayBuffer);

          // Convert the image to JPG format using sharp
          const convertedImageBuffer = await sharp(imageBuffer).toFormat('jpeg').toBuffer();
      
          // Upload the converted image to Supabase storage
          const fileName = `${name.replace(/\s/g, '')}-${index}.jpg`;
          const { data, error } = await supabase.storage
            .from('images_public')
            .upload(fileName, convertedImageBuffer);
      
          if (error) {
            console.error(`Error uploading image ${fileName}:`, error);
            return null;
          }
      
          // Get the public URL of the uploaded image
          const publicUrl = `/${this.bucket}/${fileName}`;
          return publicUrl;
        }),
      );

      return uploadedImages.filter((url) => url !== null) as string[];
    } catch (error) {
      console.error('Error generating image:', error);
    }
  }
}

function getPropInsensitive(obj: any, prop: string) {
  const lowerProp = prop.toLowerCase();
  for (let key in obj) {
    if (key.toLowerCase() === lowerProp) {
      if (obj[key] === undefined || obj[key] === '') {
        throw new Error(`Property ${prop} is empty or undefined`);
      }
      return obj[key];
    }
  }
  throw new Error(`Property ${prop} not found`);
}
