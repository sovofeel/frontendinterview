import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { getAllTags, importJsQuestions, importJsTasks, importJsExamples } from '../utils/content'
import { Box, Container, Flex } from '@chakra-ui/react'
import ItemExample from '../components/ItemExample'
import ItemTask from '../components/ItemTask'
import ItemQuestion from '../components/ItemQuestion'
import 'prismjs/themes/prism-okaidia.css'
import { Task } from '../types/content/Task'
import { Question } from '../types/content/Question'
import Filters from '../components/Filters'
import { Example } from '../types/content/Example'

interface IProps {
  jsTasks: Task[]
  jsQuestions: Question[]
  jsExamples: Example[]
}

const IndexPage = ({ jsTasks, jsQuestions, jsExamples }: IProps) => {
  const tags: string[] = getAllTags(...jsTasks, ...jsQuestions)

  return (
    <Container maxW="container.xl" mt={4}>
      <Flex>
        <Box flex="1" mr={3}>
          {jsQuestions.map(({ attributes, html }) => (
            <ItemQuestion key={attributes.id} attributes={attributes} html={html} />
          ))}
          {jsTasks.map(({ attributes, html }) => (
            <ItemTask key={attributes.id} attributes={attributes} html={html} />
          ))}
          {jsExamples.map(({ attributes, html }) => (
            <ItemExample key={attributes.id} attributes={attributes} html={html} />
          ))}
        </Box>
        <Filters tags={tags} />
      </Flex>
    </Container>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const [jsTasks, jsQuestions, jsExamples] = await Promise.all([
    importJsTasks(),
    importJsQuestions(),
    importJsExamples(),
  ])

  return {
    props: {
      jsTasks,
      jsQuestions,
      jsExamples,
    },
  }
}
