import { useRouter } from 'next/router'
import * as React from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import Container from 'components/container'
import Header from './header'
import PageTransition from './page-transition'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [])
}

interface PageContainerProps {
  frontmatter?: {
    slug?: string
    description?: string
    category?: string
    complexity?: string
    lang?: string
    tags?: string[]
    title?: string
  }
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const { children, pagination, frontmatter, sidebar } = props
  const { title, description } = frontmatter || { title: null, description: null }
  useHeadingFocusOnRouteChange()

  return (
    <>
      <Header />
      <Container mt="4.5rem" pt="0" pb="var(--chakra-space-10)" as="main" className="main-content">
        <Box display={{ base: 'block', md: 'flex' }}>
          {sidebar || null}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 'var(--chakra-space-3)',
            }}
          >
            {title && (
              <Heading as="h1" size="md" mb={4}>
                {title}
              </Heading>
            )}
            {description && (
              <Box mb={2}>
                <Text fontSize=".90em" as="em">
                  <Text as="span" fontWeight="600">
                    Описание:&nbsp;
                  </Text>
                  {description}
                </Text>
              </Box>
            )}
            <Box id="content" marginBottom={pagination ? '72px' : '0'}>
              <PageTransition>{children}</PageTransition>
            </Box>
            {pagination || null}
          </div>
        </Box>
      </Container>
    </>
  )
}

export default PageContainer
