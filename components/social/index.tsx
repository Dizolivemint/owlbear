// Add new Social icons here from https://react-icons.netlify.com/#/icons/fa
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaPinterestP, FaSoundcloud, FaTwitter, FaYoutube, FaShareAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/components/container';

interface ButtonShareProps {
    title: string;
    description: string;
    url: string;
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
            url: props.url
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
    return (
        <ShareLink onClick={() => share(props)}>
            <FaShareAlt />
        </ShareLink>
    );
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
      title,
      description,
      url,
}) => {
  const [shareSupport, setShareSupport] = useState(false);

    useEffect(() => {
        if (navigator.share !== undefined) {
            setShareSupport(true);
        }
    }, []);

    return (
        <Container>
          {shareSupport && <ButtonShare title={title} description={description} url={url} />}
        </Container>
    );
};

export default Social;