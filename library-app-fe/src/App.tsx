import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import Books from './pages/Books';
import Book from './pages/Book';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = { <RedirectToBooks/> }/>
          <Route path="/books"  element = {<Books/>}/>
          <Route path="/books/:id"  element = {<Book/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const RedirectToBooks = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate('/books');
  }, [navigate]);
  return null;
};

export default App;
