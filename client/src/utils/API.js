import axios from 'axios';

export default {
    // Gets books from Google
    getBooksGoogle: (input) => {
        const options = {
            headers: {'X-HTTP-Method-Override': 'PATCH'}
          };
        console.log(`input: ${input}`)
        return axios.get("/api/books/google/" + input, options);
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
        const options = {
            headers: {'X-HTTP-Method-Override': 'PATCH'}
          };
        console.log(`${JSON.stringify(objectBooks)} is saved to saveBook`)
        return axios.post("/api/books", objectBooks, options)
    }
};

// saveBook: function(bookInfo) {
//     return axios.post(`/${bookInfo.id}`);
// }