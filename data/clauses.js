const getDayofMonthWithSuffix = () => {
  const dt = new Date()
  return dt.getDate()+(dt.getDate() % 10 == 1 && dt.getDate() != 11 ? 'st' : (dt.getDate() % 10 == 2 && dt.getDate() != 12 ? 'nd' : (dt.getDate() % 10 == 3 && dt.getDate() != 13 ? 'rd' : 'th'))) 
}

const getYear = () => {
  const dt = new Date()
  return dt.getFullYear()
}

const getMonth = () => {
  const dt = new Date()
  return dt.toLocaleString('default', {month: 'long'})
}

const clauseTemplates = [
  {
    "text": `This Right of First Refusal and Co-Sale Agreement (this “Agreement”), is made as of ${getMonth()} ${getDayofMonthWithSuffix()}, ${getYear()} by and among [_____], a Delaware corporation (the “Company”), the Investors (as defined below) listed on Schedule A and the Key Holders (as defined below) listed on Schedule B.`,
    "doc": "rofr",
    "template": {
      "company_name": {
        "startStr": "among",
        "endStr": ", a Delaware corporation",
        "value": null,
        "paragraph": 1,
        "run": 4
      },
      "day": {
        "startStr": "as of",
        "endStr": "by",
        "value": `${getMonth()} ${getDayofMonthWithSuffix()}, ${getYear()}`,
        "paragraph": 1,
        "run": 4
      }
    },
    "terms": ["company_name"]
  }
]

export { clauseTemplates }