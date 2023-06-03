import styled from 'styled-components';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import Logo from '@/components/logo';
import { useRouter } from 'next/router';

const NavContainer = styled.nav`
  background-color: #1d222c;
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
        { name: 'Monsters', href: '/monsters' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Login', href: '/login' },
      ];

  const handleSignOut = async () => {
    const token = session?.access_token;

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch('/api/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      console.error('Error signing out');
      return;
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out');
      return;
    }

    console.log('Signed out successfully');
    document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <NavContainer>
      <Link href="/">
        <Logo />
      </Link>
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
