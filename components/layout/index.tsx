import Container from "@/components/container";
import Nav from "@/components/lists/nav";

type LayoutProps = {
  children: React.ReactNode;
  navList?: Array<{ name: string; href: string }>;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  const navList = props.navList || []
  return (
      <Container>
        <Container>
          <Nav list={
            navList
          }/>
        </Container>
        {children}
      </Container>
  );
};

export default Layout