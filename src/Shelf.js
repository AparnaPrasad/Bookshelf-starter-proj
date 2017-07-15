import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Shelf extends Component {


	render() {

		const {booksInShelf, updateBookShelf, currentShelf} = this.props;

		return(

		<div className="bookshelf-books">
                    <ol className="books-grid">


                	{booksInShelf.filter( books => books.shelf === currentShelf).map(books => (

                	<li key={books.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event) => (updateBookShelf(books.id, event.target.value))}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" >None</option>
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
                  </div>)

              

	}

}

Shelf.PropTypes={
  booksInShelf: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
  currentShelf: PropTypes.string.isRequired
}
export default Shelf;