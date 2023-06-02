import { GetServerSideProps } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { isCharacter } from '@/lib/typeGuards';
import { Database } from '@/lib/database.types'
import Container from '@/components/container';
import Image from 'next/image';
import List from '@/components/lists';
import Social from '@/components/social';
import { parse } from 'url';

type Props = {
  data: Database['public']['Tables']['characters']['Row'];
  domain: string;
};

const CharacterPage: React.FC<Props> = ({ data, domain }) => {
  // Render the character data
  const character = data
  if (character?.character_data && isCharacter(character.character_data)) {
    return (
      <Container padding='2rem'>
        <Image 
          src={character.image_filename || ''} 
          alt={character.character_data.name || ''} 
          height={200}
          width={200}
        />
        <Social title={character.character_data.name || ''} description={character.character_data.background || ''} url={`${domain}/monster/${character.id}`} />
        <h2>{character.character_data.name}</h2>
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
    );
  } else {
    return (
      <div>
        <h1>Character data is not formatted correctly</h1>
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const { host } = context.req.headers;
  const parsedUrl = parse(`https://${host}`);
  if (!parsedUrl.host) throw new Error('Host is undefined')
  const domain = parsedUrl.host.replace(/\/$/, '');

  try {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('public', true)
      .eq('id', id)
      .single();
    
    console.log(data);

    if (error || !data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
        domain
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CharacterPage;