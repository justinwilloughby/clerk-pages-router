import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        cssLayerName: 'clerk',
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
