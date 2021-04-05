import { Box, VStack } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import PostPreview from 'components/post-preview'
import Sidebar from 'components/sidebar/Sidebar'
import React, { useState } from 'react'
import { getFilters, getPosts } from 'frontend/utils/get-posts'
import filterPosts from 'frontend/utils/filter-posts'

const IndexPage = ({ initPosts, initFilters }) => {
  const [posts, setPosts] = useState(initPosts)

  const setFilters = newFilters => {
    setPosts(filterPosts(initPosts, newFilters))
  }

  return (
    <PageContainer sidebar={<Sidebar setFilters={setFilters} filters={initFilters} />}>
      <Box display={{ base: 'block', md: 'flex' }}>
        <VStack width="100%" mt="10" spacing="6" align="stretch">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <PostPreview post={post} />
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const initFilters = await getFilters()
  const initPosts = await getPosts()
  return {
    props: {
      initPosts,
      initFilters,
    },
  }
}

export default IndexPage
