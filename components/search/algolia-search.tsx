import { SearchIcon } from '@chakra-ui/icons'
import {
  chakra,
  HStack,
  HTMLChakraProps,
  Kbd,
  Portal,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import SearchStyle from './search.styles'

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

function Hit(props: any) {
  const { hit, children } = props
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

export const SearchButton = React.forwardRef(function SearchButton(
  props: HTMLChakraProps<'button'>,
  ref: React.Ref<HTMLButtonElement>
) {
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  return (
    <chakra.button
      flex="1"
      type="button"
      role="search"
      mx="6"
      ref={ref}
      lineHeight="1.2"
      w="100%"
      bg={useColorModeValue('white', 'gray.700')}
      whiteSpace="nowrap"
      display={{ base: 'none', sm: 'flex' }}
      alignItems="center"
      color="gray.400"
      py="3"
      px="4"
      outline="0"
      _focus={{ shadow: 'outline' }}
      shadow="base"
      rounded="md"
      aria-label="Поиск по сайту"
      {...props}
    >
      <SearchIcon />
      <HStack w="full" ml="3" spacing="4px">
        <Text textAlign="left" flex="1">
          Поиск по документам
        </Text>
        <HStack spacing="4px">
          <VisuallyHidden>Press </VisuallyHidden>
          <Kbd color="gray.500" rounded="2px">
            <chakra.div as="abbr" title={actionKey[1]} textDecoration="none !important">
              {ACTION_KEY_APPLE[0]}
            </chakra.div>
          </Kbd>
          <VisuallyHidden> and </VisuallyHidden>
          <Kbd color="gray.500" rounded="2px">
            K
          </Kbd>
          <VisuallyHidden> to search</VisuallyHidden>
        </HStack>
      </HStack>
    </chakra.button>
  )
})

function AlgoliaSearch() {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const searchButtonRef = React.useRef()
  const [initialQuery, setInitialQuery] = React.useState(null)

  const onOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = React.useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = React.useCallback(
    e => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <>
      <SearchStyle />
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {isOpen && (
        <Portal>
          <DocSearchModal
            placeholder="Поиск по документам"
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            navigator={{
              navigate({ suggestionUrl }) {
                setIsOpen(false)
                router.push(suggestionUrl)
              },
            }}
            hitComponent={Hit}
            transformItems={items => {
              return items.map(item => {
                const a = document.createElement('a')
                a.href = item.url
                const hash = a.hash === '#content-wrapper' ? '' : a.hash
                item.url = `${a.pathname}${hash}`
                return item
              })
            }}
          />
        </Portal>
      )}
    </>
  )
}

export default AlgoliaSearch
