import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'

import React from 'react'
import { Question } from '../types/content/Question'
import ItemFooter from './ItemFooter'

const ItemQuestion = ({ attributes, html }: Question) => (
  <Box borderWidth="1px" mb={4} borderRadius="lg" overflow="hidden" p={2}>
    {attributes.title && (
      <Heading as="h2" size="md" mb={4}>
        {attributes.title}
      </Heading>
    )}
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
              __html: html,
            }}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <ItemFooter attributes={attributes} />
  </Box>
)

export default ItemQuestion
