import { useMDXComponent } from 'next-contentlayer/hooks';

interface MDXProps {
  code: string;
}

export default function MDX({ code }: MDXProps) {
  const MDXComponent = useMDXComponent(code);

  return (
    <article className="flex flex-col gap-4">
      <MDXComponent />
    </article>
  )
}