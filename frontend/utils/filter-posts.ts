import { Post } from "types/content/Post"


const filterPosts = (posts: Post[], filters: Post, filterKeyList, initCb?: Function) => {
  return posts
    .filter((post) => {
      const cb = initCb ? initCb : () => true
      return filterKeyList.every(filterKey => {
        if (cb(post) && post[filterKey] instanceof Array && filters[filterKey] instanceof Array) {
          return post[filterKey].length && filters[filterKey].length ? post[filterKey].some(key => filters[filterKey].includes(key)) : true
        }
        return cb(post) && post[filterKey] && filters[filterKey] ? post[filterKey] === filters[filterKey] : true
      })
    })
}

export default filterPosts