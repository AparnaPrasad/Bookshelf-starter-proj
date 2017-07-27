import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RenderBook extends Component{

  render(){

    const {books, updateBookShelf} = this.props;

    return(
      
      <li key={books.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={books.shelf}  onChange={(event) => (updateBookShelf(books.id, event.target.value))}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" >None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div className="book-authors">{books.authors && books.authors.map(a=> a + "  " )}</div>
                        </div>
      </li>
    

    )
  }


}


RenderBook.PropTypes={
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
}

export default RenderBook;