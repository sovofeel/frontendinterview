import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Badge, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'

const ItemFooter = ({ attributes }) => (
  <>
    <Box>
      Тэги:{' '}
      {attributes.tags.map(tag => (
        <Badge mr={2}>{tag}</Badge>
      ))}
    </Box>
    <Flex justifyContent="space-between">
      <Text>Сложность: {attributes.complexity}</Text>
      <Link color="blue.400" href={attributes.source} isExternal>
        Источник <ExternalLinkIcon mx="2px" />
      </Link>
    </Flex>
  </>
)

export default ItemFooter
