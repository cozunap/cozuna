import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

async function getPost(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.documents) return null;

    for (const doc of json.documents) {
      const data: any = {};
      const fields = doc.fields || {};
      for (const [key, value] of Object.entries(fields) as any) {
        if (value.stringValue !== undefined) {
          data[key] = value.stringValue;
        } else if (value.timestampValue !== undefined) {
          data[key] = value.timestampValue;
        }
      }
      if (data.slug === slug) {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | COzuna Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const resolvedParams = await params;
  const { slug, lang } = resolvedParams;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-zinc-950 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          {lang === 'es' ? 'Volver al Blog' : 'Back to Blog'}
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-x-4 text-sm mb-6">
            <time dateTime={post.createdAt} className="text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="relative z-10 rounded-full bg-brand-primary/10 px-3 py-1.5 font-medium text-brand-primary">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">{post.title}</h1>
          <p className="text-lg leading-8 text-zinc-400 font-light border-l-4 border-brand-primary pl-4">{post.excerpt}</p>
        </header>
        
        <div 
          className="prose prose-invert prose-brand max-w-none prose-h2:text-white prose-a:text-brand-primary prose-strong:text-zinc-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex items-center gap-x-4">
            <div className="text-sm leading-6">
              <p className="font-semibold text-white">
                {lang === 'es' ? 'Escrito por:' : 'Written by:'} <span className="text-brand-primary">cozuna</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
