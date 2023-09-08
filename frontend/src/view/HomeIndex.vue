<template>
    <v-container class="h-screen">
      <v-tabs
        bg-color="transparent"
        color="basil"
        grow
        class="mb-10 w-75"
      >
            <v-tab @click="AllBooks">
              <v-icon class="text-h6">mdi mdi-bookshelf</v-icon> All Books
            </v-tab>
            
   
            <v-tab @click="favTab">
              <v-icon class="text-h6">mdi mdi-heart</v-icon> Favorites
            </v-tab>
      </v-tabs>

      <v-text-field clearable label="find book" 
                    prepend-icon="mdi mdi-home-search-outline"
                    class="mb-5"
                    v-model="searchBook">
      </v-text-field>

   <v-row class="mb-10" 
          v-for="genre in booklist" :key="genre._id">
      <v-col cols="12">
        <h3 class="text-h4 text-grey-darken-1 heading"> 
        {{ genre._id }}
      </h3>
      </v-col>

      <v-col class="mx-auto"
             max-width="1000">
            <v-slide-group
              class="pa-4"
              selected-class="bg-success"
              prev-icon="mdi mdi-arrow-left-circle-outline"
              next-icon="mdi mdi-arrow-right-circle-outline"
              show-arrows
            >
              <v-slide-group-item
              v-for="book in genre.books" 
                     :key="book._id"
              >
              <router-link :to="{name:'publishedBook',params: {id: book._id}}" class="link">
                <v-card class="d-flex flex-column justify-center align-center">
                  <v-card-title>
                    <v-img
                          :src="book.BookCover"
                            height="300"
                            width="210"
                            cover
                            class="bg-grey-lighten-2"
                          ></v-img>
                      </v-card-title>

                      <v-card-subtitle class="w-100">

                        <span class="d-flex justify-end items-center">
                          <v-icon @click.prevent="addToFav(book._id)" 
                                  :class="{ 'text-red-accent-4': book.isFav }">

                            <template v-if="book.isFav">
                              mdi mdi-heart
                            </template> 

                            <template v-else>
                              mdi mdi-heart-outline
                            </template>

                          </v-icon>
                        </span>
                        
                        <h1 class="text-h6">{{ book.BookTitle }}</h1>
                        <p class="text-subtitle-1">By {{ book.Author }}</p>
                        <p class="text-subtitle-1">Published : {{ book.PublishDate }}</p>
                        <p class="text-subtitle-1 mb-3">Ratings : {{ book.Ratings }}</p>
                      </v-card-subtitle>
                  </v-card>
                </router-link>
              </v-slide-group-item>
            </v-slide-group>
      </v-col>
   </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref, watch} from 'vue'
  import { bookStore } from '../store/book'
  /* eslint-disable */
  const books = bookStore()
  const booklist = ref([])
  const searchBook = ref([])

  // add Book to fav
  const addToFav = async (id) => {
    try{
      await books.addToFavBook({BookID:id})
      window.location.reload()
    }catch(err){
        console.log(`error adding to favorit: ${err}`)
    }
  }

  // All books Tab
  const AllBooks = async () => {
      await books.fetchAllbooks()
      booklist.value = books.books
  }

  // Fav tab
  const favTab = async () => {
    await books.fetchFav()
    booklist.value = books.favBook
  }

  // SEARCH BOOK
  watch(searchBook, async (searchValue) => {
    if(searchBook.value != '') {
      const search = await books.searchBook({search:searchValue})
      booklist.value = books.book
    }else{
      booklist.value = books.books
    }
  })


  onMounted(async () => {
      await books.fetchAllbooks()
      booklist.value = books.books
  })
</script>

<style scope>
.Subtitle{
  color:#59E4A8;
}

.heading{
  border-left: 10px solid #59E4A8;
  
  padding: 10px;
}

.link{
  text-decoration: none;
}
</style>