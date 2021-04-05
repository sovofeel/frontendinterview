const filterPosts = (posts, filters) => {
  return posts.filter(post => (filters?.category ? post.category === filters.category : true))
    .filter(post => (filters?.type ? post.type === filters.type : true))
    .filter(post => {
      if (filters?.tags?.length) {
        return post.tags.some(tag => filters.tags.includes(tag))
      } else {
        return true
      }
    })
}

export default filterPosts