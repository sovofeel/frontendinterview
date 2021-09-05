import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Badge, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { Post } from '../types/content/Post'

type IProps = Post

const PostFooter = ({ tags, type, source }: IProps) => {
  return (
    <>
      <Box>
        {tags && tags.length > 0 && <span>Теги:</span>}
        {tags &&
          tags.length > 0 &&
          tags.map(tag => (
            <Badge key={tag} mr={2}>
              {tag}
            </Badge>
          ))}
      </Box>
      <Flex justifyContent="space-between">
        {type && <Text>Тип: {type}</Text>}
        {source && (
          <Link color="blue.400" href={source} isExternal>
            Источник <ExternalLinkIcon mx="2px" />
          </Link>
        )}
      </Flex>
    </>
  )
}

export default PostFooter
