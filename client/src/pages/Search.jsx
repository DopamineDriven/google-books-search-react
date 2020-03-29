import React, { Component } from "react";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import API from "../utils/API.js";
import { Col, Row, Container } from "../components/Grid/Grid.jsx";
import { List, ListItem } from "../components/List/List.jsx";
import Moment from "moment";
import { toast } from "react-toastify";
import './Pages.css'
import Jumbotron from '../components/Jumbotron/Jumbotron.jsx';

class Search extends Component {
    state = {
        books: [],
        query: "",
        errorMsg: ''
     }

     loadBooks = (data) => {
        let objectBooks = { books: [] }
        for (let i=0; i < data.length; i++) {
            if (data[i].volumeInfo.imageLinks) {
                let items = {
                    // unique id
                    id: data[i].id,
                    title: data[i].volumeInfo.title,
                    subtitle: data[i].volumeInfo.subtitle,
                    authors: data[i].volumeInfo.authors,
                    // published date
                    publishedDate: data[i].volumeInfo.publishedDate,
                    description: data[i].volumeInfo.description,
                    // display image as contained thumbnail
                    image: `https://books.google.com/books/content?id=${data[i].id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
                    // display preview link if exists
                    link: `https://books.google.com/books?id=${data[i].id}&dq=${data[i].volumeInfo.title}&hl=&source=gbs_api`
                }

                // if (data[i].volumeInfo.imageLinks.thumbnail.innerHTML === "http:") {
                //     console.log("value returned contains http")
                //     data[i].volumeInfo.imageLinks.thumbnail.innerHTML.splice('http:').prepend('https:')                    
                // } 
                // `https://books.google.com/books/content?id=${data[i].id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
                // `https://books.google.com/books?id=${data[i].id}&dq=${data[i].volumeInfo.title}&hl=&source=gbs_api`
                console.log(items)
                objectBooks.books.push(items)
            }
        }
        this.setState({ books: objectBooks.books, query: "" })
    }

    handleInputDelta = event => {
        const { name, value } = event.target;
        console.log(value)
        this.setState({
            [name]: value
        })
    }

    fetchBooksGoogle = () => {
        if (this.state.query) {
            API.getBooksGoogle(this.state.query)
            .then(res => {
                console.log(res.data.items[0].image !== 'http')
                this.loadBooks(res.data.items)
            })
                .catch(() => {
                    toast.error('Search did not match any book results')
                    this.setState({
                        books: [],
                        errorMsg: "No books found related to your query"
                    })
                })
        }
    }

    handleFormSubmit = event => {
        console.log(this.state.query)
        event.preventDefault(this.state.query);
        toast.info('Searching books...')
        this.fetchBooksGoogle();
    }
    // can uncomment const {id} = pBook and delete id from book.id on line 157
    handleSaveBook = (pBook) => {
        // destructure id
        const { id } = pBook;
        // use spread to clone state
        const library = [ ...this.state.books ] 
        // get element [0] of array
        const bookToSave = library.filter( book =>book.id === id)[0]

        // save
        API.saveBook(bookToSave)
        .then(() => this.setState({ errorMsg: alert(`${bookToSave.title} saved`)})
            // console.log(book.volumeInfo)
            // this.setState({
            //     books: this.state.books.filter(book => book.id !== id)
            //   });
            ).catch(err => console.log(err));
          }

    render() {
        return (
            <Container>
                <Jumbotron />
                <Row className="rowSearch">
                    <Col size="md-12">
                        <Wrapper>
                            <form className="form-inline justify-content-center">
                                <div className="form-group mx-sm-3 mb-2">
                                    <label htmlFor="Title" className="sr-only">
                                        Search Book Title
                                    </label>
                                    <input
                                        className="form-control heading-subtitle"
                                        id="title"
                                        type="text"
                                        value={this.state.query}
                                        onChange={this.handleInputDelta}
                                        name="query"
                                        placeholder="Title (required)"
                                        size="50"
                                        required
                                    />
                                    </div>
                                    <button 
                                        className="btn btn-lg search-button heading-subtitle bg-white"
                                        // if no search query, disable the button
                                        disabled={!(this.state.query)}
                                        onClick={this.handleFormSubmit}
                                        type="submit"
                                    >
                                        <strong>Search</strong>
                                    </button>
                            </form>
                        </Wrapper>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12">
                        {this.state.books.length ? (
                            <List className="listGroup">
                                {this.state.books.map(book => (
                                    <React.Fragment key = {book.id}>
                                    <ListItem key = {book.id}>
                                    <a href={`https://books.google.com/books?id=${book.id}&dq=${book.title}&hl=&source=gbs_api`} rel="noreferrer" target="__blank">
                                        {book.title}<br/>{book.subtitle}
                                    </a>
                                        <br/>
                                    <img src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} alt={book.title} className="bookImage" />
                                        <br/>
                                    <p className="listAuthor">
                                    <strong>Author(s):</strong>&nbsp;{book.authors.join(", ")}
                                    </p>
                                    <p className="listPublish">
                                    <strong>Pulished:</strong>&nbsp;
                                        {Moment(book.publishedDate, 'YYYY-MM-DDTHh:mm:ss')
                                        .format("MM-DD-YYYY")}
                                    </p>
                                    <p className="listDescription">
                                        <strong>Description:</strong>&nbsp;{book.description}
                                    </p>
                                    <button 
                                        className="btn save-button heading-subtitle ml-2" 
                                        type="btn btn-md" 
                                        label="search"
                                        book={this.state.books}
                                        onClick={() => this.handleSaveBook(book)}
                                    >
                                       <strong>Save</strong>
                                    </button>
                                    </ListItem>
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <p className="searchFormOpen">{this.state.errorMsg}</p>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Search;