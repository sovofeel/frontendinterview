import {
  Box,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'

import React from 'react'
import { Task } from '../types/content/Task'
import ItemFooter from './ItemFooter'

const ItemTask = ({ attributes, html = '' }: Task) => (
  <Box borderWidth="1px" mb={4} borderRadius="lg" overflow="hidden" p={2}>
    {attributes.title && (
      <Heading as="h2" size="md" mb={4}>
        {attributes.title}
      </Heading>
    )}
    {attributes?.description && (
      <Box mb={2}>
        <Text fontSize=".90em" as="em">
          <Text as="span" fontWeight="600">
            Описание:&nbsp;
          </Text>
          {attributes.description}
        </Text>
      </Box>
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
            display="inline-grid"
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

export default ItemTask
