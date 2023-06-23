import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';

interface MDXProps {
  code: string;
}

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <a href={href as string} target="_blank" className="underline underline-offset-4 decoration-macaroni-and-cheese-400 dark:decoration-cinder-600 hover:decoration-macaroni-and-cheese-800 hover:dark:decoration-cinder-300 duration-150 transition-[text-decoration-color] will-change-auto">{children}</a>,
}

export default function MDX({ code }: MDXProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <article className="flex flex-col gap-4">
      <MDXContent components={mdxComponents} />
    </article>
  )
}