import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <Index />
  </ThemeProvider>
);

export default App;
