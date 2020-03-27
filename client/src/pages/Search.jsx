import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/Jumbotron.jsx";
import Wrapper from "../components/Wrapper/Wrapper.jsx";
import API from "../utils/API.js";
import { Col, Row, Container } from "../components/Grid/Grid.jsx";
import { List, ListItem } from "../components/List/List.jsx";
import { Input, FormBtn } from "../components/Form/Form.jsx";
import Moment from "moment";

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
                    image: data[i].volumeInfo.imageLinks.thumbnail,
                    // display preview link if exists
                    link: data[i].volumeInfo.infoLink
                }
                console.log(items)
                objectBooks.books.push(items)
            }
        }
        this.setState({ books: objectBooks.books, query: "" })
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
                    this.loadBooks(res.data.items)
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
            link: book.volumeInfo.infoLink,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then((res) => {
            console.log(res.config)
            this.props.history.push("/saved/")})
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron className="jumbo">
                            <h1 className="text-center text-bold">
                                React Google Books Search
                            </h1>
                            <h2 className="text-center">
                                Search for and Save Books
                            </h2>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row className="rowSearch">
                    <Col size="md-12">
                        <Wrapper>
                            <form className="searchForm">
                                <p className="searchFormHeading text-white">Book Search</p>
                                    <Input 
                                        className="searchFormInput"
                                        value={this.state.query}
                                        onChange={this.handleInputDelta}
                                        name="query"
                                        placeholder="Title (required)"
                                    />
                                    <FormBtn 
                                        className="searchFormBtn"
                                        // if no search query, disable the button
                                        disabled={!(this.state.query)}
                                        onClick={
                                            this.handleFormSubmit}
                                            text="search"
                                    >
                                        <i className="fas fa-search"></i>
                                    </FormBtn>
                            </form>
                        </Wrapper>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12 sm-12">
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <React.Fragment key = {book.id}>
                                    <ListItem key = {book.id}>
                                        <a href={book.link} rel="noreferrer" target="__blank">{book.title}&nbsp;—&nbsp;{book.subtitle}</a>
                                        <br/>
                                        <img src={book.image} alt={book.title} className="bookImage" />
                                        <p className="listAuthor">Author(s):&nbsp;{book.authors}</p>
                                        <p className="listPublish">Published:&nbsp;{Moment(book.publishedDate, 'YYYY-MM-DDTHh:mm:ss')
                                            .format("MM-DD-YYYY")}</p>
                                        <p className="listDescription">Description:&nbsp;{book.description}</p>
                                        <button className="listButton" type="btn btn-md" label="search" 
                                        onClick={() => this.handleSaveBook(book.id)}>
                                            <i className="fas fa-save"></i></button>
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