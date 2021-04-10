import { Link, SimpleGrid, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import React from 'react'

export const PaginationLink = props => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: 'none',
        }}
        flex="1"
        borderRadius="md"
        {...rest}
      >
        <Text fontSize="sm" px="2">
          {label}
        </Text>
        <Text mt="1" fontSize="lg" fontWeight="bold" color="teal.400">
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  return (
    <SimpleGrid
      as="nav"
      bg="#fff"
      zIndex="1"
      maxW="100%"
      left="0"
      right="0"
      bottom="0"
      position="fixed"
      aria-label="Pagination"
      spacing="40px"
      boxShadow="dark-lg"
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink padding="10px 20px" textAlign="left" href={previous.path} rel="prev">
          <ChevronLeftIcon mr="1" fontSize=".75em" />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink padding="10px 20px" textAlign="right" href={next.path} rel="next">
          {next.title}
          <ChevronRightIcon ml="1" fontSize=".75em" />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
