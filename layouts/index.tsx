import * as React from 'react'
import PageContainer from 'components/page-container'
import dynamic from 'next/dynamic'

const MDXLayout = dynamic(() => import('layouts/mdx'))

export default function DefaultLayout({ children, frontMatter }) {
  const { slug } = frontMatter
  const layoutMap = {
    '/ru': <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    default: <PageContainer frontmatter={frontMatter}>{children}</PageContainer>,
  }
  const layout = Object.entries(layoutMap).find(([path, _component]) =>
    String(slug).startsWith(path)
  )

  return layout[1] ?? layoutMap.default
}
