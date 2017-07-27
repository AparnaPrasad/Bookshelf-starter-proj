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
     if(res && res.error)return 
      this.setState({ 
        booksOnSearch:res
      })
    })
  }


  updateBooksShelf=(bookId, bookShelf)=>{
    
    BooksAPI.update(bookId, bookShelf).then(()=>{

      if(bookShelf === 'none')
      {
        this.setState((currState)=>({ 
          booksInShelf: currState.booksInShelf.filter((c)=>c.id!==bookId)
        }))

      }
      else{
      var newObj = this.state.booksInShelf.filter(function(obj) {
        if(obj.id===bookId){
          obj.shelf=bookShelf;
        }
        return obj
        
      });

      this.setState({
        booksInShelf: newObj
      })
    }

      
    })


  }

  addBookToShelf=(bookId, bookShelf)=>{
    console.log('in addbook to shelf id', bookId, bookShelf);

    if(bookShelf!=='none'){
    
      BooksAPI.update(bookId, bookShelf).then(()=>{

        //console.log('obr', obr);

        var newObj = this.state.booksOnSearch.filter((obj)=>obj.id===bookId)
        console.log('newObj:', newObj[0]);
        console.log('newObj shelf', newObj[0].shelf);
        if(newObj[0].shelf === 'none')
        {
          newObj[0].shelf = bookShelf;  
          console.log('in addbook to shelf', newObj[0]);
          this.setState((currState)=>({ 
            booksInShelf: currState.booksInShelf.concat(newObj[0])
          }))

        }
        
        console.log('updated book in shelf:', this.state.booksInShelf);
      
      })
    }
  


  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={()=>
          (<SearchBooks booksInShelf={this.state.booksInShelf} searchBooks={this.searchBooks} 
            updateBookShelf={this.updateBooksShelf} addBookToShelf={this.addBookToShelf} booksOnSearch={this.state.booksOnSearch}/>)
        }/>  
          
        <Route exact path="/" render={()=>
          (<BooksShelf booksInShelf={this.state.booksInShelf} updateBookShelf={this.updateBooksShelf} />
        )}/>
      </div>
    )
  }

}

export default App;
