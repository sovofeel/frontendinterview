import path from "path"
import shell from 'shelljs'
import fs from 'graceful-fs'
import prettier from 'prettier'
import { parseMarkdownFile} from "@docusaurus/utils"

const toSrc = () => process.cwd()
const pagesDir = path.join(process.cwd(), `/pages/`)

async function createAppRoutes (file) {
  const {frontMatter} = await parseMarkdownFile(file)
  const {title, category,  type, tags } = frontMatter
  const route = file.slice(file.indexOf('pages') + 5, -4)
  
  return {
    title, category, type, tags, path: route
  }
}

async function getAppRoutes () {
  let routes = []
  const files = shell.ls("-R", `${pagesDir}/**/*.mdx`)
  for (const file of files) {
    const route = await createAppRoutes(file)
    routes.push(route)
  }

  routes = prettier.format(JSON.stringify(routes), { parser: "json" })
  const outPath = path.join(
    toSrc(),
    'frontend',
    "configs",
    "app-routes.json",
  )
  fs.writeFileSync(outPath, routes)
  console.log("app routes is ready 🏔️")
}


getAppRoutes()