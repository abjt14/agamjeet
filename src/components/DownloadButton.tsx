'use client';

interface DownloadButtonProps {
  type: 'problems' | 'answer-key';
  slug: string;
}

export default function DownloadButton({ type, slug }: DownloadButtonProps) {
  const content = [
    {
      id: 'problems',
      text: 'problems',
    },
    {
      id: 'answer-key',
      text: 'answer key',
    },
  ];

  return (
    <a
      href={`/articles/${slug}/${type}.pdf`}
      target="_blank"
      className="flex flex-1 sm:flex-none gap-2 items-center justify-center px-4 py-2 sm:px-3 sm:py-1 rounded-md transition-[border-color] duration-150 bg-macaroni-and-cheese-100 border border-macaroni-and-cheese-300 text-cinder-800 hover:border-cinder-800 dark:bg-neutral-950 dark:border-cinder-800 dark:text-cinder-300 dark:hover:border-macaroni-and-cheese-300 group"
      onClick={() => {
        fetch(`/api/downloads?slug=${slug}&type=${type}`, {
          method: 'POST',
        })
        .catch((err) => console.error(err));
      }}
    >
      <span className="
        relative
        overflow-hidden

        before:content-['↓']
        before:absolute
        before:top-1/2
        before:left-1/2
        before:-translate-x-1/2
        before:-translate-y-1/2
        before:h-full
        before:w-full
        before:transition-transform
        before:duration-300
        group-hover:before:translate-y-full

        after:content-['↓']
        after:absolute
        after:top-1/2
        after:left-1/2
        after:-translate-x-1/2
        after:translate-y-[-150%]
        after:h-full
        after:w-full
        after:transition-transform
        after:duration-300
        group-hover:after:-translate-y-1/2
      ">
        <span className="text-transparent">↓</span>
      </span>
      <span className="text-xl sm:text-sm">{content.find((item) => item.id === type)?.text}</span>
    </a>
  )
}