import { Article, allArticles } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import MDX from '@/components/MDX';
import { Metadata } from 'next';
import DownloadButton from '@/components/DownloadButton';

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: {
  params: Article
}): Promise<Metadata | undefined> {
  const article = allArticles.find((article) => article.slug === params.slug);

  if (article) {
    return {
      title: article.title,
      description: article.summary,
      openGraph: {
        title: article.title,
        description: article.summary,
        type: 'article',
        publishedTime: article.publishedAt,
        url: `https://agamjeet.com/${article.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.summary,
      },
    };
  }
}

export default function Article({ params } : { params: { slug: string } }) {
  const article = allArticles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex flex-col items-start justify-between gap-8 w-full">
      <div className="flex flex-col gap-4 sm:gap-2">
        <h1 className="text-cinder-800 font-medium dark:font-normal text-4xl dark:text-macaroni-and-cheese-300 font-ebgaramond">{article.title}</h1>
        {
          article.category === 'mock-test' && (
            <div className="flex gap-2 justify-between sm:justify-start">
              <DownloadButton
                type="problems"
                url={`/articles/${article.slug}/problems.pdf`}
              />
              <DownloadButton
                type="answer-key"
                url={`/articles/${article.slug}/answer-key.pdf`}
              />
            </div>
          )
        }
        <div className="flex gap-2 justify-start items-baseline text-sm text-cinder-800 dark:text-cinder-500">
          <p>{format(new Date(article.publishedAt), 'd MMMM yyyy')}</p>
          <p>•</p>
          <p>{(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' minutes'}</p>
        </div>
      </div>
      {
        article.category === 'mock-test' && <span className="text-cinder-800 dark:text-macaroni-and-cheese-300">This article contains spoilers for the mock test.</span>
      }
      <MDX code={article.body.code} />
    </section>
  )
}