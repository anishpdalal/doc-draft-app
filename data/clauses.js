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
    "terms": ["company_name"],
    "template": {
      "company_name": {
        "positions": [
          {
            "startStr": "among",
            "endStr": ", a Delaware corporation",
            "paragraph": 1,
            "run": 3,
            "runStartStr": "among",
            "runEndStr": ", a Delaware corporation",
          }
        ],
        "value": null,
      },
      "day": {
        "positions": [
          {
            "startStr": "as of",
            "endStr": " by",
            "paragraph": 1,
            "run": 3,
            "runStartStr": "as of",
            "runEndStr": " by",
          }
        ],
        "value": `${getMonth()} ${getDayofMonthWithSuffix()}, ${getYear()}`,
      },
    }
  },
  {
    "text": "WHEREAS, the Company and the Investors are parties to that certain [_____] Preferred Stock Purchase Agreement, of even date herewith (the “Purchase Agreement”), pursuant to which the Investors have agreed to purchase shares of the [_____] Preferred Stock of the Company, par value $__ per share (“[_____] Preferred Stock”);",
    "doc": "rofr",
    "terms": ["round"],
    "template": {
      "round": {
        "positions": [
          {
            "startStr": "certain",
            "endStr": " Preferred Stock Purchase Agreement",
            "paragraph": 3,
            "run": 1,
            "runStartStr": "certain",
            "runEndStr": " Preferred Stock",

          },
          {
            "startStr": "shares of the",
            "endStr": " Preferred Stock of the Company",
            "paragraph": 3,
            "run": 5,
            "runStartStr": "shares of the",
            "runEndStr": " Preferred Stock",
          },
          {
            "startStr": "per share (",
            "endStr": " Preferred Stock”);",
            "paragraph": 3,
            "run": 7,
            "runStartStr": "",
            "runEndStr": " Preferred Stock",
          }
        ],
        "value": null,
      }
    }
  }
]


export { clauseTemplates }