import { allArticles } from 'contentlayer/generated';
import Link from 'next/link';
import clsx from 'clsx';

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-between gap-24">
      <header className="text-left flex flex-col gap-4">
        <h1 className="text-cinder-800 font-medium dark:font-normal dark:text-macaroni-and-cheese-300 text-4xl font-ebgaramond mb-4">Agamjeet Singh</h1>
        <p className="">I find mathematics to be very intriguing and am constantly discovering new ideas, learning new things, and expanding my arsenal. I enjoy solving olympiad math and collecting intricate problems. I have also built a positive community on discord for people to learn, discuss, and collaborate.</p>
        <p>When I am not crunching numbers, I like to play my electric guitar, listen to rock music, and watch anime.</p>
      </header>
      <section className="flex flex-col gap-4">
        <ul className="flex flex-col gap-10">
          {
            allArticles
            .sort((a, b) => a.publishedAt > b.publishedAt ? -1 : 1)
            .map((article, index) => (
              <li key={index}>
                <Link href={`/${article.slug}`} className={clsx(
                  "flex flex-col gap-[.125rem] relative",
                  "sm:after:content-['☞'] sm:after:absolute sm:after:-top-1 sm:after:right-[calc(100%+.5rem)] sm:after:w-auto sm:after:h-full sm:after:-z-20 sm:after:opacity-0 sm:after:text-cinder-800 dark:sm:after:text-macaroni-and-cheese-300 sm:after:text-3xl sm:after:transition-opacity sm:after:duration-150 sm:after:hover:opacity-100 sm:after:ease",
                )}>
                  <div className="flex gap-4 items-center">
                    <h2 className="text-cinder-800 font-medium dark:font-normal dark:text-macaroni-and-cheese-300 text-xl font-ebgaramond">{article.title}</h2>
                  </div>
                  <h3>{article.summary}</h3>
                  <div className="flex gap-1 justify-start items-center text-xs text-cinder-800 dark:text-cinder-500">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{(article.readingTime > 0 ? article.readingTime.toString() : '1')+ ' min'}</span>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </main>
  )
}
