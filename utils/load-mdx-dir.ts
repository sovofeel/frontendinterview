import { parseMarkdownFile } from "@docusaurus/utils"
import path from "path"
import shell from "shelljs"

async function loadMDXFromPages(mdxDir = "guides") {
  const { processFrontmatter } = require("utils/mdx-utils")

  const dir = path.join(process.cwd(), `pages/${ mdxDir }`)
  const filenames = shell.ls("-R", `${ dir }/**/*.mdx`)

  const dataPromise = filenames.map(async (filename) => {
    // get the `pages` directory
    const pagesDir = path.join(process.cwd(), "pages")

    // gets the relative mdx path
    // pages/docs/guides.mdx => /docs/guides.mdx
    const mdxPath = path.relative(pagesDir, filename)

    // extract frontmatter and content from markdown string
    const { frontMatter, content } = await parseMarkdownFile(filename)

    // extends frontmatter with more useful information
    return processFrontmatter({
      ...frontMatter,
      path: mdxPath,
    })
  })

  const data = await Promise.all(dataPromise)

  return data
}

export default loadMDXFromPages
