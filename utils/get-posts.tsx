import loadMDXFromPages from 'utils/load-mdx-dir'

export async function getPosts() {
  const mdxData = await loadMDXFromPages('ru')
  return mdxData.map(postData => ({
    ...postData,
    slug: postData.slug.replace(/\/index$/, ''), // fix url
    tags: Array.isArray(postData.tags) ? postData.tags : [],
  }))
}
