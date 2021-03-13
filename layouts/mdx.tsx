import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../components/mdx-components'
import PageContainer from '../components/page-container'
import * as React from 'react'

function MDXLayout({ frontmatter, children }) {
  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer frontmatter={frontmatter}>{children}</PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
