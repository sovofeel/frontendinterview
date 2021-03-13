async function redirect() {
  return [
    {
      source: "/",
      destination: "/",
      permanent: true,
    },
  ]
}

module.exports = redirect
