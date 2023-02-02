import React from 'react'
import { FaGoogle } from 'react-icons/fa'

export default function Button(props) {
  return (
    <button {...props} className={`${props.className} text-center inline-flex items-center focus:outline-none text-purple-background bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900  `}>{props.children}</button>
  )
}
