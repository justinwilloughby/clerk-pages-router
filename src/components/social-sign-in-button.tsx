import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';

export default function SocialSignInButton({ strategy, buttonText }: { strategy?: OAuthStrategy, buttonText?: string }) {
  const { isLoaded, signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error.errors)
      console.error(error, null, 2);
    });
  }

  return (
    <div>
      <button onClick={() => signInWith(strategy as OAuthStrategy)}>{buttonText}</button>
    </div>
  )
}