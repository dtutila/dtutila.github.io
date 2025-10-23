export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-sm bg-background/80 border-t border-border">
      <div className="container mx-auto px-6 py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};
