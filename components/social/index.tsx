// Add new Social icons here from https://react-icons.netlify.com/#/icons/fa
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaPinterestP, FaSoundcloud, FaTwitter, FaYoutube, FaShareAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/container';

interface ButtonShareProps {
    title: string;
    description: string;
}

const ShareLink = styled.div`
    color: ${({ theme }) => theme.colors.textColor};
    display: inline-block;
    padding: 14px 16px;
    cursor: pointer;
`;

function share(props: ButtonShareProps) {
    if (navigator.share !== undefined) {
        navigator.share({
            title: props.title,
            text: props.description,
            url: window.location.href
        })
            .then(() => {
                console.log('Thanks for sharing!');
            })
            .catch(err => {
                console.log(`Couldn't share because of`, err.message);
            });
    } else {
        console.log('Web share not supported');
    }
}

function ButtonShare(props: ButtonShareProps) {
    const [shareSupport, setShareSupport] = useState(false);

    useEffect(() => {
        if (navigator.share !== undefined) {
            setShareSupport(true);
        }
    }, []);

    if (shareSupport === true) {
        return (
            <ShareLink onClick={() => share(props)}>
                <FaShareAlt />
            </ShareLink>
        );
    } else {
        return null;
    }
}

interface SocialProps {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    pinterest?: string;
    soundcloud?: string;
    twitter?: string;
    youtube?: string;
    title: string;
    description: string;
    url: string;
}

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textColor};
  display: inline-block;
  padding: 14px 16px;
`;

const Social: React.FC<SocialProps> = ({
    facebook,
    github,
    instagram,
    linkedin,
    pinterest,
    soundcloud,
    twitter,
    youtube,
    title,
    description,
    url
}) => {
    return (
        <Container>
            <ButtonShare title={title} description={description} />
            {facebook && (
                <SocialLink
                    href={facebook}
                    target="_blank"
                    aria-label="Facebook profile"
                    rel="noopener noreferrer"
                >
                    <FaFacebookF />
                </SocialLink>
            )}
            {github && (
                <SocialLink
                    href={github}
                    target="_blank"
                    aria-label="GitHub profile"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </SocialLink>
            )}
            {instagram && (
                <SocialLink
                    href={instagram}
                    target="_blank"
                    aria-label="Instagram profile"
                    rel="noopener noreferrer"
                >
                    <FaInstagram />
                </SocialLink>
            )}
            {linkedin && (
                <SocialLink
                    href={linkedin}
                    target="_blank"
                    aria-label="LinkedIn profile"
                    rel="noopener noreferrer"
                >
                    <FaLinkedinIn />
                </SocialLink>
            )}
            {pinterest && (
                <SocialLink
                    href={pinterest}
                    target="_blank"
                    aria-label="Pinterest profile"
                    rel="noopener noreferrer"
                >
                    <FaPinterestP />
                </SocialLink>
            )}
            {soundcloud && (
                <SocialLink
                    href={soundcloud}
                    target="_blank"
                    aria-label="SoundCloud profile"
                    rel="noopener noreferrer"
                >
                    <FaSoundcloud />
                </SocialLink>
            )}
            {twitter && (
                <SocialLink
                    href={twitter}
                    target="_blank"
                    aria-label="Twitter profile"
                    rel="noopener noreferrer"
                >
                    <FaTwitter />
                </SocialLink>
            )}
            {youtube && (
                <SocialLink
                    href={youtube}
                    target="_blank"
                    aria-label="YouTube profile"
                    rel="noopener noreferrer"
                >
                    <FaYoutube />
                </SocialLink>
            )}
        </Container>
    );
};

export default Social;