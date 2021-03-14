import { Flex, chakra, useColorModeValue } from '@chakra-ui/react'
import { useViewportScroll } from 'framer-motion'
import * as React from 'react'
import Search from './search/search'

const Header = () => {
  const ref = React.useRef<HTMLHeadingElement>()
  const bg = useColorModeValue('white', 'gray.800')
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}
  const { scrollY } = useViewportScroll()
  const [y, setY] = React.useState(0)

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        pos="fixed"
        top="0"
        zIndex="3"
        bg={bg}
        left="0"
        right="0"
        width="full"
      >
        <chakra.div height="4.5rem" mx="auto" maxW="1200px">
          <Flex w="100%" h="100%" px="6" align="center" justify="center">
            <Flex justify="flex-end" w="100%" maxW="824px" align="center" color="gray.400">
              <Search />
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </>
  )
}

export default Header
