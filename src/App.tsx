// src/App.tsx
import { UIProvider } from "./context/uiContext";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <UIProvider>
      <LandingPage />
    </UIProvider>
  );
}
