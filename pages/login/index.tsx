import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Layout from '@/components/layout';
import Button from '@/components/button';
import Input, { InputLabel } from '@/components/input';
import Container from '@/components/container';

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const router = useRouter();

  if (session) {
    router.push('/monsters');
  }

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setStatus('');
    event.preventDefault();
    setEmail(email.trim());
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getURL(),
      },
    });
    if (data) {
      setLoading(false);
      setStatus('Check your email for a One Time Password (OTP) to sign in.');
    } else if (error) {
      setStatus(error.message);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'email'
    });

    if (data && session) {
      router.push('/monsters');
    } else if (error) {
      setStatus(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout navList={[]}>
          <Container padding={'2rem'} center={true}>
            <h1>Login</h1>
            {status && ( 
              <>
                <p>{status}</p> 
                <form onSubmit={handleOtpSubmit}>
                  <div>
                    <InputLabel htmlFor="otp">OTP Code</InputLabel>
                    <Input
                      type="text"
                      id="otp"
                      value={otpCode}
                      onChange={(event) => setOtpCode(event.target.value)}
                    />
                  </div>
                  <Button type="submit">Verify OTP Code</Button>
                </form>
              </>
            )}
            {loading && <p>Loading...</p>}
            {!loading && !status && (
              <>
                <form onSubmit={handleSubmit}>
                  <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <Button type="submit">Send OTP Code</Button>
                </form>
              </>
            )}
          </Container>
        </Layout>
      </main>
    </>
  );
}
