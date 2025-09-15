import { useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { useRouter } from 'next/router';

export default function SocialSignInButton({ strategy, buttonText }: { strategy?: OAuthStrategy, buttonText?: string }) {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: (router.query.redirect_url as string) ? '/sso-callback?force_redirect_url=' + encodeURIComponent(router.query.redirect_url as string) : '/sso-callback',
      redirectUrlComplete: (router.query.redirect_url as string) || '/',
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error.errors)
      console.error(error, null, 2);
    });
  }

  return (
    <div>
      <button onClick={() => signUpWith(strategy as OAuthStrategy)}>{buttonText}</button>
    </div>
  )
}