import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron.jsx'
import API from '../utils/API.js';
import { Col, Row, Container } from '../components/Grid/Grid.jsx';
import { List, ListItem } from '../components/List/List.jsx';
import DeleteBtn from '../components/DeleteBtn/DeleteBtn.jsx';
import Moment from 'moment';
import './Pages.css';
import { toast } from 'react-toastify';


// Utilizing functional over class components
const Saved = () => {

    // useState Hook
    const [books, setBooks] = useState([]);
    
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
            .then(res => setBooks(res.data))
            .catch(error => console.log(error))
    }

    // handles the deletion of a book by id from the saved page
    const handleDiscardBook = async id => {
        const ogBooks = books;
        try {
            await API.deleteBook(id)
                .then(res => this.handleFetchBooks())
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("this book has been deleted")
                .then({ setBooks: ogBooks })
            }
        }
        // API.deleteBook(id)
        //     .then(handleFetchBooks())
        //     .catch(error => console.log(error))
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
                                        <a href={book.link} rel="noreferrer" target="__blank">{book.title}&nbsp;—&nbsp;{book.subtitle}</a>
                                        <br/>
                                        <img src={book.image} alt={book.title} className="bookImage" />
                                        <p className="listAuthor">Author(s):&nbsp;{book.authors}</p>
                                        <p className="listPublish">Published:&nbsp;{Moment(book.publishedDate, 'YYYY-MM-DDTHh:mm:ss')
                                            .format("MM-DD-YYYY")}</p>
                                        <p className="listDescription">Description:&nbsp;{book.description}</p>
                                    <DeleteBtn className="deleteButton" onClick={() => handleDiscardBook(book._id)}/>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p className="searchFormAlert">No saved books to display</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
};

export default Saved;
//         return (
//             <Container>
//                 <Row>
//                     <Col size="md-12">
//                         <Jumbotron>
//                             <h1 className="text-center text-bold">
//                                 React Google Books Search
//                             </h1>
//                             <h2 className="text-center">Search for and Save Books</h2>
//                         </Jumbotron>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col size="md-12">
//                         <Card title="Saved Books" icon="download">
//                             {books.length ? (
//                                 <List>
//                                     {books.map(book => (
//                                         <ListItem key={book._id}>
//                                             <a href={book.link} rel="noreferrer" target="__blank">{book.title}<br/>{book.subtitle}</a>
//                                             <img src={book.image} alt={book.title} className="bookImage" />
//                                             <p className="listAuthor">Author(s): {book.authors}</p>
//                                             <p className="listPublish">Published: {Moment(book.date, 'YYYY-MM-DDTHh:mm:ss').format("MM-DD-YYYY")}</p>
//                                             <p className="listDescription">{book.description}</p>
//                                             <DeleteBtn className="deleteButton" onClick={() => handleDiscardBook(book._id)}/>
//                                         </ListItem>
//                                     ))}
//                                 </List>
//                             ): (
//                                 <h2 className="text-center">No saved books.</h2>
//                             )}
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         )
//     }

// export default Saved;