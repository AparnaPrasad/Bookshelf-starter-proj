import React, {Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'
import Shelf from './Shelf'


class BooksShelf extends Component {

	state = {}

	render() {

		const {booksInShelf, updateBookShelf} = this.props;
    //console.log("func:", updateBookShelf());

		return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>

                 <Shelf updateBookShelf={updateBookShelf} currentShelf='currentlyReading' booksInShelf={booksInShelf}/>
                 </div>
                 

                 <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                   <Shelf updateBookShelf={updateBookShelf} currentShelf='wantToRead' booksInShelf={booksInShelf}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                    <Shelf updateBookShelf={updateBookShelf} currentShelf='read' booksInShelf={booksInShelf}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )

	}


}

BooksShelf.PropTypes={
  booksInShelf: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
}
export default BooksShelf;