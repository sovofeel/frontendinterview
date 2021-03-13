import React from 'react'

const reactScope = {
  React,
  ...React,
}

function getScope(language: string) {
  switch (language) {
    case 'jsx':
      return reactScope
    case 'js':
      return global
    default:
      return global
  }
}

export default getScope
