import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import { Example } from '../types/content/Example'
import ItemFooter from './ItemFooter'

const ItemExample = ({ attributes, html = '' }: Example) => {
  const first = html && html.slice(0, html.indexOf('</pre>') + 6)
  const second = html && html.slice(html.indexOf('</pre>') + 6, -1)

  return (
    <Box borderWidth="1px" mb={4} borderRadius="lg" overflow="hidden" p={2}>
      {attributes.title && (
        <Heading as="h2" size="md" mb={4}>
          {attributes.title}
        </Heading>
      )}
      <Box
        maxW="100%"
        mb={4}
        dangerouslySetInnerHTML={{
          __html: first,
        }}
      />
      <Accordion allowToggle mb={2}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {' '}
              Показать ответ{' '}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box
              maxW="100%"
              mb={4}
              dangerouslySetInnerHTML={{
                __html: second,
              }}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <ItemFooter attributes={attributes} />
    </Box>
  )
}

export default ItemExample
