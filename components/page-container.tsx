import { useRouter } from 'next/router'
import * as React from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import Container from '../components/container'
import ItemFooter from './ItemFooter'
//import { convertBackticksToInlineCode } from "utils/convert-backticks-to-inline-code"

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
  frontmatter: {
    slug?: string
    description?: string
    category: string
    complexity: string
    lang: string
    tags: string[]
    title: string
  }
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const { children, pagination, frontmatter } = props
  const { title, tags, complexity, source, description } = frontmatter
  useHeadingFocusOnRouteChange()

  return (
    <>
      <Container as="main" className="main-content">
        <Box display={{ base: 'block', md: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Heading as="h1" size="md" mb={4}>
              {title}
            </Heading>
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
            <Box id="content">
              {children}
              {pagination || null}
            </Box>
          </div>
        </Box>
      </Container>
    </>
  )
}

export default PageContainer
