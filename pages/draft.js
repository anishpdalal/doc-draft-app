import Head from 'next/head'
import { useState, useEffect } from 'react'
import { terms } from '../data/term_sheet'

export default function Draft() {

  const [activeTerm, setActiveTerm] = useState("")
  const [data, setData] = useState({})
  useEffect(() => {
    setData(terms)
  }, []);

  const handleChange = (event) => {
    let updatedValue = data[event.target.id]
    updatedValue.value = event.target.value
    setData({
      ...data,
      [event.target.id]: updatedValue
    })
  }


  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Head>
        <title>Document Drafting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Doc Draft
        </h1>
      </main>

      <div className="mt-6 flex max-w-4xl flex-wrap justify-around sm:w-full">
        <div className="mt-6 w-6/12 rounded-xl border p-6 text-left">
          <h3 className="text-2xl pl-2 font-bold">Terms</h3>
          {Object.keys(data).map((term) =>
            <p key={term} onClick={(e) => setActiveTerm(term)} className={`mt-4 p-2 text-xl rounded-md ${activeTerm === term ? "bg-slate-50" : "hover:bg-slate-100"} ${activeTerm !== term && activeTerm !== "" ? "opacity-40" : ""}`}>
              <span className="font-bold">{data[term].display_name}</span>:
              <input
                className="shadow appearance-none border rounded-lg w-1/2 text-lg py-1 ml-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                id={term}
                type="text"
                value={data[term].value}
                onChange={handleChange}>
              </input>
              <br />
              {data[term].text && term !== activeTerm && 
                <span className="text-base">{data[term].text.split(" ", 10).join(" ")}...</span>
              }
              {data[term].text && term === activeTerm &&
                <span className="text-base">{data[term].text}</span>
              }
            </p>
          )}
        </div>

        <div className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Clauses</h3>
          <p className="mt-4 text-xl">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </div>
      </div>
    </div>
  )
}