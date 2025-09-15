import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/favorites">Favorites</Link>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up">Sign up</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
