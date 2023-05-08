type Choice = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
}

interface Character {
  name: string;
  species: string;
  challenge_rating: number;
  attributes: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  skills: Record<string, number>;
  actions: Record<string, string>;
  reactions: Record<string, string>;
  description: string;
}

type AttributeKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';


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
  
    const prompt = `Create a Dungeons and Dragons 5e ${size} ${species} with the challenge rating of ${challengeRating}. Include STR, DEX, CON, INT, WIS, CHA. Also, include skills, actions, reactions and description. Provide this information in JSON format.`;
  
    const requestBody = {
      "model": "text-davinci-003",
      "prompt": prompt,
      "max_tokens": 1000,
      "stream": false,
      "logprobs": null
    };

    let retries = 0;

    while (retries < 5) {
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
          skills: {},
          actions: {},
          reactions: {},
          description: '',
        };
  
        for (const choice of responseBody.choices) {
          const text = choice.text.trim();
          const lines = text.split('\n');
  
          for (const line of lines) {
            const matches = line.match(/^(STR|DEX|CON|INT|WIS|CHA):\s*(\d+)/);
  
            if (matches) {
              const attribute = matches[1] as keyof Character['attributes'];
              const value = parseInt(matches[2], 10);
              if (attribute in character.attributes) {
                character.attributes[attribute] = value;
              }
            }
  
            if (line.startsWith('Skills:')) {
              const skills = line.slice('Skills:'.length).trim();
              try {
                const parsedSkills = JSON.parse(skills);
                if (typeof parsedSkills === 'object') {
                  character.skills = parsedSkills;
                } else {
                  console.error('Error parsing skills: expected object but got', typeof parsedSkills);
                }
              } catch (error) {
                console.error('Error parsing skills:', error);
              }
            }
  
            if (line.startsWith('Actions:')) {
              const actions = line.slice('Actions:'.length).trim();
              try {
                const parsedActions = JSON.parse(actions);
                if (typeof parsedActions === 'object') {
                  character.actions = parsedActions;
                } else {
                  console.error('Error parsing actions: expected object but got', typeof parsedActions);
                }
              } catch (error) {
                console.error('Error parsing actions:', error);
              }
            }
      
            if (line.startsWith('Reactions:')) {
              const reactions = line.slice('Reactions:'.length).trim();
              try {
                const parsedReactions = JSON.parse(reactions);
                if (typeof parsedReactions === 'object') {
                  character.reactions = parsedReactions;
                } else {
                  console.error('Error parsing reactions: expected object but got', typeof parsedReactions);
                }
              } catch (error) {
                console.error('Error parsing reactions:', error);
              }
            }
      
            if (line.startsWith('Description:')) {
              const description = line.slice('Description:'.length).trim();
              character.description = description;
            }
      
            if (line.startsWith('Name:')) {
              const name = line.slice('Name:'.length).trim();
              character.name = name;
            }
          }
        }
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
