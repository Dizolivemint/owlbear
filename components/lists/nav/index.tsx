import styled from 'styled-components';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import Logo from '@/components/logo';

const NavContainer = styled.nav`
  background-color: #2e5d41;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 10px;
  text-decoration: none;
`;

const NavLink = styled.div`
  text-decoration: none;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    color: #000;
  }
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    color: #000;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

type NavProps = {
  list: {
    name: string;
    href: string;
  }[];
};

const Nav = (props: NavProps) => {
  const session = useSession();
  const navList = session
    ? [
        { name: 'Characters', href: '/characters' },
        { name: 'Maps', href: '/maps' },
        { name: 'Profile', href: '/profile' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Login', href: '/login' },
      ];

  const handleSignOut = async () => {
    console.log('signing out');
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <NavContainer>
      <Logo />
      <NavList>
        {navList.map((item, index) => (
          <NavItem key={index}>
            {item.name === 'Logout' ? (
              <NavLink onClick={() => handleSignOut()}>{item.name}</NavLink>
            ) : (
              <Link href={item.href}>
                <NavLink>{item.name}</NavLink>
              </Link>
            )}
          </NavItem>
        ))}
      </NavList>
      {session && (
        <RightContainer>
          <LogoutButton onClick={() => handleSignOut()}>Logout</LogoutButton>
        </RightContainer>
      )}
    </NavContainer>
  );
};

export default Nav;
