import { VStack, Divider } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import PostPreview from 'components/post-preview'
import React from 'react'
import { getPosts } from 'utils/get-posts'

const IndexPage = ({ posts }) => {
  return (
    <PageContainer>
      <VStack mt="10" spacing="6" align="stretch">
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <PostPreview post={post} />
          </React.Fragment>
        ))}
      </VStack>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}

export default IndexPage
