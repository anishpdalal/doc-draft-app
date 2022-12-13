import Head from 'next/head'
import { useState, useEffect } from 'react'
import { termSheet } from '../data/term_sheet'
import { clauseTemplates } from '../data/clauses'

export default function Draft() {

  const options = [
    {value: "", text: "-- Choose a Document --"},
    {value: "rofr", text: "NVCA Right of First Refusal"},
    {value: "voting", text: "NVCA Voting Agreement"},
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
          clause.template[term].positions.forEach((position) => {
            let startStr = position.startStr
            let startIdx = clause.text.indexOf(startStr)
            let endStr = position.endStr
            let endIdx = clause.text.indexOf(endStr)
            if (typeof termSheet[term].value !== "boolean" && termSheet[term].value !== "") {
              clause.text = clause.text.substring(0, startIdx + startStr.length + 1) + termSheet[term].value + clause.text.substring(endIdx, clause.text.length)
            }
          })
        }
      })
    })
    setClauses(clauseTemplates)
  }, []);

  const handleChange = (event) => {
    const updatedValue = terms[event.target.id]
    if (event.target.type === "checkbox") {
      updatedValue.value = event.target.checked
    } else {
      updatedValue.value = event.target.value
    }
    setTerms({
      ...terms,
      [event.target.id]: updatedValue
    })
    const updatedClauses = clauses
      .map((clause) => {
        if (clause.terms.includes(activeTerm)){
          let updatedClause = clause
          clause.template[activeTerm].positions.forEach((position) => {
            let startStr = position.startStr
            let startIdx = clause.text.indexOf(startStr)
            let endStr = position.endStr
            let endIdx = clause.text.indexOf(endStr)
            if (event.target.type !== "checkbox") {
              updatedClause.text = clause.text.substring(0, startIdx + startStr.length + 1) + event.target.value + clause.text.substring(endIdx, clause.text.length)
            }
          })
          updatedClause.template[activeTerm].value = updatedValue.value
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
    if (value === "" || value === true) {
      return <p key={index} className="mt-4 text-base">{clause.text}</p>
    } else if (value === false) {
      return <p key={index} className="mt-4 text-base line-through decoration-red-500">{clause.text}</p>
    } else {
      let snippets = []
      let begin = 0
      clause.template[activeTerm].positions.forEach((position, index) => {
        let startStr = position.startStr
        let startIdx = clause.text.indexOf(startStr)
        let endStr = position.endStr
        let endIdx = clause.text.indexOf(endStr)
        snippets.push(clause.text.substring(begin, startIdx + startStr.length + 1))
        snippets.push(<span key={`span_${index}`} className="underline decoration-sky-500 decoration-4">{value}</span>)
        if (index === clause.template[activeTerm].positions.length - 1) {
          snippets.push(clause.text.substring(endIdx, clause.text.length))
        } else {
          snippets.push(clause.text.substring(endIdx, clause.text.indexOf(clause.template[activeTerm].positions[index + 1].startStr)))
          begin = clause.text.indexOf(clause.template[activeTerm].positions[index + 1].startStr)
        }
      })
      return <p key={index} className="mt-4 text-base">{snippets}</p>
    }
  }

  const handleDownloadButton = async () => {
    let url = "https://anishpdalal--doc-draft-fastapi-app-dev.modal.run/generate"
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"clauses": clauses, "doc": doc}),
    }
    await fetch(url, requestOptions).then(res => res.json())
    url = `https://anishpdalal--doc-draft-fastapi-app-dev.modal.run/download?doc=${doc}`
    await fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.href = url
        link.download = `${doc}.docx`
        link.click()
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

      <div className="mt-6 flex max-w-sm justify-around sm:w-full">
        <select value={doc} onChange={handSelectChange} id="docs" className="w-8/12 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex justify-center">
        <button type="button" onClick={handleDownloadButton} className="inline-block px-6 py-2.5 bg-sky-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Download Documents</button>
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap justify-around sm:w-full">
        <div className="mt-6 w-6/12 rounded-xl border p-6 text-left">
          <h3 className="text-2xl pl-2 font-bold">Terms</h3>
          {Object.keys(terms).filter((term) => includeTerm(term, doc)).map((term) =>
            <p
              key={term}
              onClick={(e) => setActiveTerm(term)}
              className={`mt-4 p-2 text-md rounded-md ${activeTerm === term ? "bg-slate-50" : "hover:bg-slate-100"} ${activeTerm !== term && activeTerm !== "" ? "opacity-40" : ""}`}
            >
              <span className="font-bold">{terms[term].display_name}</span>:
              {typeof terms[term].value === "string" &&
                <input
                  className="shadow appearance-none border rounded-lg w-1/2 text-lg py-1 ml-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                  id={term}
                  type="text"
                  value={terms[term].value}
                  onChange={handleChange}>
                </input>
              }
              {typeof terms[term].value === "boolean" &&
                <input
                  className="ml-2 h-4 w-4 rounded-full"
                  id={term}
                  type="checkbox"
                  checked={terms[term].value}
                  onChange={handleChange}>
                </input>
              }
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

        <div className="mt-6 w-96 max-w-md rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Clauses</h3>
          {clauses.filter((clause) => clause.terms.includes(activeTerm) && clause.doc === doc).map((clause, index) =>
            getClauseText(clause, index, activeTerm)
          )}
        </div>
      </div>
    </div>
  )
}