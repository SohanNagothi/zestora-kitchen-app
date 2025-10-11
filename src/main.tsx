import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_49TDKqqHN",
      userPoolClientId: "7839g8m6onaljulemloo1jbjn9",
      loginWith: {
        // Allow users to sign in with email, username, or phone number
        username: true,
        email: true,
        phone: false,
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(<App />);
