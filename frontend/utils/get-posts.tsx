import { Item } from 'types/content/Item'
import loadMDXFromPages from 'frontend/utils/load-mdx-dir'

type MDXPost = Item & {
  slug: string
}

export async function getFilters() {
  const mdxData = await loadMDXFromPages('ru')
  const tagsData = []
  const categoryData = []
  const typeData = []
  const filtersTree = mdxData.reduce((curr = {}, { tags, category, type }) => {
    if (category && tags && tags.length) {
      tagsData.push(...tags)
      categoryData.push(category)
      typeData.push(type)

      if (curr[category]) {
        const oldTags = curr[category][type] ? curr[category][type] : []
        curr[category] = {
          ...curr[category],
          //@ts-ignore
          [type]: [...new Set([...tags, ...oldTags])],
        }
        return curr
      }
      //@ts-ignore
      return { ...curr, ...{ [category]: { [type]: tags } } }
    }
  }, {})

  return {
    filtersTree,
    //@ts-ignore
    tags: [...new Set(tagsData)],
    //@ts-ignore
    types: [...new Set(typeData)],
    //@ts-ignore
    categories: [...new Set(categoryData)],
  }
}

export async function getPosts() {
  const mdxData = await loadMDXFromPages('ru')
  return mdxData.map((postData: MDXPost) => ({
    ...postData,
    slug: postData.slug.replace(/\/index$/, ''), // fix url
    tags: Array.isArray(postData.tags) ? postData.tags : [],
  }))
}
