import path from "path"
import shell from 'shelljs'
import fs from 'graceful-fs'
import prettier from 'prettier'
import { parseMarkdownFile} from "@docusaurus/utils"

const toSrc = () => process.cwd()
const pagesDir = path.join(process.cwd(), `/pages/`)

async function createAppFilters (file) {
  const {frontMatter} = await parseMarkdownFile(file)
  const {title, category, tags ,type } = frontMatter
  return {title, category, tags ,type }
}

async function createFiltersTree(mdxData) {
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
        const oldTag1 = curr[type] ? curr[type] : []
        curr[category] = {
          ...curr[category],
          [type]: [...new Set([...tags, ...oldTags])],
        }
        curr[type] = [ ...new Set([...tags, ...oldTag1])]
        return curr
      }
      return { ...curr, ...{ [category]: { [type]: tags } } }
    }
  }, {})

  return {
    filtersTree,
    tags: [...new Set(tagsData)],
    types: [...new Set(typeData)],
    categories: [...new Set(categoryData)],
  }
}

async function getAppFilters () {
  let filters = []
  const files = shell.ls("-R", `${pagesDir}/**/*.mdx`)
  for (const file of files) {
      let result = await createAppFilters(file)
      filters.push(result)
  }

  filters = await createFiltersTree(filters)

  filters = prettier.format(JSON.stringify(filters), { parser: "json" })
  const outPath = path.join(
    toSrc(),
    'frontend',
    "configs",
    "app-filters.json",
  )
  fs.writeFileSync(outPath, filters)
  console.log("app filters is ready 🏔️")
}




getAppFilters()