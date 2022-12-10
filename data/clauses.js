const getDayofMonthWithSuffix = () => {
  const dt = new Date()
  return dt.getDate()+(dt.getDate() % 10 == 1 && dt.getDate() != 11 ? 'st' : (dt.getDate() % 10 == 2 && dt.getDate() != 12 ? 'nd' : (dt.getDate() % 10 == 3 && dt.getDate() != 13 ? 'rd' : 'th'))) 
}

const getMonthandYear = () => {
  const dt = new Date()
  return dt.toLocaleString('default', {month: 'long'}) + ", " + dt.getFullYear()
}

const clauseTemplates = [
  {
    "text": `This Right of First Refusal and Co-Sale Agreement (this “Agreement”), is made as of the ${getDayofMonthWithSuffix()} day of ${getMonthandYear()} by and among [_____], a Delaware corporation (the “Company”), the Investors (as defined below) listed on Schedule A and the Key Holders (as defined below) listed on Schedule B.`,
    "template": {
      "company_name": {
        "startStr": "among",
        "endStr": ", a Delaware corporation",
        "value": null,
      }
    },
    "terms": ["company_name"]
  }
]

export { clauseTemplates }