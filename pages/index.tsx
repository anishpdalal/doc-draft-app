import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Home: NextPage = () => {
  
  const [uploading, setUploading] = useState(false)
  const [buttonText, setButtonText] = useState("Upload")
  const router = useRouter()

  const handleClick = () => {
    if (uploading) {
      setUploading(false)
      setButtonText("Upload")
    } else {
      setUploading(true)
      setButtonText("Processing...")
      setTimeout(() => {
        router.push('/draft')
      }, 20000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex mb-5 w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Doc Draft
        </h1>
      </main>
      
      <div className="mt-6 flex flex-wrap justify-around">
        <label className="block mb-5 text-xl font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
        <input className="block file:bg-sky-100 file:mr-5 file:py-2 file:px-6 file:rounded-lg file:border-0 w-full text-lg border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file"></input>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={handleClick} type="button" className="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-sky-500 rounded-md shadow hover:bg-blue-500">
          {uploading &&
            <svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
          }
          {buttonText}
        </button>
      </div>

    </div>
  )
}

export default Home
