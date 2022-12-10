import Head from 'next/head'
import { useState, useEffect } from 'react'
import { termSheet } from '../data/term_sheet'
import { clauseTemplates } from '../data/clauses'

export default function Draft() {

  const options = [
    {value: "", text: "-- Choose a Document --"},
    {value: "rofr", text: "NVCA Right of First Refusal"},
  ]

  const [doc, setDocument] = useState(options[0].value)
  const [activeTerm, setActiveTerm] = useState("")
  const [terms, setTerms] = useState({})
  const [clauses, setClauses] = useState([])
  useEffect(() => {
    setTerms(termSheet)
    Object.keys(termSheet).forEach((term) => {
      clauseTemplates.forEach((clause) => {
        if (clause.terms.includes(term)){
          clause.template[term].value = termSheet[term].value
        }
      })
    })
    setClauses(clauseTemplates)
  }, []);

  const handleChange = (event) => {
    const updatedValue = terms[event.target.id]
    updatedValue.value = event.target.value
    setTerms({
      ...terms,
      [event.target.id]: updatedValue
    })
    const updatedClauses = clauses
      .map((clause) => {
        if (clause.terms.includes(activeTerm)){
          let updatedClause = clause
          const startStr = clause.template[activeTerm].startStr
          const startIdx = clause.text.indexOf(startStr)
          const endStr = clause.template[activeTerm].endStr
          const endIdx = clause.text.indexOf(endStr)
          updatedClause.template[activeTerm].value = event.target.value
          updatedClause.text = clause.text.substring(0, startIdx + startStr.length + 1) + event.target.value + clause.text.substring(endIdx, clause.text.length)
          return updatedClause
        } else {
          return clause
        }
      })
    setClauses(updatedClauses)
  }

  const handSelectChange = event => {
    setDocument(event.target.value)
    setActiveTerm("")
  };

  const includeTerm = (term, doc) => {
    const docs = terms[term].docs || []
    return docs.includes(doc) && terms[term].display_name
  }

  const getClauseText = (clause, index, activeTerm) => {
    const value = clause.template[activeTerm].value
    if (value === "") {
      return <p key={index} className="mt-4 text-base">{clause.text}</p>
    } else {
      const startStr = clause.template[activeTerm].startStr
      const startIdx = clause.text.indexOf(startStr)
      const endStr = clause.template[activeTerm].endStr
      const endIdx = clause.text.indexOf(endStr)
      return <p key={index} className="mt-4 text-base">{clause.text.substring(0, startIdx + startStr.length + 1)}<span className="underline decoration-sky-500 decoration-4">{value}</span>{clause.text.substring(endIdx, clause.text.length)}</p>
    }
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

      <div className="mt-6 flex max-w-sm justify-around sm:w-full">
        <select value={doc} onChange={handSelectChange} id="docs" className="w-8/12 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap justify-around sm:w-full">
        <div className="mt-6 w-6/12 rounded-xl border p-6 text-left">
          <h3 className="text-2xl pl-2 font-bold">Terms</h3>
          {Object.keys(terms).filter((term) => includeTerm(term, doc)).map((term) =>
            <p
              key={term}
              onClick={(e) => setActiveTerm(term)}
              className={`mt-4 p-2 text-xl rounded-md ${activeTerm === term ? "bg-slate-50" : "hover:bg-slate-100"} ${activeTerm !== term && activeTerm !== "" ? "opacity-40" : ""}`}
            >
              <span className="font-bold">{terms[term].display_name}</span>:
              <input
                className="shadow appearance-none border rounded-lg w-1/2 text-lg py-1 ml-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                id={term}
                type="text"
                value={terms[term].value}
                onChange={handleChange}>
              </input>
              <br />
              {terms[term].text && term !== activeTerm && 
                <span className="text-base">{terms[term].text.split(" ", 10).join(" ")}...</span>
              }
              {terms[term].text && term === activeTerm &&
                <span className="text-base">{terms[term].text}</span>
              }
            </p>
          )}
        </div>

        <div className="mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Clauses</h3>
          {clauses.filter((clause) => clause.terms.includes(activeTerm)).map((clause, index) =>
            getClauseText(clause, index, activeTerm)
          )}
        </div>
      </div>
    </div>
  )
}