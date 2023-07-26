import { Article, allArticles } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import MDX from '@/components/MDX';
import { Metadata } from 'next';
import DownloadButton from '@/components/DownloadButton';
import ArticleViews from '@/components/ArticleViews';

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
        <h1
          className="fade-in text-cinder-800 font-medium dark:font-normal text-4xl dark:text-macaroni-and-cheese-300 font-ebgaramond"
        >
          {article.title}
        </h1>
        <div
          className="fade-in flex gap-2 justify-start items-baseline text-sm text-cinder-800 dark:text-cinder-500"
          style={{
            animationDelay: "100ms"
          }}
        >
          <span>{format(new Date(article.publishedAt), 'd MMMM yyyy')}</span>
          <span>&#10022;</span>
          <span>{(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' minutes'}</span>
          {/* <ArticleViews slug={article.slug} trackView={true} /> */}
        </div>
      </div>
      {
        article.category === 'mock-test' && (
          <div
            className="fade-in flex flex-col gap-4 p-4 rounded-md border border-macaroni-and-cheese-300 bg-macaroni-and-cheese-50 dark:bg-cinder-950"
            style={{
              animationDelay: "200ms"
            }}
          >
            <h2 className="flex gap-2 justify-start items-center text-cinder-800 dark:text-macaroni-and-cheese-300 font-medium dark:font-normal">
              This article contains spoilers for the mock test.
            </h2>
            <div className="grid gap-2 text-macaroni-and-cheese-800 dark:text-cinder-300">
              <p className="">I recommend attempting the problems before proceeding to read the article. You can download the problems and the answer key using the buttons below.</p>
            </div>
            <div className="flex gap-2 justify-between sm:justify-start pt-2">
              <DownloadButton
                type="problems"
                slug={article.slug}
              />
              {
                article.answerKey && (
                  <DownloadButton
                    type="answer-key"
                    slug={article.slug}
                  />
                )
              }
            </div>
          </div>
        )
      }
      <MDX code={article.body.code} />
    </section>
  )
}