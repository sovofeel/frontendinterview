
async function getFileContent(files) {
  const fileContentMap = files
    .keys()
    .map(relativePath => relativePath.substring(2))
    .map(async path => {
      const markdown = await import(`../content/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    });

  return await Promise.all(fileContentMap);
}

// https://webpack.js.org/guides/dependency-management/#requirecontext
export const importRuPosts = async () =>
  (await getFileContent(
    require.context('../content/', false, /\.md$/)
  ));