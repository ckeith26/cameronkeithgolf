import { PageLayout } from "@/components/layout/PageLayout";
import { HomePageClient } from "@/components/interactive/HomePageClient";

export default function Home() {
  return (
    <PageLayout offsetHeader={false}>
      <HomePageClient />
    </PageLayout>
  );
}
