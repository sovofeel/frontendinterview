const {read } = require('to-vfile')
const remark = require('remark')
const mdx = require('remark-mdx')
const shell =  require("shelljs")
const path = require('path')
const remarkAutolink = require('remark-autolink-headings')
const fs = require("graceful-fs")
const prettier = require('prettier')
const uuid = require("uuid")

const toSrc = () => process.cwd()
const pagesDir = path.join(process.cwd(), `/pages/`)

async function loadMDXData (filename) {
  const mdxData = {}
  const file = await read(filename)
    await remark()
    .use(mdx)
    .use(remarkAutolink)
    .use(() => tree => {
      tree.children.map(item => {
        if (item.type !== 'heading' && item.type !== 'thematicBreak') {
         const content = {
           id: uuid.v4(),
          answer: item.meta === 'answer',
          example: item.meta === 'example',
          children: item.value,
          className: item.lang 
        } 

          if (mdxData[filename] && mdxData[filename].length) {
            mdxData[filename].push({...content})
          } else {
            mdxData[filename] = [{...content}]
          }
          
        }
      })
    })
    .process(file)
  return mdxData
}

  async function getMDXData () {
  let json = {}
  const files = shell.ls("-R", `${ pagesDir }/**/*.mdx`)
  for (const file of files) {
    const content = await loadMDXData(file)
    json = {...json, ...content}
  }

  json = prettier.format(JSON.stringify(json), { parser: "json" })
  const pathToFront = path.join(
    toSrc(),
    'frontend',
    "configs",
    "main-page-content.json",
  )
  fs.writeFileSync(pathToFront, json)
  console.log("mdx content ready 🏔️")
}

getMDXData()