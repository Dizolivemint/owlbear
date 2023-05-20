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
  flex-grow: 1;
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  background-color: #2e5d41;
  padding: 20px;
`;

const Copyright = styled.p`
  font-size: 14px;
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
      <MainContent>{children}</MainContent>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
