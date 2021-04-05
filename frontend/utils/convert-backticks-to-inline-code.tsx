import MDXComponents from 'components/mdx-components'

export function convertBackticksToInlineCode(input: string) {
  return input
    .split(/(`\w+`)/)
    .map(chunk =>
      chunk.startsWith('`') && chunk.endsWith('`') ? (
        <MDXComponents.inlineCode key={chunk}>{chunk.slice(1, -1)}</MDXComponents.inlineCode>
      ) : (
        chunk
      )
    )
}
