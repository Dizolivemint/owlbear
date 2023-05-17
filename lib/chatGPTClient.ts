import { Character } from '@/lib/app.types';

export class ChatGPTClient {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.CHATGPT_API_KEY || '';
    this.apiEndpoint = 'https://api.openai.com/v1/completions';
  }

  private checkKey() {
    if (this.apiKey === '') {
      throw new Error('No API key provided');
    }
  }

  async generateCharacter(request: string): Promise<Character> {
    this.checkKey();
  
    const { size, species, challengeRating } = JSON.parse(request);

    const prompt = `Create a Dungeons and Dragons 5e ${size} ${species} with the challenge rating of ${challengeRating}. Present the data in the following JSON string format { "name": string, "description": string, "attributes": { "STR": number, "DEX": number, "CON": number, "INT": number, "WIS": number, "CHA": number, }, "skills": [{ "skill": string, "description": string, }], "actions": [{ "action": string, "description": string, }], "reactions": [{ "reaction": string, "description": string, }] }. Descriptions for skills, actions, and reactions should include the dice modifier (e.g., +5) or dice roll (e.g., 2d8) and the damage type (e.g., slashing, fire).`;
  
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
          size
        };
  
        // Get the first choice text, trim it, sanitize it, and parse it as JSON
        const choiceText = responseBody.choices[0].text.trim();
        const jsonStartIndex = choiceText.indexOf('{');
        const jsonEndIndex = choiceText.lastIndexOf('}') + 1;
        const trimmedJson = choiceText.slice(jsonStartIndex, jsonEndIndex);
        const sanitizedJson = trimmedJson
          .replace(/(\w+)\s*:\s*("[^"]*"|[\w\d]+)/g, '"$1": $2')
          .replace(/;/g, ',')
          .replace(/,\s*(}|\])/g, '$1');

        const parsedData = JSON.parse(sanitizedJson);

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

        character.description = getPropInsensitive(parsedData, 'description');
        if (!character.description) {
          throw new Error('Description is empty or undefined');
        }

        character.name = getPropInsensitive(parsedData, 'name');

        return character;
      } catch (error) {
        console.error('Error generating character:', error);
        retries++;
        console.log(`Retrying... attempt ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      }
    }
    throw new Error(`Error generating character after ${retries} attempts`);
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
