import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({ identifier: emailAddress, password });

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async () => {
            console.log(router.query.rurl);
            if (router.query.rurl) {
              router.push(router.query.rurl as string);
            } else {
              router.push('/');
            }
          }
        })

      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={emailAddress}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </>
  )
}
