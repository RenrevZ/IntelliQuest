import { defineStore } from 'pinia'
import axios from 'axios'

export const bookStore = defineStore('books', {
    state: () => ({
        books : [],
        book:[],
        genre:[
          'Fiction',
           'Narrative',
           'Science fiction',
           'Historical Fiction',
           'Non-fiction',
           'Young adult fiction',
           'Thriller',
           'Historical fantasy',
           'Fantasy',
           'Literary fiction',
           'Memoir',
           'Fantasy Fiction',
           'Women\'s fiction',
           'Short story',
           'Romance novel',
           'Biography',
           'Self-help book',
           'Western fiction',
           'Speculative fiction',
           'Action fiction',
           'Essay',
           'Graphic novel',
           'Poetry',
           'Crime fiction',
           'New adult fiction',
           'Coming-of-age story',
           'Magical Realism'
        ],
        favBook:[]
    }),
    actions: {
        async fetchAllbooks(){
            try {
                await axios.get('http://localhost:5000/books/getAllbooks',{
                        headers: { 'Content-Type': 'multipart/form-data' }
                      })
                      .then(response => this.books = response.data)
              } catch (error) {
                console.error('Error:', error);
              }
        },
        async storeBooks(item){
            await axios.post('http://localhost:5000/books/storeBooks',item,{
              headers: { 'Content-Type': 'multipart/form-data' }
            })
        },
        async fetchSingleBook(id){
           await axios.get(`http://localhost:5000/books/getSinglebook/${id}`,{
                    headers: { 'Content-Type': 'application/json' }
                  })
                 .then(response => this.book = response.data)
                 .catch(error => console.log(`error fetching the book:${error}`))
        },
        async addToFavBook(item){
          await axios.post(`http://localhost:5000/books/AddTofav`,item,{
                    headers: { 'Content-Type': 'application/json' }
                  })
                .then(response => console.log(response.data.message))
                .catch(error => console.log(`error fetching the book:${error}`))
        },
        async fetchFav(){
          await axios.get(`http://localhost:5000/books/Favorites`,{
                    headers: { 'Content-Type': 'application/json' }
                  })
                 .then(response => this.favBook = response.data)
                 .catch(error => console.log(`error fetching the book:${error}`))
        },
        async searchBook(search){
          await axios.post('http://localhost:5000/books/SearchBooks',search,{
                    headers:{ 'Content-Type': 'application/json' }
                  })
                .then(response => this.book = response.data)
                .catch(error => console.log(`error fetching the book:${error}`))
        }
    },
    getters:{
       bookList : (state) => state.books
    }
})