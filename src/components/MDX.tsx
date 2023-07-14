import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';

interface MDXProps {
  code: string;
}

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <CustomLink href={href}>{children}</CustomLink>,
  table: ({ children }) => <CustomTable>{children}</CustomTable>,
}

export default function MDX({ code }: MDXProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article className="flex flex-col gap-4">
      <MDXContent components={mdxComponents} />
    </article>
  )
}

function CustomLink({ href, children } : {
  href: string | undefined;
  children: React.ReactNode;
}) {
  return <a href={href as string} target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto">{children}</a>
}

function CustomTable({ children } : {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-neutral-50 border-macaroni-and-cheese-300 dark:bg-neutral-950 dark:border-cinder-900 overflow-x-auto w-full max-w-[calc(100vw-3rem)] sm:max-w-full">
      <table className="w-full border-collapse border-spacing-0 table-auto">{children}</table>
    </div>
  )
}