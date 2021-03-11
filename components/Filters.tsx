import { Box } from '@chakra-ui/react'
import React from 'react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { createSelectableItems } from '../utils/content'
interface IProps {
  tags: string[]
}

const Filters = ({ tags }: IProps) => {
  const tagItems = createSelectableItems(tags)

  return (
    <Box w="300px" borderWidth="1px" borderRadius="lg" p={3} style={styles.wrapper}>
      <CUIAutoComplete placeholder="Выберите нужные теги" items={tagItems}></CUIAutoComplete>
    </Box>
  )
}

const styles: any = {
  wrapper: {
    position: 'sticky',
    top: '16px',
    height: 'min-content',
  },
}

export default Filters
