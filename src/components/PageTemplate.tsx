
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {description && <p className="text-xl text-muted-foreground mb-8">{description}</p>}
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageTemplate;
