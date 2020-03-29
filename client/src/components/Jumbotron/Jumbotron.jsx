import React from "react";
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './Jumbotron.css'

const Jumbotron = () => {
  return (
    <MDBContainer className="mt-1 text-center contains ">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <span className="align-top">
                <h1 className="text-center text-bold">
                    React Google Books Search
                </h1>
                <h2 className="text-center pb-5">
                    Search for and Save Books
                    <br/>
                    
                </h2>
                <p><i className="fas fa-book-open fa-5x justify-content-center" aria-hidden="true"></i></p>
            </span>      
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Jumbotron;
