import { Box, Text, Heading, Link, LinkBox, LinkOverlay, VStack } from '@chakra-ui/react'
import React from 'react'
import PostFooter from './post-footer'

const PostPreview = ({ post }) => {
  return (
    <LinkBox w="100%" as="article" cursor="pointer" position="relative" rounded="md" pb="3">
      <VStack align="flex-start" mb="5">
        <Heading as="h3" size="md">
          <Link href={post.slug}>
            <LinkOverlay>{post.title}</LinkOverlay>
          </Link>
        </Heading>
        {post.description && (
          <Box mb={2}>
            <Text fontSize=".90em" as="em">
              <Text as="span" fontWeight="600">
                Описание:&nbsp;
              </Text>
              {post.description}
            </Text>
          </Box>
        )}
        <Box w="100%">
          <PostFooter {...post} />
        </Box>
      </VStack>
    </LinkBox>
  )
}

export default PostPreview
