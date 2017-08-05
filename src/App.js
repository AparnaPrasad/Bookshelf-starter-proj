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
          //add to searh res?
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
    console.log('in addbook to shelf id', bookId, bookShelf);

    //if(bookShelf!=='none'){  //if the book is moving to none state from none it need not be added to the shelf
    
      BooksAPI.update(bookId, bookShelf).then(()=>{

        //console.log('obr', obr);

        var newObj = this.state.booksOnSearch.filter((obj)=>obj.id===bookId) //get obj details
        console.log('newObj:', newObj[0]);
        console.log('newObj shelf', newObj[0].shelf); //TODO add checks
        //if(newObj[0].shelf === 'none')  //if previous state is none add book to shelf
        //{
          newObj[0].shelf = bookShelf; //change to new state 
          console.log('in addbook to shelf', newObj[0]);
          this.setState((currState)=>({ 
            booksInShelf: currState.booksInShelf.concat(newObj[0]),
            booksOnShelfIdList: currState.booksOnShelfIdList.concat(newObj[0].id)
          }))

        //}
        
        console.log('updated book in shelf:', this.state.booksInShelf);
      
      })
    //}
  


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
