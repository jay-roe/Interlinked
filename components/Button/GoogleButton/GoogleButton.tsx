import React from 'react'
import { FaGoogle } from 'react-icons/fa'

export default function GoogleButton(props) {
  return (
    <button {...props} className={`${props.className} text-center inline-flex items-center focus:outline-none text-white bg-sky-800 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-blue-900  `}><FaGoogle className='mr-2' />{props.children}</button>
  )
}
