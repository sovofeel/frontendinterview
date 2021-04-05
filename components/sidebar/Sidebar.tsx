import { Box, Stack, Tag, Select, Button } from '@chakra-ui/react'
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
    } else if (!category) {
      setTags(filters.tags)
    } else if (!type && category && typeof category === 'string') {
      let newTags = [...Object.values(filters.filtersTree[category]).flat()] as string[]
      setTags(newTags)
    }
  }, [type, filters.tags, category])

  const onCategoryChange = event => {
    setCategory(event.target.value)
    setType('')
  }

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

  const onTypeChange = event => {
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
      w="300px"
      pr="3"
      pb="8"
      pl="8"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <Stack mt={8} spacing="6" align="stretch">
        <Select onChange={event => onCategoryChange(event)} placeholder="Выберите категорию">
          {filters.categories &&
            filters.categories.map(item => {
              return (
                <option selected={item === category} key={item} value={item}>
                  {item}
                </option>
              )
            })}
        </Select>
        <Select onChange={event => onTypeChange(event)} placeholder="Выберите тип">
          {types &&
            types.map((item, index) => {
              return (
                <option selected={item === type} key={item + index + category} value={item}>
                  {item}
                </option>
              )
            })}
        </Select>
      </Stack>
      <Box mt={8}>
        <Button mr="24px" colorScheme="teal" onClick={handleSetFilters}>
          Применить
        </Button>
        <Button colorScheme="red" onClick={resetFilters}>
          Сбросить
        </Button>
      </Box>
      <Box maxW="300" mt={4} align="center">
        {tags &&
          tags.map((item, index) => {
            return (
              <Tag
                onClick={event => handleSelectTag(event)}
                cursor="pointer"
                mr={2}
                value={item}
                mb={2}
                colorScheme={selectedTags.indexOf(item) === -1 ? 'red' : 'teal'}
                key={item + index + type}
              >
                {item}
              </Tag>
            )
          })}
      </Box>
    </Box>
  )
}

export default Sidebar
