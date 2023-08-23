import ArticleData from '@/components/ArticleData';
import clsx from 'clsx';
import { allArticles } from 'contentlayer/generated';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Stats() {
  return (
    <main className="flex flex-col items-start justify-between gap-8 w-full">
      <header className="text-left flex flex-col gap-2">
        <h1 className="fade-in text-cinder-800 font-medium dark:font-normal dark:text-macaroni-and-cheese-300 text-4xl font-ebgaramond">Blog Metadata & Statistics</h1>
        <div
          className="fade-in flex gap-2 justify-start items-baseline text-sm text-macaroni-and-cheese-800 dark:text-cinder-500"
          style={{
            animationDelay: "100ms"
          }}
        >
          <><ArticleData type={"views"} slug='' /> views</>
          <span>&#10022;</span>
          <><ArticleData type={"downloads"} slug='' downloadsType='any' /> downloads</>
        </div>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 sm:gap-4">
          {
            allArticles
            .sort((a, b) => a.publishedAt > b.publishedAt ? -1 : 1)
            .map((article, index) => (
              <li
                key={index}
                className="fade-in list-none p-6 rounded-md flex flex-col gap-4 border border-macaroni-and-cheese-300 bg-macaroni-and-cheese-50 dark:border-cinder-800 dark:bg-cinder-950"
                style={{
                  animationDelay: `${(index + 1) * 100 + 100}ms`
                }}
              >
                <Link
                  href={`/${article.slug}`}
                  className="text-cinder-800 font-semibold dark:font-medium sm:font-medium sm:dark:font-normal dark:text-macaroni-and-cheese-300 text-xl font-ebgaramond underline underline-offset-4 decoration-transparent hover:decoration-cinder-800 dark:hover:decoration-macaroni-and-cheese-300 transition-all duration-75"
                >
                  {article.title}
                </Link>
                <div className="flex flex-col gap-2 text-sm text-cinder-800 dark:text-cinder-500">
                  <div className="flex gap-1 justify-start items-center">
                    <span>Published On:</span>
                    <span className="text-macaroni-and-cheese-800 font-medium dark:text-cinder-300">{format(new Date(article.publishedAt), 'd MMMM yyyy')}</span>
                  </div>
                  <div className="flex gap-1 justify-start items-center">
                    <span>Reading Time:</span>
                    <span className="text-macaroni-and-cheese-800 font-medium dark:text-cinder-300">
                    {(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' minutes'}
                    </span>
                  </div>
                  <div className="flex gap-1 justify-start items-center">
                    <span>Views:</span>
                    <span className="text-macaroni-and-cheese-800 font-medium dark:text-cinder-300">
                      <ArticleData slug={article.slug} type="views" />
                    </span>
                  </div>
                  <div className={clsx(
                    "flex gap-1 justify-start items-center",
                    article.category !== 'mock-test' ? 'line-through opacity-50' : ''
                  )}>
                    <span>Problems (downloads):</span>
                    <span className="text-macaroni-and-cheese-800 font-medium dark:text-cinder-300">
                      {
                        (article.category !== 'mock-test') || (article.category === 'mock-test' && !article.answerKey) ?
                          'N/A' :
                          <ArticleData slug={article.slug} type="downloads" downloadsType="problems" />
                      }
                    </span>
                  </div>
                  <div className={clsx(
                    "flex gap-1 justify-start items-center",
                    (article.category !== 'mock-test') || (article.category === 'mock-test' && !article.answerKey) ? 'line-through opacity-50' : ''
                  )}>
                    <span>Answer Key (downloads):</span>
                    <span className="text-macaroni-and-cheese-800 font-medium dark:text-cinder-300">
                      {
                        (article.category !== 'mock-test') || (article.category === 'mock-test' && !article.answerKey) ?
                          'N/A' :
                          <ArticleData slug={article.slug} type="downloads" downloadsType="answer-key" />
                      }
                    </span>
                  </div>
                </div>
              </li>
            ))
          }
      </section>
    </main>
  )
}
