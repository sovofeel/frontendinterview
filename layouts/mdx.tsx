import * as React from 'react'
import * as chakraComponents from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from 'components/mdx-components'
import PageContainer from 'components/page-container'
import { findRouteByPath, removeFromLast } from '../frontend/utils/find-route-by-path'
import { getRouteContext } from '../frontend/utils/get-route-context'
import ruRoutes from '../frontend/configs/app-routes.json'
import Pagination from 'components/pagination'
import Sidebar from 'components/sidebar/Sidebar'
import initFiltersData from '../frontend/configs/app-filters.json'
import { useRouter } from 'next/router'
import filterPosts from 'utils/filter-posts'

function MDXLayout({ frontmatter, children }) {
  const { pathname } = useRouter()
  const routes = ruRoutes
  const [key, setKey] = React.useState(0)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const [routeContext, setRouteContext] = React.useState(getRouteContext(route, routes))
  function isNotCurrentPostPath(post) {
    return post.path !== pathname
  }

  const filterKeyList = ['category', 'type', 'tags']

  const setFilters = filters => {
    const newRoutes = filterPosts(ruRoutes, filters, filterKeyList, isNotCurrentPostPath)
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
        sidebar={<Sidebar filters={initFiltersData} setFilters={setFilters} />}
      >
        {children}
        <MDXComponents.footer {...frontmatter} />
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
