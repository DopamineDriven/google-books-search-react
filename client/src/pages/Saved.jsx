import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron.jsx'
import Card from "../components/Card/Card.jsx";
import API from '../utils/API.js';
import { Col, Row, Container } from '../components/Grid/Grid.jsx';
import { List, ListItem } from '../components/List/List.jsx';
import DeleteBtn from '../components/DeleteBtn/DeleteBtn.jsx';

class Saved extends Component {
    state = {
        books: []
    }

    componentDidMount () {
        this.fetchSavedBooks()
    };

    fetchSavedBooks = () => {
        API.getBooks()
        .then(res => 
            this.setState({ 
            books: res.data 
        })
        ).catch(error => console.log(error))
    };

    handleDiscardBook = (id) => {
        API.deleteBook(id)
            .then(this.fetchSavedBooks())
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1 className="text-center text-bold">
                                React Google Books Search
                            </h1>
                            <h2 className="text-center">Search for and Save Books</h2>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <Card title="Saved Books" icon="download">
                            {this.state.books.length ? (
                                <List>
                                    {this.state.books.map(book => (
                                        <ListItem key={book._id}>
                                            <a href={book.link} rel="noreferrer" target="__blank">{book.title}<br/>{book.subtitle}</a>
                                            <img src={book.image} alt={book.title} className="bookImage" />
                                            <p className="listAuthor">Author(s): {book.authors}</p>
                                            <p className="listPublish">Published: {Moment(book.date, 'YYYY-MM-DDTHh:mm:ss').format("MM-DD-YYYY")}</p>
                                            <p className="listDescription">{book.description}</p>
                                            <DeleteBtn className="deleteButton" onClick={() => handleDiscardBook(book._id)}/>
                                        </ListItem>
                                    ))}
                                </List>
                            ): (
                                <h2 className="text-center">No saved books.</h2>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;