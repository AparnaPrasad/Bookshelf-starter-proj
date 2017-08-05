import React, {Component} from 'react';
//import * as BooksAPI from './BooksAPI'
import './App.css'
import EscapeRegExp from'escape-string-regexp'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import RenderBook from './RenderBook'

class SearchBooks extends Component{

  state={
    query:'',
  }

  updateQuery=(query)=>
  {
  
    this.setState(()=>({
      query: query.trim()
    }))

    this.props.searchBooks(query)
  }

  render(){

    const {query} = this.state;
    const {booksInShelf, updateBookShelf, booksOnSearch, addBookToShelf, booksOnShelfIdList}= this.props;
    let showShelfBooks=[];

    if(query)
    {
      const match=new RegExp(EscapeRegExp(query), 'i');
      showShelfBooks = booksInShelf.filter(c=>match.test(c.title))
      
    }

 
    return (
          <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                className="search-books" 
                placeholder="Search by title or author" 
                value={query}
                onChange={(event)=>(this.updateQuery(event.target.value))}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                
                {showShelfBooks.map((books, itr)=>(
                  <RenderBook key={itr} books={books} updateBookShelf={updateBookShelf}/>
                ))}

                {query && booksOnSearch.filter(books=> books.shelf==='none' && booksOnShelfIdList.indexOf(books.id)===-1).map((books, itr)=>(
                  <RenderBook key={itr} books={books} updateBookShelf={addBookToShelf}/>
                ))}

              </ol>
            </div>
    </div>)
  }


}

SearchBooks.defaultProps = {
  booksOnSearch: [],
  booksInShelf: [],
  booksOnShelfIdList:[]
};

SearchBooks.PropTypes={
  searchBooks: PropTypes.func.isRequired,
  booksInShelf: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  booksOnSearch: PropTypes.array.isRequired,
  addBookToShelf: PropTypes.func.isRequired,
  booksOnShelfIdList: PropTypes.array.isRequired
}

export default SearchBooks;

