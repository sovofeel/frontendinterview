const withPlugins = require("next-compose-plugins")
const withMdx = require("next-mdx-enhanced")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const { addLeadingSlash } = require("@docusaurus/utils")

function fileToPath(str) {
  return addLeadingSlash(str.replace(".mdx", ""))
}

const defaultConfig = {
  target: "serverless",
  webpack: (config) => ({
    ...config,
    externals: [...config.externals, "sharp"],
  }),
  experimental: {
    optimizeFonts: true,
    modern: true,
  },
  //redirects: require("./next-redirect"),
}

const mdxConfig = {
  layoutPath: "layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [
    require("remark-autolink-headings"),
    require("remark-emoji"),
    require("remark-images"),
    require("remark-slug"),
    require("remark-toc"),
    require("remark-unwrap-images"),
  ],
  rehypePlugins: [],
  extendFrontMatter: {
    process: async (_, frontmatter) => {
      const { __resourcePath: mdxPath, tags } = frontmatter
      const slug = fileToPath(mdxPath)

      return {
        slug,
        tags,
      }
    },
  },
}

module.exports = withPlugins(
  [withBundleAnalyzer, withMdx(mdxConfig)],
  defaultConfig,
)
