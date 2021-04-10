import { Post } from 'types/content/Post'
import loadMDXFromPages from 'frontend/utils/load-mdx-dir'

type MDXPost = Post & {
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
