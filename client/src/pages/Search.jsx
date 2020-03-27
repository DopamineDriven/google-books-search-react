import React, { Component } from 'react';
import API from "../utils/API.js";

class Search extends Component {
    state = {
        books: [],
        query: "",
        errorMsg: 'Input Book Title'
     }

    handleInputDelta = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    fetchBooksGoogle = () => {
        if (this.state.query) {
            API.getBooksGoogle(this.state.query)
                .then(res => {
                    this.setState({
                        books: res.data.items
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        books: [],
                        errorMsg: "No books found related to your query"
                    })
                })
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.fetchBooksGoogle();
    }

    handleSaveBook = id => {
        const book = this.state.books.find(book => book.id === id)

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            link: book.volumeInfo.previewLink,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then(() => this.getBooks())
    }

     render() {
         return (
             <div>Hello</div>
         )
     }
}

export default Search;