import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from 'components/mdx-components'
import PageContainer from 'components/page-container'
import { findRouteByPath, removeFromLast } from '../frontend/utils/find-route-by-path'
import { getRouteContext } from '../frontend/utils/get-route-context'
import ruRoutes from '../frontend/configs/app-routes.json'
import * as React from 'react'
import { useEffect } from 'react'
import Pagination from 'components/pagination'

function MDXLayout({ frontmatter, children }) {
  const routes = ruRoutes
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  console.log(route)

  const routeContext = getRouteContext(route, routes)

  useEffect(() => {
    console.log('routes', routes)
    console.log('route', route)
  }, [])

  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer
        frontmatter={frontmatter}
        pagination={<Pagination next={routeContext.nextRoute} previous={routeContext.prevRoute} />}
      >
        {children}
        <MDXComponents.footer {...frontmatter} />
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
