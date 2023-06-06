import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import Logo from '@/components/logo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { DefaultContext } from 'react-icons/lib';

const NavContainer = styled.nav`
  background: linear-gradient(to right, #000000, #1d222c);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`;

type NavListProps = {
  isOpen: boolean;
};

const NavList = styled.ul<NavListProps>`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    background: linear-gradient(to bottom, #000000, #1d222c);
  }

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const NavItem = styled.li`
  margin-right: 10px;
  text-decoration: none;
`;

const glowAnimation = keyframes`
 0% { filter: drop-shadow(0px 0px 0px ); }
 50% {filter: drop-shadow(4px 4px 10px #fff87e); }
 100% { filter: drop-shadow(0px 0px 0px ); }
`;

type NavLinkProps = {
  isActive?: boolean;
};

const NavLink = styled.div<NavLinkProps>`
  text-decoration: ${(props) => props.isActive ? 'underline' : 'none'};
  color: ${(props) => props.isActive ? '#bababa' : '#fff'};
  padding: 5px;
  border-radius: 4px;
  cursor: ${(props) => props.isActive ? 'default' : 'pointer'};

  ${(props) => !props.isActive && css`
    &:hover {
      animation-name: ${glowAnimation};
      animation-duration: 8s;
      animation-iteration-count: infinite;
    }
  `}
`;


const HamburgerIcon = styled(GiHamburgerMenu)`
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const CloseIcon = styled(IoCloseSharp)`
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(45deg);
  }
`;

const Hamburger = styled.div`
  display: inline-block;
  animation: ${rotate} 0.2s linear;
  z-index: 300;
  @media (min-width: 769px) {
    display: none;
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

const Nav = ({ list }: NavProps) => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navList = session
    ? [
        { name: 'Personal', href: '/monsters' },
        { name: 'Public', href: '/monsters/public' },
      ]
    : [
        { name: 'Public', href: '/monsters/public' },
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error('Error signing out');
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out');
      return;
    }

    console.log('Signed out successfully');
    document.cookie =
      'sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'supabase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  const handleToggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer>
      <Link href="/">
        <Logo />
      </Link>
      <Hamburger onClick={handleToggleNav}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Hamburger>
      <NavList isOpen={isOpen}>
        {navList.map((item, index) => (
          <NavItem key={index}>
            {item.href === router.pathname ? (
              <NavLink isActive={true}>{item.name}</NavLink>
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
