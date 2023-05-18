import Container from "@/components/container";
import Nav from "@/components/lists/nav";
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
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const FooterWrapper = styled.footer`
  background-color: #2e5d41;
  padding: 20px;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 14px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Copyright>&copy; {currentYear} Miles Exner</Copyright>
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
