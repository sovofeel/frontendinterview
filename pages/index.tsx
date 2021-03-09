import React from 'react'
import { GetStaticProps } from 'next'
import { importRuPosts } from '../utils/content'

import { Box, Container, Flex } from '@chakra-ui/react'
import ItemWithText from '../components/ItemWithText'

import 'prismjs/themes/prism-okaidia.css'
import ItemExample from '../components/ItemExample'

const IndexPage = ({ postsList }) => (
  <Container maxW="container.xl" mt={4}>
    <Flex>
      <Box flex="1" mr={3}>
        <Box size="xl">
          {postsList.map(({ attributes, html }) =>
            attributes.type !== 'example' ? (
              <ItemWithText key={attributes.id} attributes={attributes} html={html} />
            ) : (
              <ItemExample key={attributes.id} attributes={attributes} html={html} />
            )
          )}
        </Box>
      </Box>
      <Box w="300px" borderWidth="1px" borderRadius="lg" h="800px">
        <Box></Box>
      </Box>
    </Flex>
  </Container>
)

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const [postsList] = await Promise.all([importRuPosts()])

  return {
    props: {
      postsList,
    },
  }
}
