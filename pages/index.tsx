import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { getAllTags, importJsQuestions, importJsTasks } from '../utils/content'
import { Box, Container, Flex } from '@chakra-ui/react'
import ItemQuestion from '../components/ItemQuestion'
import 'prismjs/themes/prism-okaidia.css'
import { Task } from '../types/content/Task'
import { Question } from '../types/content/Question'
import Filters from '../components/Filters'

interface IProps {
  jsTasks: Task[]
  jsQuestions: Question[]
}

const IndexPage = ({ jsTasks, jsQuestions }: IProps) => {
  const tags: string[] = getAllTags(...jsTasks, ...jsQuestions)

  return (
    <Container maxW="container.xl" mt={4}>
      <Flex>
        <Box flex="1" mr={3}>
          {jsQuestions.map(({ attributes, html }) => (
            <ItemQuestion key={attributes.id} attributes={attributes} html={html} />
          ))}
          {jsTasks.map(({ attributes, html }) => (
            <ItemQuestion key={attributes.id} attributes={attributes} html={html} />
          ))}
        </Box>
        <Filters tags={tags} />
      </Flex>
    </Container>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const [jsTasks, jsQuestions] = await Promise.all([importJsTasks(), importJsQuestions()])

  return {
    props: {
      jsTasks,
      jsQuestions,
    },
  }
}
