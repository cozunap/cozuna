import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";

export const revalidate = 60; // ISR for SEO

async function getPosts() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return [];

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const json = await res.json();
    if (!json.documents) return [];

    return json.documents.map((doc: any) => {
      const data: any = {};
      const fields = doc.fields || {};
      for (const [key, value] of Object.entries(fields) as any) {
        if (value.stringValue !== undefined) {
          data[key] = value.stringValue;
        } else if (value.timestampValue !== undefined) {
          data[key] = value.timestampValue;
        }
      }
      return data;
    }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Blog({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang as 'en' | 'es');
  
  const posts = await getPosts();

  return (
    <div className="bg-zinc-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {lang === 'es' ? 'Nuestro Blog' : 'Our Blog'}
          </h2>
          <p className="mt-2 text-lg leading-8 text-zinc-400">
            {lang === 'es' 
              ? 'Últimas noticias sobre Tecnología, Desarrollo Web e Impresión.' 
              : 'Latest news about Technology, Web Development, and Printing.'}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post: any) => (
            <article key={post.slug} className="relative flex flex-col items-start justify-between bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-brand-primary/50 transition-colors">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-zinc-500">
                  {new Date(post.createdAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span className="relative z-10 rounded-full bg-brand-primary/10 px-3 py-1.5 font-medium text-brand-primary">
                  {post.category}
                </span>
              </div>
              <div className="group">
                <h3 className="mt-3 text-xl font-semibold leading-6 text-white group-hover:text-zinc-300">
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-zinc-400">{post.excerpt}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-white">
                    cozuna
                  </p>
                </div>
              </div>
            </article>
          ))}
          
          {posts.length === 0 && (
            <div className="col-span-3 text-center text-zinc-500 py-12">
              {lang === 'es' ? 'No hay artículos todavía. ¡Vuelve mañana!' : 'No articles yet. Check back tomorrow!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
