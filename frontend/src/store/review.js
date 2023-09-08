import { defineStore } from 'pinia'
import axios from 'axios'

export const reviewStore = defineStore('reviews', {
    state: () => ({
        reviews : []
    }),
    actions: {
        // async fetchAllbooks(){
        //     try {
        //         await axios.get('http://localhost:5000/books/getAllbooks',{
        //                 headers: { 'Content-Type': 'multipart/form-data' }
        //               })
        //               .then(response => this.books = response.data)
        //       } catch (error) {
        //         console.error('Error:', error);
        //       }
        // },
        async storeReview(item){
            await axios.post('http://localhost:5000/reviews/storeReviews',item,{
                    headers:  { 'Content-Type': 'application/json' }
                  })
                     
        },
        async fetchBookReview(id){
           await axios.get(`http://localhost:5000/reviews//getAllReviews/${id}`,{
                    headers: { 'Content-Type': 'application/json' }
                  })
                 .then(response => this.reviews = response.data)
                 .catch(error => console.log(`error fetching the book:${error}`))
        }
    },
    getters:{
       reviewList : (state) => state.reviews
    }
})