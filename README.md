# google-books-search-react

- Heroku Deployed
    - https://react-google-books-app.herokuapp.com/


## polyfill for backwards compatibility
- Utilized react-app-polyfill npm to support backwards compatibility
- Supports IE9 and IE11 browsers
- Polyfill files imported in client/src/index.jsx where ReactDOM rendering occurs

- Heroku Deployed
    - https://react-google-books-app.herokuapp.com/

    "http://books.google.com/books/content?id=4qsYinaVXQ8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

    "https://books.google.com/books/content?id=SFvipW4rJnYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"

- attempted to manipulate

google-books-search-react\client\node_modules\react-scripts\config\webpackDevServer.config.js

- commented out line 18
const getHttpsConfig = require('./getHttpsConfig')

- added the following on line 20
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

- modified line 102 from
https: getHttpsConfig(),

- to
https: protocol === 'https',

- This should, in turn, force the app to use HTTPS even with fetching api-mediated data (namely links and images as those are URL data types and have been a recurring issue having http and https mixed in depending on query)
