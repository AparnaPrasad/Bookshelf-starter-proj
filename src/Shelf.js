import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RenderBook from './RenderBook'

class Shelf extends Component {


	render() {

		const {booksInShelf, updateBookShelf, currentShelf} = this.props;

		return(

		<div className="bookshelf-books">
                    <ol className="books-grid">


                	{booksInShelf.filter( books => books.shelf === currentShelf).map((books,itr) => (

                      <RenderBook key={itr} books={books} updateBookShelf={updateBookShelf}/>

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