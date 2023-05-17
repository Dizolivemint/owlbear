import List from '@/components/lists';
import Link from 'next/link';
import Button from '@/components/button';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@supabase/auth-helpers-react'

type NavProps = {
  list: {
    name: string;
    href: string;
  }[];
};

const Nav = (props: NavProps) => {
  const session = useSession()
  // const navList = props.list;
  const navList = []
  if (!session) {
    navList.push({ name: "Home", href: "/" })
    navList.push({ name: "Login", href: "/login" }) 
  } else {
    navList.push({ name: "Characters", href: "/characters" })
    navList.push({ name: "Sessions", href: "/sesssions" })
    navList.push({ name: "Profile", href: "/profile" })
    navList.push({ name: "Logout", href: "" })
  }

  const handleSignOut = async () => {
    console.log('signing out')
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav>
      <List>
        {navList.map((item, index) => {
          return (
            <li key={index}>
              {item.name === 'Logout' ?
                <Button onClick={() => handleSignOut()}>{item.name}</Button>
              :
                <Link href={item.href}>
                  <Button>{item.name}</Button>
                </Link>
              }
            </li>
          )
        })}
      </List>
    </nav>
  );
};

export default Nav;
