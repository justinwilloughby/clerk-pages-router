import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Favorites() {
  return (
    <>
      <h1>Favorites</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}