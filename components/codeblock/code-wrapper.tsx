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
          <AccordionButton
            borderRadius="var(--chakra-radii-md)"
            border="none"
            background="var(--chakra-colors-teal-500)"
            color="var(--chakra-colors-white)"
            w="200px"
            _hover={{
              background: 'var(--chakra-colors-teal-600)',
            }}
          >
            <Box flex="1" textAlign="left">
              Показать ответ
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
