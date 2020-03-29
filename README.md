# React-Google-Books-App

## Heroku Deployed
- https://react-google-books-app.herokuapp.com/

## Troubleshooting compromised site-security in production
- No errors or warnings in development running react strict mode
- Once deployed to heroku the site went from secure to not secure after querying a searh
- Google Books API returns URLs for image thumbnails and links
- Of the links returned, some were a mixture of https and http
- The presence of http hyperlinks within returned objects compromised site security
- A number of troubleshooting approachs were implemented but ultimately the URL calling the image and link items was diretly modified (see client/src/pages), forcing the API to only return https URLs
- This resolved the "not secure" issue in production 

## Polyfill for backwards compatibility
- Utilized react-app-polyfill npm to support backwards compatibility
- Supports IE9 and IE11 browsers
- Polyfill files imported in client/src/index.jsx where ReactDOM rendering occurs
- Tested the deployed website on IE before and after incorporating polyfill dependencies
    - Before polyfill: the background color loaded absent content; browser began to freeze
    - After polyfill: the entirety of the app loaded and the database populating the Saved page loaded all books stored
    - Searching, saving, and deleting all function as intended on IE9/IE11

## Future Development
- Incorporate passport and bcrypt for user serialization/deserialization and password hashing/unhashing, respectively
- Add filters to the search component; sort by date, author, etc