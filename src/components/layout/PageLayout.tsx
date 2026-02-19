import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackgroundGrid } from "../interactive/BackgroundGrid";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundGrid />
      <Header />
      <main className="relative z-10 flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
