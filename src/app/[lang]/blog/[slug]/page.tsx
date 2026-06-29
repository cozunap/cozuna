import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

async function getPost(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId) return null;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts?key=${apiKey}`,
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

  const lang = resolvedParams.lang;
  const postTitle = lang === 'es' ? (post.title_es || post.title) : lang === 'fr' ? (post.title_fr || post.title) : (post.title_en || post.title);
  const postExcerpt = lang === 'es' ? (post.excerpt_es || post.excerpt) : lang === 'fr' ? (post.excerpt_fr || post.excerpt) : (post.excerpt_en || post.excerpt);

  return {
    title: `${postTitle} | COzuna Blog`,
    description: postExcerpt,
    openGraph: {
      title: postTitle,
      description: postExcerpt,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author || 'cozuna'],
    },
    twitter: {
      card: 'summary_large_image',
      title: postTitle,
      description: postExcerpt,
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

  // Get localized content with English fallback
  const postTitle = lang === 'es' ? (post.title_es || post.title) : lang === 'fr' ? (post.title_fr || post.title) : (post.title_en || post.title);
  const postCategory = lang === 'es' ? (post.category_es || post.category) : lang === 'fr' ? (post.category_fr || post.category) : (post.category_en || post.category);
  const postExcerpt = lang === 'es' ? (post.excerpt_es || post.excerpt) : lang === 'fr' ? (post.excerpt_fr || post.excerpt) : (post.excerpt_en || post.excerpt);
  const postContent = lang === 'es' ? (post.content_es || post.content) : lang === 'fr' ? (post.content_fr || post.content) : (post.content_en || post.content);

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
              {new Date(post.createdAt).toLocaleDateString(lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="relative z-10 rounded-full bg-brand-primary/10 px-3 py-1.5 font-medium text-brand-primary">
              {postCategory}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            {postTitle}
          </h1>
          <p className="text-lg leading-8 text-zinc-400 font-light border-l-4 border-brand-primary pl-4">
            {postExcerpt}
          </p>
        </header>
        
        <div 
          className="prose prose-invert prose-brand max-w-none prose-h2:text-white prose-a:text-brand-primary prose-strong:text-zinc-200"
          dangerouslySetInnerHTML={{ __html: postContent }}
        />
        
        <footer className="mt-16 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="text-sm leading-6">
              <p className="font-semibold text-white">
                {lang === 'es' ? 'Escrito por:' : 'Written by:'} <span className="text-brand-primary">cozuna</span>
              </p>
            </div>
          </div>
          <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors bg-brand-primary/10 px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            {lang === 'es' ? 'Volver al Blog' : 'Back to Blog'}
          </Link>
        </footer>
      </div>
    </div>
  );
}
