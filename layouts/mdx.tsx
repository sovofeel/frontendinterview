import React, { useState } from 'react'
import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from 'components/mdx-components'
import PageContainer from 'components/page-container'
import { findRouteByPath, removeFromLast } from '../frontend/utils/find-route-by-path'
import { getRouteContext } from '../frontend/utils/get-route-context'
import ruRoutes from '../frontend/configs/app-routes.json'
import Pagination from 'components/pagination'
import Sidebar from 'components/sidebar/Sidebar'
import filters from '../frontend/configs/app-filters.json'
import { useRouter } from 'next/router'

function MDXLayout({ frontmatter, children }) {
  const { pathname } = useRouter()
  const routes = ruRoutes
  const [key, setKey] = useState(0)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const [routeContext, setRouteContext] = useState(getRouteContext(route, routes))

  const setFilters = filters => {
    const newRoutes = ruRoutes
      .filter(post =>
        filters?.category && post.path !== pathname ? post.category === filters.category : true
      )
      .filter(post => (filters?.type && post.path !== pathname ? post.type === filters.type : true))
      .filter(post => {
        if (filters?.tags?.length && post?.tags && post.path !== pathname) {
          return post.tags.some(tag => filters.tags.includes(tag))
        } else {
          return true
        }
      })

    const route = findRouteByPath(pathname, newRoutes)
    const newRoute = getRouteContext(route, newRoutes)

    setRouteContext(newRoute)
    setKey(key + 1)
  }

  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer
        frontmatter={frontmatter}
        pagination={
          <Pagination key={key} next={routeContext.nextRoute} previous={routeContext.prevRoute} />
        }
        sidebar={<Sidebar filters={filters} setFilters={setFilters} />}
      >
        {children}
        <MDXComponents.footer {...frontmatter} />
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
