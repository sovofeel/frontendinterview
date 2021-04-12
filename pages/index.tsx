import { Box, VStack } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import PostPreview from 'components/post-preview'
import Sidebar from 'components/sidebar/Sidebar'
import * as React from 'react'
import { getPosts } from 'frontend/utils/get-posts'
import filterPosts from 'frontend/utils/filter-posts'
import initFilters from '../frontend/configs/app-filters.json'

const IndexPage = ({ initPosts }) => {
  const [posts, setPosts] = React.useState(initPosts)
  const filterKeyList = ['category', 'type', 'tags']

  const setFilters = newFilters => {
    setPosts(filterPosts(initPosts, newFilters, filterKeyList))
  }

  return (
    <PageContainer sidebar={<Sidebar setFilters={setFilters} filters={initFilters} />}>
      <Box display={{ base: 'block', md: 'flex' }}>
        <VStack width="100%" spacing="6" align="stretch">
          {posts.map(post => (
            <React.Fragment key={post.id}>
              <PostPreview post={post} />
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const initPosts = await getPosts()
  return {
    props: {
      initPosts,
    },
  }
}

export default IndexPage
