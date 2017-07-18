import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: true,
    booksInShelf: [],
    booksOnSearch:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
        this.setState({
        booksInShelf: books
      })
    })

  }

  searchBooks=(query)=>{
    BooksAPI.search(query,20 ).then((res)=>{
      this.setState({ 
        booksOnSearch:res
      })
    })
  }

  updateBooksShelf=(bookId, bookShelf)=>{
    
    BooksAPI.update(bookId, bookShelf).then(()=>{

      var newObj = this.state.booksInShelf.filter(function(obj) {
        if(obj.id===bookId){
          obj.shelf=bookShelf;
        }
        return obj
        
      });

      this.setState({
        booksInShelf: newObj
      })

      
    })


  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={()=>
          (<SearchBooks booksInShelf={this.state.booksInShelf} searchBooks={this.searchBooks} 
            updateBookShelf={this.updateBooksShelf} booksOnSearch={this.state.booksOnSearch}/>)
        }/>  
          
        <Route exact path="/" render={()=>
          (<BooksShelf booksInShelf={this.state.booksInShelf} updateBookShelf={this.updateBooksShelf} />
        )}/>
      </div>
    )
  }

}

export default App;
