import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackgroundGrid } from "../interactive/BackgroundGrid";

interface PageLayoutProps {
  children: React.ReactNode;
  offsetHeader?: boolean;
}

export function PageLayout({ children, offsetHeader = true }: PageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundGrid />
      <Header />
      <main className={`relative z-10 flex-1 ${offsetHeader ? "pt-20" : ""}`}>{children}</main>
      <Footer />
    </div>
  );
}
