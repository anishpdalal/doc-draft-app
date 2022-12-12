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
    "terms": ["round", "preferred_stock_par_value"],
    "template": {
      "preferred_stock_par_value": {
        "positions": [
          {
            "startStr": "par value ",
            "endStr": " per share",
            "paragraph": 3,
            "run": 5,
            "runStartStr": "par value ",
            "runEndStr": " per share",
          },
        ],
        "value": null,
      },
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
  },
  {
    "text": "WHEREAS, the Key Holders and the Company desire to further induce the Investors to purchase the [____] Preferred Stock;",
    "doc": "rofr",
    "terms": ["round"],
    "template": {
      "round": {
        "positions": [
          {
            "startStr": "purchase the",
            "endStr": " Preferred Stock;",
            "paragraph": 4,
            "run": 1,
            "runStartStr": "purchase the",
            "runEndStr": " Preferred Stock",
          },
        ],
        "value": null,
      }
    }
  },
  {
    "text": "“Preferred Stock” means collectively, all shares of [____] Preferred Stock.",
    "doc": "rofr",
    "terms": ["round"],
    "template": {
      "round": {
        "positions": [
          {
            "startStr": "shares of",
            "endStr": " Preferred Stock.",
            "paragraph": 19,
            "run": 2,
            "runStartStr": "shares of",
            "runEndStr": " Preferred Stock.",
          },
        ],
        "value": null,
      }
    }
  },
  {
    "text": "The foregoing provisions of this Section 5 shall not apply to the sale of any shares to an underwriter pursuant to an underwriting agreement [or to the establishment of a trading plan pursuant to Rule 10b5-1, provided that such plan does not permit transfers during the restricted period], and shall only be applicable to the Key Holders if all officers, directors and holders of more than one percent (1%) of the outstanding Common Stock (after giving effect to the conversion into Common Stock of all outstanding [____] Preferred Stock) enter into similar agreements.",
    "doc": "rofr",
    "terms": ["round"],
    "template": {
      "round": {
        "positions": [
          {
            "startStr": "outstanding",
            "endStr": " Preferred Stock)",
            "paragraph": 60,
            "run": 14,
            "runStartStr": "outstanding",
            "runEndStr": " Preferred Stock)",
          },
        ],
        "value": null,
      }
    }
  },
  {
    "text": "“Common Stock” means shares of Common Stock of the Company, [__] par value per share.",
    "doc": "rofr",
    "terms": ["common_stock_par_value"],
    "template": {
      "common_stock_par_value": {
        "positions": [
          {
            "startStr": "Company,",
            "endStr": " par value per share.",
            "paragraph": 11,
            "run": 2,
            "runStartStr": "Company,",
            "runEndStr": " par value per share.",
          }
        ],
        "value": null,
      }
    }
  },
  {
    "text": "“Investors” means the persons named on Schedule A hereto, each person to whom the rights of an Investor are assigned pursuant to Section 6.9, each person who hereafter becomes a signatory to this Agreement pursuant to Section 6.11 and any one of them, as the context may require; provided, however, that any such person shall cease to be considered an Investor for purposes of this Agreement at any time such person and his, her or its Affiliates collectively hold fewer than [____________] shares of Capital Stock (as adjusted for any stock combination, stock split, stock dividend, recapitalization or other similar transaction).",
    "doc": "rofr",
    "terms": ["investor_rights_threshold"],
    "template": {
      "investor_rights_threshold": {
        "positions": [
          {
            "startStr": "fewer than",
            "endStr": " shares of Capital Stock",
            "paragraph": 17,
            "run": 12,
            "runStartStr": "fewer than",
            "runEndStr": " shares of Capital Stock",
          }
        ],
        "value": null,
      }
    }
  },
  {
    "text": "Notice.  Each Key Holder proposing to make a Proposed Key Holder Transfer must deliver a Proposed Transfer Notice to the Company and each Investor not later than [] days prior to the consummation of such Proposed Key Holder Transfer.",
    "doc": "rofr",
    "terms": ["proposed_transfer_notice_window"],
    "template": {
      "proposed_transfer_notice_window": {
        "positions": [
          {
            "startStr": "later than",
            "endStr": " days prior",
            "paragraph": 33,
            "run": 1,
            "runStartStr": "later than",
            "runEndStr": " days prior",
          }
        ],
        "value": null,
      }
    }
  },
  {
    "text": "In the event of a conflict between this Agreement and the Company’s Bylaws containing a preexisting right of first refusal, the terms of the Bylaws will control and compliance with the Bylaws shall be deemed compliance with this Section 2.1(a) and (b) in full.",
    "doc": "rofr",
    "terms": ["bylaws_contain_rofr"],
    "template": {
      "bylaws_contain_rofr": {
        "positions": [
          {
            "startStr": null,
            "endStr": null,
            "paragraph": 33,
            "run": 9,
            "runStartStr": ".",
            "runEndStr": null,
          },
          {
            "startStr": null,
            "endStr": null,
            "paragraph": 33,
            "run": 10,
            "runStartStr": null,
            "runEndStr": null,
          },
          {
            "startStr": null,
            "endStr": null,
            "paragraph": 33,
            "run": 11,
            "runStartStr": null,
            "runEndStr": null,
          },
          {
            "startStr": null,
            "endStr": null,
            "paragraph": 33,
            "run": 12,
            "runStartStr": null,
            "runEndStr": null,
          },
          {
            "startStr": null,
            "endStr": null,
            "paragraph": 33,
            "run": 13,
            "runStartStr": null,
            "runEndStr": null,
          }
        ],
        "value": null,
      }
    }
  }
]


export { clauseTemplates }