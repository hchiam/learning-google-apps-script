# custom weather summary email

Example Google Sheet formulas:

- `=IMPORTFEED("https://weather.gc.ca/rss/battleboard/ab12_e.xml","items title","",2)`

- `=IMPORTFEED("https://weather.gc.ca/rss/battleboard/ab12_e.xml","items summary","",2)`

- `=IMPORTXML("https://weather.gc.ca/rss/battleboard/ab12_e.xml","*/*/*[@type='html']")`

- `=IMPORTXML("https://weather.gc.ca/rss/battleboard/ab12_e.xml","*/*/*")`
