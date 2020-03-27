import React, { Component } from 'react';


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

     render() {
         return (
             <div>Hello</div>
         )
     }
}

export default Search;