const path = require('path')
const shell =  require("shelljs")
const {read } = require('to-vfile')
const remark = require('remark')
const mdx = require('remark-mdx')
const prettier = require('prettier')
const fs = require("graceful-fs")
const remarkAutolink = require('remark-autolink-headings')
const examplesDir = path.join(process.cwd(), `/docs/examples`)

const toSrc = () => process.cwd()

async function loadMDXData (filename) {
  const mdxData = {}
  const variants = []
  let children = ''
  let answer = ''
  let title = ''
  let answerText = ''
  const answerTitle = 'Ответ: '
  const file = await read(filename)
  await remark()
  .use(mdx)
  .use(remarkAutolink)
  .use(() => tree => {
    tree.children.map((item, index) => {
      
      
      if (item.type === 'heading' && item.depth === 6)  {
      
        title = item.children[0].value
       }

     if (item.type === 'heading' && item.depth === 4)  {
      
      answer = item.children[0].value.slice(answerTitle.length)
      answerText = item.children[0].value.slice(answerTitle.length, -1)
     }

     console.log(item);
      
      if (item.type !== 'heading' && item.type !== 'thematicBreak') {

        if (index === 1) {
          children = item.value
        }


        if(item.lang === 'answerText') {
          answerText = item.value
        }

        if(item.lang === 'variant') {
          const [variantName, variantValue] = item.value.split(': ')
          variants.push({[ variantName ]: variantValue})
        }



        const content = {
          answer,
          answerText,
          title,
         children,
         className: 'js',
         type: 'example',
         variants
       } 
           mdxData[filename] = [{...content}]
      }
    })
  })
  .process(file)
  return mdxData

}

async function getMDXData () {
  let json = {}
  const files = shell.ls("-R", `${ examplesDir }/**/*.mdx`)
  
  for (const file of files) {
    
    const content = await loadMDXData(file)
    json = {...json, ...content}
  }

  json = prettier.format(JSON.stringify(json), { parser: "json" })
  const pathToFront = path.join(
    toSrc(),
    'frontend',
    "configs",
    "examples-content.json",
  )
  fs.writeFileSync(pathToFront, json)
  console.log("mdx examples ready 🏔️")
}

getMDXData()