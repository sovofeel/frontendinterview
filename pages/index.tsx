import { Box, VStack } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import PostPreview from 'components/post-preview'
import Sidebar from 'components/sidebar/Sidebar'
import React, { useState } from 'react'
import { getFilters, getPosts } from 'frontend/utils/get-posts'

const IndexPage = ({ posts: _posts, filters }) => {
  const [posts, setPosts] = useState(_posts)

  const setFilters = filters => {
    const newPosts = _posts
      .filter(post => (filters?.category ? post.category === filters.category : true))
      .filter(post => (filters?.type ? post.type === filters.type : true))
      .filter(post => {
        if (filters?.tags?.length) {
          return post.tags.some(tag => filters.tags.includes(tag))
        } else {
          return true
        }
      })

    setPosts(newPosts)
  }

  return (
    <PageContainer sidebar={<Sidebar setFilters={setFilters} filters={filters} />}>
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
  const filters = await getFilters()
  const posts = await getPosts()
  return {
    props: {
      posts,
      filters,
    },
  }
}

export default IndexPage
