import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Badge, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { Item } from '../types/content/Item'

type IProps = Item

const ItemFooter = ({ tags, complexity, source }: IProps) => {
  return (
    <>
      <Box>
        Тэги:{' '}
        {tags &&
          tags.map(tag => (
            <Badge key={tag} mr={2}>
              {tag}
            </Badge>
          ))}
      </Box>
      <Flex justifyContent="space-between">
        <Text>Сложность: {complexity}</Text>
        {source && (
          <Link color="blue.400" href={source} isExternal>
            Источник <ExternalLinkIcon mx="2px" />
          </Link>
        )}
      </Flex>
    </>
  )
}

export default ItemFooter
