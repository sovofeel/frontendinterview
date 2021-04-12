import { Box, Stack, Tag, Select, Button, chakra, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import useSessionStorage from 'frontend/hooks/useStorage'
import * as React from 'react'

const Sidebar = ({ filters, setFilters }) => {
  const [resetKey, setResetKey] = React.useState(0)
  const [category, setCategory] = useSessionStorage<any>('category', '')
  const [types, setTypes] = React.useState<any>()
  const [type, setType] = useSessionStorage<any>('type', '')
  const [tags, setTags] = React.useState<any>()
  const [selectedTags, setSelectedTags] = useSessionStorage<any>('tags', [])

  React.useEffect(() => {
    setResetKey(resetKey + 1)
    setFilters({ tags: selectedTags, type, category })
  }, [])

  React.useEffect(() => {
    if (category) {
      setTypes(Object.keys(filters.filtersTree[category]))
    } else {
      setTypes(filters.types)
    }
  }, [category, filters.types])

  React.useEffect(() => {
    if (type && category) {
      setTags(filters.filtersTree[category][type])
    } else if (type && !category) {
      setTags(filters.filtersTree[type])
    } else if (!category) {
      setTags(filters.tags)
    } else if (!type && category && typeof category === 'string') {
      let newTags = [...Object.values(filters.filtersTree[category]).flat()] as string[]
      setTags(newTags)
    }
  }, [type, filters.tags, category])

  const handleSetFilters = () => {
    setFilters({ tags: selectedTags, type, category })
  }

  const resetFilters = () => {
    setTypes(filters.types)
    setTags(filters.tags)
    setResetKey(resetKey + 1)
    setSelectedTags([])
    setCategory('')
    setType('')
    setFilters('')
  }

  const onCategoryChange = event => {
    setSelectedTags([])
    setCategory(event.target.value)
    setType('')
  }

  const onTypeChange = event => {
    setSelectedTags([])
    setType(event.target.value)
  }

  const handleSelectTag = event => {
    const value = event.target.innerHTML

    if (selectedTags.indexOf(value) === -1) {
      setSelectedTags([...selectedTags, value])
    } else {
      setSelectedTags(selectedTags.filter(item => item !== value))
    }
  }

  return (
    <Box
      as="nav"
      key={resetKey}
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      h={`calc((100vh - 1.5rem) - 48px);`}
      w="280px"
      top="72px"
      placeSelf="0"
      pt="var(--chakra-space-3)"
      pb="8"
      pr="6"
      mr="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <chakra.h4
        fontSize="sm"
        fontWeight="bold"
        mb="1.25rem"
        textTransform="uppercase"
        letterSpacing="wider"
        color={useColorModeValue('gray.700', 'inherit')}
      >
        Фильтры
      </chakra.h4>
      <Stack mt={8} spacing="6" align="stretch">
        <Select
          key={category}
          defaultValue={category}
          onChange={event => onCategoryChange(event)}
          placeholder="Выберите категорию"
        >
          {Array.isArray(filters.categories) &&
            filters.categories.map(item => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            })}
        </Select>
        <Select
          key={type}
          defaultValue={type}
          onChange={event => onTypeChange(event)}
          placeholder="Выберите тип"
        >
          {Array.isArray(types) &&
            types.map((item, index) => {
              return (
                <option key={item + index + category} value={item}>
                  {item}
                </option>
              )
            })}
        </Select>
      </Stack>
      <Box mt={8} display="flex" justifyContent="space-between">
        <Button colorScheme="teal" onClick={handleSetFilters}>
          Применить
        </Button>
        <Button colorScheme="red" onClick={resetFilters}>
          Сбросить
        </Button>
      </Box>
      <Box maxW="300" mt={4} align="center">
        <motion.ul layout>
          {Array.isArray(tags) &&
            tags.map((item, index) => {
              return (
                <motion.li key={index} style={{ display: 'inline-flex' }} layout>
                  <Tag
                    onClick={event => handleSelectTag(event)}
                    cursor="pointer"
                    mr={2}
                    value={item}
                    mb={2}
                    key={item}
                    colorScheme={selectedTags.indexOf(item) === -1 ? 'red' : 'teal'}
                  >
                    {item}
                  </Tag>
                </motion.li>
              )
            })}
        </motion.ul>
      </Box>
    </Box>
  )
}

export default Sidebar
