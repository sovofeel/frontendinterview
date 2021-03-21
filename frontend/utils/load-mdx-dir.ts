import { parseMarkdownFile, parseMarkdownString } from "@docusaurus/utils"
import path from "path"
import shell from "shelljs"
import MDXContent from '../../frontend/configs/main-page-content.json'

async function loadMDXFromPages(mdxDir = "guides") {
  const { processFrontmatter } = require("utils/mdx-utils")
  const dir = path.join(process.cwd(), `pages/${ mdxDir }`)
  const filenames = shell.ls("-R", `${ dir }/**/*.mdx`)
  const dataPromise = filenames.map(async (filename) => {
    const code = MDXContent[filename]
    const pagesDir = path.join(process.cwd(), "pages")
    const mdxPath = path.relative(pagesDir, filename)
    const { frontMatter } = await parseMarkdownFile(filename)

    return processFrontmatter({
      ...frontMatter,
      code: code || null,
      path: mdxPath,
    })
  })

  const data = await Promise.all(dataPromise)

  return data
}

export default loadMDXFromPages
