import axios from 'axios';

export default {
    // Gets books from Google
    getBooksGoogle: (input) => {
        console.log(`input: ${input}`)
        return axios.get("/api/books/google/" + input);
    },
    // Get all books
    getBooks: (bookData) => {
        return axios.get("/api/books", bookData)
    },
    // Deletes the book with the given id
    deleteBook: (id) => {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function (objectBooks) {
        console.log(`${JSON.stringify(objectBooks)} is saved to saveBook`)
        return axios.post("/api/books", objectBooks)
    }
};

// saveBook: function(bookInfo) {
//     return axios.post(`/${bookInfo.id}`);
// }