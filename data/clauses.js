const clauseTemplates = [
  {
    "text": "This Right of First Refusal and Co-Sale Agreement (this “Agreement”), is made as of the [__] day of [________, 20__] by and among [_____], a Delaware corporation (the “Company”), the Investors (as defined below) listed on Schedule A and the Key Holders (as defined below) listed on Schedule B.",
    "term_config": {
      "company_name": {
        "start": "among",
        "end": ", a Delaware corporation",
        "default": "[_____]"
      }
    },
    "terms": ["company_name"]
  },
  {
    "text": "This Right of First Refusal and Co-Sale Agreement (this “Agreement”), is made as of the [__] day of [________, 20__] by and among [_____], a Delaware corporation (the “Company”), the Investors (as defined below) listed on Schedule A and the Key Holders (as defined below) listed on Schedule B.",
    "term_config": {
      "company_name": {
        "start": "among",
        "end": ", a Delaware corporation",
        "default": "[_____]"
      }
    },
    "terms": ["company_name"]
  }
]

export { clauseTemplates }