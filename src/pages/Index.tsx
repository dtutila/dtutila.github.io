import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import logo from "@/assets/logo.png";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background transition-colors" style={{ background: 'var(--gradient-background)' }}>
      <Header />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center animate-in fade-in duration-1000">
          <div className="mb-8 flex justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-accent shadow-lg shadow-accent/20" style={{ background: 'var(--gradient-primary)' }}>
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            dtutila
          </h1>
          
          <h2 className="mb-6 text-2xl font-semibold text-muted-foreground sm:text-3xl">
            Software Engineer
          </h2>
          
          

          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Index;
