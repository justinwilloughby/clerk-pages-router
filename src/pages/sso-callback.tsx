import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function SSOCallback() {
  const router = useRouter();
  const { force_redirect_url } = router.query;

  return <AuthenticateWithRedirectCallback signInForceRedirectUrl={force_redirect_url as string} signUpForceRedirectUrl={force_redirect_url as string} />
}