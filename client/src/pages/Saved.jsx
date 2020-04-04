import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron.jsx'
import API from '../utils/API.js';
import { Col, Row, Container } from '../components/Grid/Grid.jsx';
import { List, ListItem } from '../components/List/List.jsx';
import Moment from 'moment';
import './Pages.css';
import { toast, ToastContainer } from 'react-toastify';


// Utilizing functional over class components
const Saved = () => {

    // useState Hook
    const [books, setBooks] = useState([]);
    const [msg, setMsg] = useState("");
    
    // populate all books and store them via setBooks useEffect
    // this replaces componentDidMount () {this.loadBooks()}
    // as it is being deprecated
    useEffect(() => {
        handleFetchBooks()
    }, [])

    // load books from database
    const handleFetchBooks = () => {
        API.getBooks()
            // setBooks replaces this.setState
            .then(res => 
                setBooks(res.data))
            .catch(error => 
                console.log(error))
    }

    // handles the deletion of a book by id from the saved page
    const handleDiscardBook = id => {
        console.log(books.id)
        API.deleteBook(id)
            .then(() => 
                setMsg({ msg: toast.success(`book deleted`) }))
            .then(() => 
                handleFetchBooks())
            .catch(error => 
                console.log(error))
    };


    return (
        <Container>
            <Jumbotron />
            <Row>
                <Col size="md-12 sm-12">
                    {books.length ? (
                        <List>
                            {books.map(book => (
                                <ListItem key = {book._id}>
                                    <a href={`https://books.google.com/books?id=${book.id}&dq=${book.title}&hl=&source=gbs_api`} 
                                        rel="noreferrer" target="__blank"
                                    >
                                        {book.title}<br/>{book.subtitle}
                                    </a>
                                        <br/>
                                    <img src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} 
                                        alt={book.title} className="bookImage" 
                                    />
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
                                        className="deleteButton btn delete-button heading-subtitle ml-2"
                                        type="btn btn-md"
                                        label="delete"
                                        onClick={() => 
                                            handleDiscardBook(book._id)}
                                    >
                                        <strong>Delete</strong>
                                    </button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p className="searchFormAlert">{msg}</p>
                    )}
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
};

export default Saved;