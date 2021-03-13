import { Box, chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import CodeBlock from './codeblock/codeblock'
import PostFooter from './post-footer'

const LinkedHeading = (props: HTMLChakraProps<'h2'>) => (
  <chakra.h2 data-group="" css={{ scrollMarginBlock: '6.875rem' }} {...props}>
    <span className="content">{props.children}</span>
    {props.id && (
      <chakra.a
        aria-label="anchor"
        color="teal.500"
        fontWeight="normal"
        outline="none"
        _focus={{ opacity: 1, boxShadow: 'outline' }}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        ml="0.375rem"
        href={`#${props.id}`}
      >
        #
      </chakra.a>
    )}
  </chakra.h2>
)

const InlineCode = (props: any) => (
  <chakra.code apply="mdx.code" color={useColorModeValue('purple.500', 'purple.200')} {...props} />
)

const MDXComponents = {
  h1: props => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: props => <LinkedHeading apply="mdx.h2" {...props} />,
  h3: props => <LinkedHeading as="h3" apply="mdx.h3" {...props} />,
  h4: props => <LinkedHeading as="h4" apply="mdx.h4" {...props} />,
  hr: props => <chakra.hr apply="mdx.hr" {...props} />,
  strong: props => <Box as="strong" fontWeight="semibold" {...props} />,
  ul: props => <chakra.ul apply="mdx.ul" {...props} />,
  li: props => <chakra.li pb="4px" {...props} />,
  inlineCode: InlineCode,
  footer: props => <PostFooter {...props} />,
  code: CodeBlock,
}

export default MDXComponents
