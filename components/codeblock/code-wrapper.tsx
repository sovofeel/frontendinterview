import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React from 'react'

const CodeWrapper = ({ children, answer }) => {
  if (answer === true) {
    return (
      <Accordion allowToggle mb={2}>
        <AccordionItem border={0}>
          <AccordionButton border="1px solid var(--chakra-colors-gray-200)" w="200px">
            <Box flex="1" textAlign="left">
              {' '}
              Показать ответ{' '}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pr={0} pl={0} pb={4}>
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  } else {
    return <>{children}</>
  }
}

export default CodeWrapper
