import HomeContent from "./HomeContent";
import { getDictionary } from "@/lib/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return <HomeContent lang={lang} dict={dict} />;
}
