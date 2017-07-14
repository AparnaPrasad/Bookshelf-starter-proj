import React, {Component} from 'react'
import './App.css'
import PropTypes from 'prop-types'


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
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                	
                	{booksInShelf.filter( books => books.shelf === 'currentlyReading').map(books => (

                	<li key={books.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" onClick={()=>updateBookShelf(books.id, 'wantToRead')}>Want to Read</option>
                                <option value="read" onClick={()=>updateBookShelf(books.id, 'read')}>Read</option>
                                <option value="none" onClick={()=>updateBookShelf(books.id, 'none')}>None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div className="book-authors">{books.authors.map(a=> a + "  " )}</div>
                        </div>
                      </li>

                	)
                )}

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                	{booksInShelf.filter( books => books.shelf === 'wantToRead').map(books => (

                	<li key={books.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" onClick={()=>updateBookShelf(books.id, 'currentlyReading')}>Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" onClick={()=>updateBookShelf(books.id, 'read')}>Read</option>
                                <option value="none" onClick={()=>updateBookShelf(books.id, 'none')}>None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div className="book-authors">{books.authors.map(a=> a + "  " )}</div>
                        </div>
                      </li>

                	)
                )}
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {booksInShelf.filter( books => books.shelf === 'read').map(books => (

                	<li key={books.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" onClick={()=>updateBookShelf(books.id, 'currentlyReading')}>Currently Reading</option>
                                <option value="wantToRead" onClick={()=>updateBookShelf(books.id, 'wantToRead')}>Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" onClick={()=>updateBookShelf(books.id, 'none')}>None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div className="book-authors">{books.authors.map(a=> a + "  " )}</div>
                        </div>
                      </li>

                	)
                )}
                    </ol>
                  </div>
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