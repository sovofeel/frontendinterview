const path = require("path")
const { addLeadingSlash } = require("@docusaurus/utils")

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

async function processFrontmatter(options) {
  const { path: mdxPath, tags, baseEditUrl, ...rest } = options

  const slug = fileToPath(mdxPath)

  return {
    ...rest,
    slug,
    tags,
  }
}


module.exports = {
  fileToPath,
  processFrontmatter,
}
