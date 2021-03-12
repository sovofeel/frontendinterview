import { Example } from "../types/content/Example";
import { Item } from "../types/content/Item";
import { Question } from "../types/content/Question";
import { Task } from "../types/content/Task";

async function getFileContent(files: any, type: string) {
  const fileContentMap = files
    .keys()
    .map((relativePath: string) => relativePath.substring(2))
    .map(async (path: string) => {
      const markdown = await import(`../content/${ type }/${ path }`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    });

  return await Promise.all(fileContentMap);
}

// https://webpack.js.org/guides/dependency-management/#requirecontext
export const importJsTasks = async (): Promise<Task[]> =>
  (await getFileContent(
    // @ts-ignore
    require.context('../content/js/task', false, /\.md$/),
    'js/task'
  )) as Task[]

export const importJsQuestions = async (): Promise<Question[]> =>
  (await getFileContent(
    // @ts-ignore
    require.context('../content/js/question', false, /\.md$/),
    'js/question'
  )) as Question[]

export const importJsExamples = async (): Promise<Example[]> =>
  (await getFileContent(
    // @ts-ignore
    require.context('../content/js/example', false, /\.md$/),
    'js/example'
  )) as Example[]


export const importReactQuestions = async (): Promise<Question[]> =>
  (await getFileContent(
    // @ts-ignore
    require.context('../content/react/question', false, /\.md$/),
    'react/question'
  )) as Question[]

export const getAllTags = (...rest: Item[]) => {
  const tagList: string[] = []
  rest.map(item => {
    item.attributes.tags.map(tag => {
      tagList.push(tag)
    })
  })

  return [...new Set(tagList)];
}

export const createSelectableItems = (items: string[]) => items.map(item => ({ value: item, label: item }))
