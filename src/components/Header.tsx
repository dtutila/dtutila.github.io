import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-foreground">
          <a href="https://dtutila.com">dtutila</a>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
