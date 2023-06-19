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
      className="flex flex-1 sm:flex-none gap-2 sm:gap-1 items-center justify-center px-4 py-2 sm:px-2 sm:py-1 rounded-md transition-all duration-150 bg-macaroni-and-cheese-50 border border-macaroni-and-cheese-300 text-cinder-800 hover:border-cinder-800 dark:bg-neutral-950 dark:border-cinder-800 dark:text-white dark:hover:border-macaroni-and-cheese-300"
      onClick={() => {
        fetch(`/api/downloads?slug=${slug}&type=${type}`, {
          method: 'POST',
        })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        })
        .catch((err) => console.error(err));
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-4 sm:h-4">
        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
      </svg>
      <span className="text-xl sm:text-sm">{content.find((item) => item.id === type)?.text}</span>
    </a>
  )
}