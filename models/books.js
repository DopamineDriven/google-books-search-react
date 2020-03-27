const mongoose = require('mongoose');
const Schema = mongoose.Schema

const booksSchema = new Schema({
    id: {
        type: String || Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    authors: {
        type: Array,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String || URL
    },
    link: {
        type: String || URL
    },
    publishedDate: {
        type: Date,
        default: Date.now
    }
});
// a unique googleId must be indexed for each saved book
// else, throw error, do not store in database
booksSchema.index({
    id: 1,
}, {
    unique: true
});

const Book = mongoose.model("Book", booksSchema);

module.exports = Book



// Here is an example of searching for Daniel Keyes' "Flowers for Algernon":

// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey