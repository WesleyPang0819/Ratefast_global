export interface Currency {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  {
    "code": "AED",
    "name": "UAE Dirham",
    "country": "United Arab Emirates",
    "flag": "🇦🇪",
    "symbol": "د.إ"
  },
  {
    "code": "AFN",
    "name": "Afghan Afghani",
    "country": "Afghanistan",
    "flag": "🇦🇫",
    "symbol": "؋"
  },
  {
    "code": "ALL",
    "name": "Albanian Lek",
    "country": "Albania",
    "flag": "🇦🇱",
    "symbol": "L"
  },
  {
    "code": "AMD",
    "name": "Armenian Dram",
    "country": "Armenia",
    "flag": "🇦🇲",
    "symbol": "֏"
  },
  {
    "code": "ANG",
    "name": "Netherlands Antillean Guilder",
    "country": "Curaçao & Sint Maarten",
    "flag": "🇨🇼",
    "symbol": "ƒ"
  },
  {
    "code": "AOA",
    "name": "Angolan Kwanza",
    "country": "Angola",
    "flag": "🇦🇴",
    "symbol": "Kz"
  },
  {
    "code": "ARS",
    "name": "Argentine Peso",
    "country": "Argentina",
    "flag": "🇦🇷",
    "symbol": "$"
  },
  {
    "code": "AUD",
    "name": "Australian Dollar",
    "country": "Australia",
    "flag": "🇦🇺",
    "symbol": "A$"
  },
  {
    "code": "AWG",
    "name": "Aruban Florin",
    "country": "Aruba",
    "flag": "🇦🇼",
    "symbol": "Afl"
  },
  {
    "code": "AZN",
    "name": "Azerbaijani Manat",
    "country": "Azerbaijan",
    "flag": "🇦🇿",
    "symbol": "₼"
  },
  {
    "code": "BAM",
    "name": "Bosnia-Herzegovina Mark",
    "country": "Bosnia and Herzegovina",
    "flag": "🇧🇦",
    "symbol": "KM"
  },
  {
    "code": "BBD",
    "name": "Barbadian Dollar",
    "country": "Barbados",
    "flag": "🇧🇧",
    "symbol": "Bds$"
  },
  {
    "code": "BDT",
    "name": "Bangladeshi Taka",
    "country": "Bangladesh",
    "flag": "🇧🇩",
    "symbol": "৳"
  },
  {
    "code": "BGN",
    "name": "Bulgarian Lev",
    "country": "Bulgaria",
    "flag": "🇧🇬",
    "symbol": "лв"
  },
  {
    "code": "BHD",
    "name": "Bahraini Dinar",
    "country": "Bahrain",
    "flag": "🇧🇭",
    "symbol": ".د.ب"
  },
  {
    "code": "BIF",
    "name": "Burundian Franc",
    "country": "Burundi",
    "flag": "🇧🇮",
    "symbol": "FBu"
  },
  {
    "code": "BMD",
    "name": "Bermudian Dollar",
    "country": "Bermuda",
    "flag": "🇧🇲",
    "symbol": "BD$"
  },
  {
    "code": "BND",
    "name": "Brunei Dollar",
    "country": "Brunei",
    "flag": "🇧🇳",
    "symbol": "B$"
  },
  {
    "code": "BOB",
    "name": "Bolivian Boliviano",
    "country": "Bolivia",
    "flag": "🇧🇴",
    "symbol": "Bs."
  },
  {
    "code": "BRL",
    "name": "Brazilian Real",
    "country": "Brazil",
    "flag": "🇧🇷",
    "symbol": "R$"
  },
  {
    "code": "BSD",
    "name": "Bahamian Dollar",
    "country": "Bahamas",
    "flag": "🇧🇸",
    "symbol": "B$"
  },
  {
    "code": "BTN",
    "name": "Bhutanese Ngultrum",
    "country": "Bhutan",
    "flag": "🇧🇹",
    "symbol": "Nu."
  },
  {
    "code": "BWP",
    "name": "Botswana Pula",
    "country": "Botswana",
    "flag": "🇧🇼",
    "symbol": "P"
  },
  {
    "code": "BYN",
    "name": "Belarusian Ruble",
    "country": "Belarus",
    "flag": "🇧🇾",
    "symbol": "Br"
  },
  {
    "code": "BZD",
    "name": "Belize Dollar",
    "country": "Belize",
    "flag": "🇧🇿",
    "symbol": "BZ$"
  },
  {
    "code": "CAD",
    "name": "Canadian Dollar",
    "country": "Canada",
    "flag": "🇨🇦",
    "symbol": "C$"
  },
  {
    "code": "CDF",
    "name": "Congolese Franc",
    "country": "DR Congo",
    "flag": "🇨🇩",
    "symbol": "FC"
  },
  {
    "code": "CHF",
    "name": "Swiss Franc",
    "country": "Switzerland",
    "flag": "🇨🇭",
    "symbol": "CHF"
  },
  {
    "code": "CLF",
    "name": "CLF Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "CLF"
  },
  {
    "code": "CLP",
    "name": "Chilean Peso",
    "country": "Chile",
    "flag": "🇨🇱",
    "symbol": "$"
  },
  {
    "code": "CNH",
    "name": "CNH Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "CNH"
  },
  {
    "code": "CNY",
    "name": "Chinese Yuan",
    "country": "China",
    "flag": "🇨🇳",
    "symbol": "¥"
  },
  {
    "code": "COP",
    "name": "Colombian Peso",
    "country": "Colombia",
    "flag": "🇨🇴",
    "symbol": "$"
  },
  {
    "code": "CRC",
    "name": "Costa Rican Colon",
    "country": "Costa Rica",
    "flag": "🇨🇷",
    "symbol": "₡"
  },
  {
    "code": "CUP",
    "name": "Cuban Peso",
    "country": "Cuba",
    "flag": "🇨🇺",
    "symbol": "$"
  },
  {
    "code": "CVE",
    "name": "Cape Verdean Escudo",
    "country": "Cape Verde",
    "flag": "🇨🇻",
    "symbol": "Esc"
  },
  {
    "code": "CZK",
    "name": "Czech Koruna",
    "country": "Czechia",
    "flag": "🇨🇿",
    "symbol": "Kč"
  },
  {
    "code": "DJF",
    "name": "Djiboutian Franc",
    "country": "Djibouti",
    "flag": "🇩🇯",
    "symbol": "Fdj"
  },
  {
    "code": "DKK",
    "name": "Danish Krone",
    "country": "Denmark",
    "flag": "🇩🇰",
    "symbol": "kr"
  },
  {
    "code": "DOP",
    "name": "Dominican Peso",
    "country": "Dominican Republic",
    "flag": "🇩🇴",
    "symbol": "RD$"
  },
  {
    "code": "DZD",
    "name": "Algerian Dinar",
    "country": "Algeria",
    "flag": "🇩🇿",
    "symbol": "د.ج"
  },
  {
    "code": "EGP",
    "name": "Egyptian Pound",
    "country": "Egypt",
    "flag": "🇪🇬",
    "symbol": "E£"
  },
  {
    "code": "ERN",
    "name": "Eritrean Nakfa",
    "country": "Eritrea",
    "flag": "🇪🇷",
    "symbol": "Nfk"
  },
  {
    "code": "ETB",
    "name": "Ethiopian Birr",
    "country": "Ethiopia",
    "flag": "🇪🇹",
    "symbol": "Br"
  },
  {
    "code": "EUR",
    "name": "Euro",
    "country": "Eurozone",
    "flag": "🇪🇺",
    "symbol": "€"
  },
  {
    "code": "FJD",
    "name": "Fijian Dollar",
    "country": "Fiji",
    "flag": "🇫🇯",
    "symbol": "FJ$"
  },
  {
    "code": "FKP",
    "name": "Falkland Islands Pound",
    "country": "Falkland Islands",
    "flag": "🇫🇰",
    "symbol": "£"
  },
  {
    "code": "FOK",
    "name": "FOK Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "FOK"
  },
  {
    "code": "GBP",
    "name": "British Pound",
    "country": "United Kingdom",
    "flag": "🇬🇧",
    "symbol": "£"
  },
  {
    "code": "GEL",
    "name": "Georgian Lari",
    "country": "Georgia",
    "flag": "🇬🇪",
    "symbol": "₾"
  },
  {
    "code": "GGP",
    "name": "Guernsey Pound",
    "country": "Guernsey",
    "flag": "🇬🇬",
    "symbol": "£"
  },
  {
    "code": "GHS",
    "name": "Ghanaian Cedi",
    "country": "Ghana",
    "flag": "🇬🇭",
    "symbol": "₵"
  },
  {
    "code": "GIP",
    "name": "Gibraltar Pound",
    "country": "Gibraltar",
    "flag": "🇬🇮",
    "symbol": "£"
  },
  {
    "code": "GMD",
    "name": "Gambian Dalasi",
    "country": "Gambia",
    "flag": "🇬🇲",
    "symbol": "D"
  },
  {
    "code": "GNF",
    "name": "Guinean Franc",
    "country": "Guinea",
    "flag": "🇬🇳",
    "symbol": "FG"
  },
  {
    "code": "GTQ",
    "name": "Guetemalan Quetzal",
    "country": "Guatemala",
    "flag": "🇬🇹",
    "symbol": "Q"
  },
  {
    "code": "GYD",
    "name": "Guyanese Dollar",
    "country": "Guyana",
    "flag": "🇬🇾",
    "symbol": "G$"
  },
  {
    "code": "HKD",
    "name": "Hong Kong Dollar",
    "country": "Hong Kong",
    "flag": "🇭🇰",
    "symbol": "HK$"
  },
  {
    "code": "HNL",
    "name": "Honduran Lempira",
    "country": "Honduras",
    "flag": "🇭🇳",
    "symbol": "L"
  },
  {
    "code": "HRK",
    "name": "Croatian Kuna",
    "country": "Croatia",
    "flag": "🇭🇷",
    "symbol": "kn"
  },
  {
    "code": "HTG",
    "name": "Haitian Gourde",
    "country": "Haiti",
    "flag": "🇭🇹",
    "symbol": "G"
  },
  {
    "code": "HUF",
    "name": "Hungarian Forint",
    "country": "Hungary",
    "flag": "🇭🇺",
    "symbol": "Ft"
  },
  {
    "code": "IDR",
    "name": "Indonesian Rupiah",
    "country": "Indonesia",
    "flag": "🇮🇩",
    "symbol": "Rp"
  },
  {
    "code": "ILS",
    "name": "Israeli New Shekel",
    "country": "Israel",
    "flag": "🇮🇱",
    "symbol": "₪"
  },
  {
    "code": "IMP",
    "name": "Manx Pound",
    "country": "Isle of Man",
    "flag": "🇮🇲",
    "symbol": "£"
  },
  {
    "code": "INR",
    "name": "Indian Rupee",
    "country": "India",
    "flag": "🇮🇳",
    "symbol": "₹"
  },
  {
    "code": "IQD",
    "name": "Iraqi Dinar",
    "country": "Iraq",
    "flag": "🇮🇶",
    "symbol": "ع.د"
  },
  {
    "code": "IRR",
    "name": "Iranian Rial",
    "country": "Iran",
    "flag": "🇮🇷",
    "symbol": "﷼"
  },
  {
    "code": "ISK",
    "name": "Icelandic Krona",
    "country": "Iceland",
    "flag": "🇮🇸",
    "symbol": "kr"
  },
  {
    "code": "JEP",
    "name": "Jersey Pound",
    "country": "Jersey",
    "flag": "🇯🇪",
    "symbol": "£"
  },
  {
    "code": "JMD",
    "name": "Jamaican Dollar",
    "country": "Jamaica",
    "flag": "🇯🇲",
    "symbol": "J$"
  },
  {
    "code": "JOD",
    "name": "Jordanian Dinar",
    "country": "Jordan",
    "flag": "🇯🇴",
    "symbol": "د.ا"
  },
  {
    "code": "JPY",
    "name": "Japanese Yen",
    "country": "Japan",
    "flag": "🇯🇵",
    "symbol": "¥"
  },
  {
    "code": "KES",
    "name": "Kenyan Shilling",
    "country": "Kenya",
    "flag": "🇰🇪",
    "symbol": "KSh"
  },
  {
    "code": "KGS",
    "name": "Kyrgyzstani Som",
    "country": "Kyrgyzstan",
    "flag": "🇰🇬",
    "symbol": "сом"
  },
  {
    "code": "KHR",
    "name": "Cambodian Riel",
    "country": "Cambodia",
    "flag": "🇰🇭",
    "symbol": "៛"
  },
  {
    "code": "KID",
    "name": "KID Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "KID"
  },
  {
    "code": "KMF",
    "name": "Comorian Franc",
    "country": "Comoros",
    "flag": "🇰🇲",
    "symbol": "CF"
  },
  {
    "code": "KRW",
    "name": "South Korean Won",
    "country": "South Korea",
    "flag": "🇰🇷",
    "symbol": "₩"
  },
  {
    "code": "KWD",
    "name": "Kuwaiti Dinar",
    "country": "Kuwait",
    "flag": "🇰🇼",
    "symbol": "د.ك"
  },
  {
    "code": "KYD",
    "name": "Cayman Islands Dollar",
    "country": "Cayman Islands",
    "flag": "🇰🇾",
    "symbol": "CI$"
  },
  {
    "code": "KZT",
    "name": "Kazakhstani Tenge",
    "country": "Kazakhstan",
    "flag": "🇰🇿",
    "symbol": "₸"
  },
  {
    "code": "LAK",
    "name": "Lao Kip",
    "country": "Laos",
    "flag": "🇱🇦",
    "symbol": "₭"
  },
  {
    "code": "LBP",
    "name": "Lebanese Pound",
    "country": "Lebanon",
    "flag": "🇱🇧",
    "symbol": "ل.ل"
  },
  {
    "code": "LKR",
    "name": "Sri Lankan Rupee",
    "country": "Sri Lanka",
    "flag": "🇱🇰",
    "symbol": "₨"
  },
  {
    "code": "LRD",
    "name": "Liberian Dollar",
    "country": "Liberia",
    "flag": "🇱🇷",
    "symbol": "L$"
  },
  {
    "code": "LSL",
    "name": "Lesotho Loti",
    "country": "Lesotho",
    "flag": "🇱🇸",
    "symbol": "L"
  },
  {
    "code": "LYD",
    "name": "Libyan Dinar",
    "country": "Libya",
    "flag": "🇱🇾",
    "symbol": "ل.د"
  },
  {
    "code": "MAD",
    "name": "Moroccan Dirham",
    "country": "Morocco",
    "flag": "🇲🇦",
    "symbol": "د.م."
  },
  {
    "code": "MDL",
    "name": "Moldovan Leu",
    "country": "Moldova",
    "flag": "🇲🇩",
    "symbol": "L"
  },
  {
    "code": "MGA",
    "name": "Malagasy Ariary",
    "country": "Madagascar",
    "flag": "🇲🇬",
    "symbol": "Ar"
  },
  {
    "code": "MKD",
    "name": "Macedonian Denar",
    "country": "North Macedonia",
    "flag": "🇲🇰",
    "symbol": "ден"
  },
  {
    "code": "MMK",
    "name": "Myanmar Kyat",
    "country": "Myanmar",
    "flag": "🇲🇲",
    "symbol": "K"
  },
  {
    "code": "MNT",
    "name": "Mongolian Tughrik",
    "country": "Mongolia",
    "flag": "🇲🇳",
    "symbol": "₮"
  },
  {
    "code": "MOP",
    "name": "Macanese Pataca",
    "country": "Macau",
    "flag": "🇲🇴",
    "symbol": "MOP$"
  },
  {
    "code": "MRU",
    "name": "Mauritanian Ouguiya",
    "country": "Mauritania",
    "flag": "🇲🇷",
    "symbol": "UM"
  },
  {
    "code": "MUR",
    "name": "Mauritian Rupee",
    "country": "Mauritius",
    "flag": "🇲🇺",
    "symbol": "₨"
  },
  {
    "code": "MVR",
    "name": "Maldivian Rufiyaa",
    "country": "Maldives",
    "flag": "🇲🇻",
    "symbol": "Rf"
  },
  {
    "code": "MWK",
    "name": "Malawian Kwacha",
    "country": "Malawi",
    "flag": "🇲🇼",
    "symbol": "MK"
  },
  {
    "code": "MXN",
    "name": "Mexican Peso",
    "country": "Mexico",
    "flag": "🇲🇽",
    "symbol": "Mex$"
  },
  {
    "code": "MYR",
    "name": "Malaysian Ringgit",
    "country": "Malaysia",
    "flag": "🇲🇾",
    "symbol": "RM"
  },
  {
    "code": "MZN",
    "name": "Mozambican Metical",
    "country": "Mozambique",
    "flag": "🇲🇿",
    "symbol": "MT"
  },
  {
    "code": "NAD",
    "name": "Namibian Dollar",
    "country": "Namibia",
    "flag": "🇳🇦",
    "symbol": "N$"
  },
  {
    "code": "NGN",
    "name": "Nigerian Naira",
    "country": "Nigeria",
    "flag": "🇳🇬",
    "symbol": "₦"
  },
  {
    "code": "NIO",
    "name": "Nicaraguan Córdoba",
    "country": "Nicaragua",
    "flag": "🇳🇮",
    "symbol": "C$"
  },
  {
    "code": "NOK",
    "name": "Norwegian Krone",
    "country": "Norway",
    "flag": "🇳🇴",
    "symbol": "kr"
  },
  {
    "code": "NPR",
    "name": "Nepalese Rupee",
    "country": "Nepal",
    "flag": "🇳🇵",
    "symbol": "₨"
  },
  {
    "code": "NZD",
    "name": "New Zealand Dollar",
    "country": "New Zealand",
    "flag": "🇳🇿",
    "symbol": "NZ$"
  },
  {
    "code": "OMR",
    "name": "Omani Rial",
    "country": "Oman",
    "flag": "🇴🇲",
    "symbol": "ر.ع."
  },
  {
    "code": "PAB",
    "name": "Panamanian Balboa",
    "country": "Panama",
    "flag": "🇵🇦",
    "symbol": "B/."
  },
  {
    "code": "PEN",
    "name": "Peruvian Sol",
    "country": "Peru",
    "flag": "🇵🇪",
    "symbol": "S/."
  },
  {
    "code": "PGK",
    "name": "Papua New Guinean Kina",
    "country": "Papua New Guinea",
    "flag": "🇵🇬",
    "symbol": "K"
  },
  {
    "code": "PHP",
    "name": "Philippine Peso",
    "country": "Philippines",
    "flag": "🇵🇭",
    "symbol": "₱"
  },
  {
    "code": "PKR",
    "name": "Pakistani Rupee",
    "country": "Pakistan",
    "flag": "🇵🇰",
    "symbol": "₨"
  },
  {
    "code": "PLN",
    "name": "Polish Zloty",
    "country": "Poland",
    "flag": "🇵🇱",
    "symbol": "zł"
  },
  {
    "code": "PYG",
    "name": "Paraguayan Guaraní",
    "country": "Paraguay",
    "flag": "🇵🇾",
    "symbol": "₲"
  },
  {
    "code": "QAR",
    "name": "Qatari Riyal",
    "country": "Qatar",
    "flag": "🇶🇦",
    "symbol": "ر.ق"
  },
  {
    "code": "RON",
    "name": "Romanian Leu",
    "country": "Romania",
    "flag": "🇷🇴",
    "symbol": "lei"
  },
  {
    "code": "RSD",
    "name": "Serbian Dinar",
    "country": "Serbia",
    "flag": "🇷🇸",
    "symbol": "din."
  },
  {
    "code": "RUB",
    "name": "Russian Ruble",
    "country": "Russia",
    "flag": "🇷🇺",
    "symbol": "₽"
  },
  {
    "code": "RWF",
    "name": "Rwandan Franc",
    "country": "Rwanda",
    "flag": "🇷🇺",
    "symbol": "FRw"
  },
  {
    "code": "SAR",
    "name": "Saudi Riyal",
    "country": "Saudi Arabia",
    "flag": "🇸🇦",
    "symbol": "ر.س"
  },
  {
    "code": "SBD",
    "name": "Solomon Islands Dollar",
    "country": "Solomon Islands",
    "flag": "🇸🇧",
    "symbol": "SI$"
  },
  {
    "code": "SCR",
    "name": "Seychellois Rupee",
    "country": "Seychelles",
    "flag": "🇸🇨",
    "symbol": "₨"
  },
  {
    "code": "SDG",
    "name": "Sudanese Pound",
    "country": "Sudan",
    "flag": "🇸🇩",
    "symbol": "ج.苏"
  },
  {
    "code": "SEK",
    "name": "Swedish Krona",
    "country": "Sweden",
    "flag": "🇸🇪",
    "symbol": "kr"
  },
  {
    "code": "SGD",
    "name": "Singapore Dollar",
    "country": "Singapore",
    "flag": "🇸🇬",
    "symbol": "S$"
  },
  {
    "code": "SHP",
    "name": "Saint Helena Pound",
    "country": "Saint Helena",
    "flag": "🇸🇭",
    "symbol": "£"
  },
  {
    "code": "SLE",
    "name": "Sierra Leonean Leone",
    "country": "Sierra Leone",
    "flag": "🇸🇱",
    "symbol": "Le"
  },
  {
    "code": "SLL",
    "name": "Sierra Leonean Leone (Old)",
    "country": "Sierra Leone",
    "flag": "🇸🇱",
    "symbol": "Le"
  },
  {
    "code": "SOS",
    "name": "Somali Shilling",
    "country": "Somalia",
    "flag": "🇸🇴",
    "symbol": "Sh"
  },
  {
    "code": "SRD",
    "name": "Surinamese Dollar",
    "country": "Suriname",
    "flag": "🇸🇷",
    "symbol": "$"
  },
  {
    "code": "SSP",
    "name": "South Sudanese Pound",
    "country": "South Sudan",
    "flag": "🇸🇸",
    "symbol": "£"
  },
  {
    "code": "STN",
    "name": "São Tomé and Príncipe Dobra",
    "country": "São Tomé and Príncipe",
    "flag": "🇸🇹",
    "symbol": "Db"
  },
  {
    "code": "SYP",
    "name": "Syrian Pound",
    "country": "Syria",
    "flag": "🇸🇾",
    "symbol": "£S"
  },
  {
    "code": "SZL",
    "name": "Eswatini Lilangeni",
    "country": "Eswatini",
    "flag": "🇸🇿",
    "symbol": "L"
  },
  {
    "code": "THB",
    "name": "Thai Baht",
    "country": "Thailand",
    "flag": "🇹🇭",
    "symbol": "฿"
  },
  {
    "code": "TJS",
    "name": "Tajikistani Somoni",
    "country": "Tajikistan",
    "flag": "🇹🇯",
    "symbol": "SM"
  },
  {
    "code": "TMT",
    "name": "Turkmenistani Manat",
    "country": "Turkmenistan",
    "flag": "🇹🇲",
    "symbol": "T"
  },
  {
    "code": "TND",
    "name": "Tunisian Dinar",
    "country": "Tunisia",
    "flag": "🇹🇳",
    "symbol": "د.ت"
  },
  {
    "code": "TOP",
    "name": "Tongan Paʻanga",
    "country": "Tonga",
    "flag": "🇹🇴",
    "symbol": "T$"
  },
  {
    "code": "TRY",
    "name": "Turkish Lira",
    "country": "Turkey",
    "flag": "🇹🇷",
    "symbol": "₺"
  },
  {
    "code": "TTD",
    "name": "TTD Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "TTD"
  },
  {
    "code": "TVD",
    "name": "TVD Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "TVD"
  },
  {
    "code": "TWD",
    "name": "New Taiwan Dollar",
    "country": "Taiwan",
    "flag": "🇹🇼",
    "symbol": "NT$"
  },
  {
    "code": "TZS",
    "name": "Tanzanian Shilling",
    "country": "Tanzania",
    "flag": "🇹🇿",
    "symbol": "TSh"
  },
  {
    "code": "UAH",
    "name": "Ukrainian Hryvnia",
    "country": "Ukraine",
    "flag": "🇺🇦",
    "symbol": "₴"
  },
  {
    "code": "UGX",
    "name": "Ugandan Shilling",
    "country": "Uganda",
    "flag": "🇺🇬",
    "symbol": "USh"
  },
  {
    "code": "USD",
    "name": "United States Dollar",
    "country": "United States",
    "flag": "🇺🇸",
    "symbol": "$"
  },
  {
    "code": "UYU",
    "name": "Uruguayan Peso",
    "country": "Uruguay",
    "flag": "🇺🇾",
    "symbol": "$U"
  },
  {
    "code": "UZS",
    "name": "Uzbekistani Som",
    "country": "Uzbekistan",
    "flag": "🇺🇿",
    "symbol": "soʻm"
  },
  {
    "code": "VES",
    "name": "Venezuelan Bolívar Soberano",
    "country": "Venezuela",
    "flag": "🇻🇪",
    "symbol": "Bs.S"
  },
  {
    "code": "VND",
    "name": "Vietnamese Dong",
    "country": "Vietnam",
    "flag": "🇻🇳",
    "symbol": "₫"
  },
  {
    "code": "VUV",
    "name": "Vanuatu Vatu",
    "country": "Vanuatu",
    "flag": "🇻🇺",
    "symbol": "VT"
  },
  {
    "code": "WST",
    "name": "Samoan Tālā",
    "country": "Samoa",
    "flag": "🇼🇸",
    "symbol": "WS$"
  },
  {
    "code": "XAF",
    "name": "Central African CFA Franc",
    "country": "CEMAC",
    "flag": "🇨🇫",
    "symbol": "FCFA"
  },
  {
    "code": "XCD",
    "name": "East Caribbean Dollar",
    "country": "East Caribbean",
    "flag": "🇩🇲",
    "symbol": "EC$"
  },
  {
    "code": "XCG",
    "name": "XCG Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "XCG"
  },
  {
    "code": "XDR",
    "name": "Special Drawing Rights",
    "country": "International Monetary Fund",
    "flag": "🏳️",
    "symbol": "XDR"
  },
  {
    "code": "XOF",
    "name": "West African CFA Franc",
    "country": "UEMOA",
    "flag": "🇸🇳",
    "symbol": "CFA"
  },
  {
    "code": "XPF",
    "name": "CFP Franc",
    "country": "Collectivités d'Outre-Mer",
    "flag": "🇵🇫",
    "symbol": "₣"
  },
  {
    "code": "YER",
    "name": "Yemeni Rial",
    "country": "Yemen",
    "flag": "🇾🇪",
    "symbol": "﷼"
  },
  {
    "code": "ZAR",
    "name": "South African Rand",
    "country": "South Africa",
    "flag": "🇿🇦",
    "symbol": "R"
  },
  {
    "code": "ZMW",
    "name": "Zambian Kwacha",
    "country": "Zambia",
    "flag": "🇿🇲",
    "symbol": "ZK"
  },
  {
    "code": "ZWG",
    "name": "ZWG Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "ZWG"
  },
  {
    "code": "ZWL",
    "name": "ZWL Currency",
    "country": "Global",
    "flag": "🏳️",
    "symbol": "ZWL"
  }
];

export const POPULAR_CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'SGD', 'MYR', 'THB', 'VND', 'TWD'];
