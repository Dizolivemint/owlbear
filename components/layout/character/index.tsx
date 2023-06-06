
import Accordion from "@/components/accordion"                            
import Container from "@/components/container";
import List from "@/components/lists";
import { Database } from "@/lib/database.types";
import { isCharacter } from "@/lib/typeGuards";
import Image from "next/image";

type LayoutProps = {
  character: Database['public']['Tables']['characters']['Row'];
  children?: React.ReactNode;
  isAccordion?: boolean;
};

const CharacterContainer = (props: LayoutProps) => {
  const { character, children } = props;
  if (isCharacter(character.character_data)) {
    return (
      <Container>
        <Container center={true} padding='1rem'>
          <Image 
            src={character.image_filename || ''} 
            alt={character.character_data.name || ''} 
            height={768}
            width={512}
            style={{objectFit: 'cover', maxWidth: '100%', height: 'auto'}}
          />
            {children}
          <h2>{character.character_data.name}</h2>
        </Container>
        <Container padding='1rem'>
          <h3>Background</h3>
          <p>{character.character_data.background || character.character_data.description}</p>
          <h3>Appearance</h3>
          <p>{character.character_data.appearance}</p>
          <h3>Size</h3>
          <p>{character.character_data.size}</p>
          <h3>Species</h3>
          <p>{character.character_data.species}</p>
          <h3>Challenge Rating</h3>
          <p>{character.character_data.challenge_rating}</p>
          <h3>Attributes</h3>
          <List direction={'column'}>
            <li>STR: {character.character_data.attributes.STR}</li>
            <li>DEX: {character.character_data.attributes.DEX}</li>
            <li>CON: {character.character_data.attributes.CON}</li>
            <li>INT: {character.character_data.attributes.INT}</li>
            <li>WIS: {character.character_data.attributes.WIS}</li>
            <li>CHA: {character.character_data.attributes.CHA}</li>
          </List>
          <h3>Skills</h3>
          {character.character_data.skills.map((skill, index) => (
            <div key={index}>
              <h5 id={`h-skill-${index}`}>Name</h5>
              <p aria-labelledby={`h-skill-${index}`}>{skill.skill}</p>
              <h5 id={`h-description-${index}`}>Description</h5>
              <p aria-labelledby={`h-description-${index}`}>{skill.description}</p>
            </div>
          ))}
          <h3>Actions</h3>
          {character.character_data.actions.map((action, index) => (
            <div key={index}>
              <h5 id={`h-action-${index}`}>Name</h5>
              <p aria-labelledby={`h-action-${index}`}>{action.action}</p>
              <h5 id={`h-description-${index}`}>Description</h5>
              <p aria-labelledby={`h-description-${index}`}>{action.description}</p>
            </div>
          ))}
          <h3>Reactions</h3>
          {character.character_data.reactions.map((reaction, index) => (
            <div key={index}>
              <h5 id="h-reaction-name">Name</h5>
              <p aria-labelledby="h-reaction">{reaction.reaction}</p>
              <h5 id="h-reaction-description">Description</h5>
              <p aria-labelledby="h-reaction-description">{reaction.description}</p>
            </div>
          ))}
          {character.character_data.legendary_actions && (
            <h3>Legendary Actions</h3>
          )}
          {character.character_data.legendary_actions && (
            character.character_data.legendary_actions.map((legendaryAction, index) => (
              <div key={index}>
                <h5 id={`h-legendary-action-${index}`}>Name</h5>
                <p aria-labelledby={`h-legendary-action-${index}`}>{legendaryAction.legendary_action}</p>
                <h5 id={`h-legendary-description-${index}`}>Description</h5>
                <p aria-labelledby={`h-legendary-description-${index}`}>{legendaryAction.description}</p>
              </div>
            ))
          )}
        </Container>
      </Container>
    )
  } else {
    return null;
  }
}

const LayoutCharacter = (props: LayoutProps) => {
  const { character, children, isAccordion } = props;

  if (isCharacter(character.character_data)) {
    if (isAccordion) {
      return (
        <Accordion title={character.character_data.name} imageUrl={character.image_filename || ''}>
          <CharacterContainer character={character}>
            {children}
          </CharacterContainer>
        </Accordion>       
      )
    } else {
      return (
        <CharacterContainer character={character}>
          {children}
        </CharacterContainer>
      )
    }
  } else {
    return null;
  }
}

export default LayoutCharacter;
