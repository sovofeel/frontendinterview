import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Kbd, Link, SimpleGrid, Text, useEventListener } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const PaginationLink = props => {
  const { href, children } = props

  return (
    <NextLink href={href} passHref>
      <Link
        py="3"
        _hover={{
          textDecor: 'none',
        }}
        flex="1"
        borderRadius="md"
        border="1px solid var(--chakra-colors-gray-200)"
      >
        <Text
          display="flex"
          justifyContent="space-between"
          fontSize="md"
          fontWeight="bold"
          color="teal.400"
        >
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  const router = useRouter()
  useEventListener('keydown', event => {
    if (event.altKey && event?.key?.toLowerCase() === 'arrowright' && previous?.path) {
      router.push(previous.path)
    }

    if (event.altKey && event?.key?.toLowerCase() === 'arrowleft' && next?.path) {
      router.push(next.path)
    }
  })

  return (
    <SimpleGrid
      as="nav"
      bg="#fff"
      zIndex="1"
      maxW="100%"
      left="0"
      right="0"
      bottom="0"
      position="sticky"
      aria-label="Pagination"
      spacing="10px"
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink href={previous.path} rel="prev">
          <span>
            <ChevronLeftIcon mx="1" fontSize="1em" />
            {previous.title.toLowerCase()}
          </span>
          <span style={{ padding: '0 10px', display: 'flex-inline', alignItems: 'center' }}>
            <Kbd color="gray.500" rounded="2px">
              ←
            </Kbd>{' '}
            <Kbd color="gray.500" rounded="2px">
              alt
            </Kbd>
          </span>
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink href={next.path} rel="next">
          <span style={{ padding: '0 10px', display: 'flex-inline', alignItems: 'center' }}>
            <Kbd color="gray.500" rounded="2px">
              alt
            </Kbd>{' '}
            <Kbd color="gray.500" rounded="2px">
              →
            </Kbd>
          </span>
          <span>
            {next.title.toLowerCase()}
            <ChevronRightIcon mx="1" fontSize="1em" />
          </span>
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
