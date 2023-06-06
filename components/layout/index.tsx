import Container from "@/components/container";
import Nav from "@/components/nav";
import Link from "next/link";
import styled from "styled-components";

type LayoutProps = {
  children: React.ReactNode;
  navList?: Array<{ name: string; href: string }>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #1d1e2c;
`;

const MainContent = styled.div`
  background-image: url("/background.svg");
`;

const Overlay = styled.div`
  flex-grow: 1;
  background: #1d1e2cf0;
  display: flex;
  justify-content: center;
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  background-color: #1d222c;
  padding: 20px;
  flex-wrap: wrap;
  a {
    margin: 2rem;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Link href="https://github.com/Dizolivemint/owlbear">
        Contribute
      </Link>
      <Link href="https://github.com/Dizolivemint/owlbear/issues">
        Issues
      </Link>
      <Link href="https://stablediffusionapi.com/register?ref=miles-ever">
        Stable Diffusion API
      </Link>
      <Link href="https://www.patreon.com/RPGAI">
        RPG AI Image Model
      </Link>
    </FooterWrapper>
  );
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const navList = props.navList || [];

  return (
    <Wrapper>
      <Container>
        <Nav list={navList} />
      </Container>
      <MainContent>
        <Overlay>
          {children}
        </Overlay>
      </MainContent>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
