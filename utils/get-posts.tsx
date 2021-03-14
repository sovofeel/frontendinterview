import { Item } from 'types/content/Item'
import loadMDXFromPages from 'utils/load-mdx-dir'

type MDXPost = Item & {
  slug: string
}

export async function getPosts() {
  const mdxData = await loadMDXFromPages('ru')
  return mdxData.map((postData: MDXPost) => ({
    ...postData,
    slug: postData.slug.replace(/\/index$/, ''), // fix url
    tags: Array.isArray(postData.tags) ? postData.tags : [],
  }))
}
