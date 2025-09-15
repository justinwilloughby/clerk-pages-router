Expected behavior:
- Go to protected page (favorites) without being logged in
- Navigated to sign in page
- Sign in with Google
- Navigated back to favorites page

Actual behavior:
- Go to protected page (favorites) without being logged in
- Navigated to sign in page
- Sign in with Google
- Navigated back to root

In other words, an SSO sign in that turns into a sign up is not redirecting to the correct place.

Fix:
- Pass a param containing the intendend redirect url to the sso-callback page and then pass that to the AuthenticateWithRedirect as a forceSignIn and forceSignUp redirect url prop.