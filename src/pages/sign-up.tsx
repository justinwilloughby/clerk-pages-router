import SocialSignUpButton from '@/components/social-sign-up-button';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress, password });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerifying(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
          redirectUrl: (router.query.redirect_url as string) || '/',
        })

      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
          <button type="submit">Verify</button>
        </form>
      </>
    )
  }

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="clerk-captcha"></div>
        <div>
          <button type="submit">Continue</button>
        </div>
        <SocialSignUpButton strategy="oauth_google" buttonText="Sign up with Google" />
      </form>
    </>
  );
}
