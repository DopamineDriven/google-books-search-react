import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Saved from './pages/Saved.jsx';
import Search from './pages/Search.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Wrapper from './components/Wrapper/Wrapper.jsx';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper>
        <React.Fragment>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </React.Fragment>
      <ToastContainer transition={Slide} className={toast.POSITION.TOP_CENTER} />
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
