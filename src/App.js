import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    booksInShelf: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
        this.setState({
        booksInShelf: books
      })
    })
  }

  updateBooksShelf=(bookId, bookShelf)=>{
    console.log("in update book shelf", bookId, bookShelf);
    console.log("booksInShelf", this.state.booksInShelf);

    BooksAPI.update(bookId, bookShelf).then((x)=>{


      console.log('x', x)
   
      //this.setState({booksInShelf:updatedTicket});
      
    })



  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (<BooksShelf booksInShelf={this.state.booksInShelf} updateBookShelf={this.updateBooksShelf} />)}
      </div>
    )
  }

}

export default App;
