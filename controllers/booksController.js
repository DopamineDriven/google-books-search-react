const db = require('../models');
const axios = require('axios');

// Defining methods for BooksController
module.exports = {
    findAll: (request, response) => {
        db.Book
            .find(request.query)
            .sort({ date: -1 })
            .then(dbModel => response.json(dbModel))
            .catch(error => response.status(422).json(error))
    },
    create: (request, response) => {
        db.Book
            .create(request.body)
            .then(dbModel => response.json(dbModel))
            .catch(error => response.status(422).json(error))
    },
    remove: (request, response) => {
        db.Book
            .findById({ _id: request.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => response.json(dbModel))
            .catch(error => response.status(422).json(error))
    },
    getGoogleBooks: (request, response) => {
        require('dotenv').config();
        const book = request.params.input
        const secret = process.env.API_KEY
        const url = `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${secret}`
        axios.get(url)
            .then((respond) => {
                response.json(respond.data)
            }).catch(error => response.status(422).json(error))
    }    
};