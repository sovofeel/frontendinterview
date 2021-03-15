import { parseMarkdownFile, fileToPath, removePrefix } from "@docusaurus/utils"
import path from "path"
import toc from "markdown-toc"
import { v4 as uuid } from "uuid"
import shell from "shelljs"
import fs from "graceful-fs"
import prettier from "prettier"

const websiteRoot = "pages"

async function getMDXMeta(file) {
  const { content, frontMatter } = await parseMarkdownFile(file)
  const tableOfContent = toc(content)
  const json = tableOfContent.json 
  const slug = fileToPath(file)
    .replace(`/${ websiteRoot }`, "")
    .replace(process.cwd(), "")

  const result = []

  result.push({
    content: frontMatter.title,
    id: uuid(),
    type: "lvl1",
    url: removePrefix(slug, "/"),
    hierarchy: {
      lvl1: frontMatter.title,
      lvl2: frontMatter.description,
      lvl3: frontMatter.tags
    },
  })

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      id: uuid(),
      type: `lvl${ item.lvl }` ,
      url: removePrefix(slug, "/") + `#${ item.slug }`,
      hierarchy: {
        lvl1: frontMatter.title,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ||  null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    })
  })

  return result
}

async function getSearchMeta() {
  let json  = []

  const files = shell
    .ls("-R", websiteRoot)
    .map((file) => path.join(process.cwd(), websiteRoot, file))
    .filter((file) => file.endsWith(".mdx"))

  for (const file of files) {
    let result = []
    try {
      result = await getMDXMeta(file)
      json.push(...result)
    } catch (error) { }
  }

  json = prettier.format(JSON.stringify(json), { parser: "json" })
  const outPath = path.join(
    process.cwd(),
    "configs",
    "search-meta.json",
  )
  fs.writeFileSync(outPath, json)
  console.log("Search meta is ready ✅")
}

getSearchMeta()
