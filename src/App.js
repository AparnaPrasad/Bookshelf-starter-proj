import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class App extends Component {
  state = {
    booksInShelf: [],
    booksOnSearch:[],
    booksOnShelfIdList:[]
  }


  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      var listOfIds = [];
      listOfIds=books.map(b=>b.id);

        this.setState({
        booksInShelf: books,
        booksOnShelfIdList: listOfIds
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

      if(bookShelf === 'none') //remove from shelf
      {
        this.setState((currState)=>({ 
          booksInShelf: currState.booksInShelf.filter((c)=>c.id!==bookId),
          booksOnShelfIdList: currState.booksOnShelfIdList.filter((c)=>c.id!==bookId)
        }))

      }
      else{ //just update the shelf
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

  addBookToShelf=(bookId, bookShelf)=>{ //add book to shelf if its moving from none to any other state
    
      BooksAPI.update(bookId, bookShelf).then(()=>{

        var newObj = this.state.booksOnSearch.filter((obj)=>obj.id===bookId) //get obj details

          newObj[0].shelf = bookShelf; //change to new state 
          this.setState((currState)=>({ 
            booksInShelf: currState.booksInShelf.concat(newObj[0]),
            booksOnShelfIdList: currState.booksOnShelfIdList.concat(newObj[0].id)
          }))

      })

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={()=>
          (<SearchBooks booksInShelf={this.state.booksInShelf} searchBooks={this.searchBooks} 
            updateBookShelf={this.updateBooksShelf} addBookToShelf={this.addBookToShelf} 
            booksOnSearch={this.state.booksOnSearch} booksOnShelfIdList={this.state.booksOnShelfIdList}/>)
        }/>  
          
        <Route exact path="/" render={()=>
          (<BooksShelf booksInShelf={this.state.booksInShelf} updateBookShelf={this.updateBooksShelf} />
        )}/>
      </div>
    )
  }

}

export default App;
