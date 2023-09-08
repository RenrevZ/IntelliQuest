<template>
  <v-container class="d-flex justify-center align-center container">
    <v-row>
      <v-col class="text-start" cols="12" md="3">
        <v-card class="image-card" elevation="6">
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="book.BookCover"
          ></v-img>
        </v-card>
        <v-col cols="12">
          <v-btn block rounded="xs" size="x-large" class="bg-blue">Read <v-icon>mdi mdi-book-open-page-variant-outline</v-icon></v-btn>
        </v-col>
      </v-col>

      <!-- Column 2 -->
      <v-col class="text-grey-darken-1" cols="12" md="8">
        <p class="text-h3 mb-3 text-grey-darken-3 py-2">
          {{ book.BookTitle }}
        </p>

        <p class="text-subtitle-1">
          By: {{ book.Author }}
        </p>

        <p class="text-subtitle-1">
          Released {{ book.PublishDate }}
        </p>
        
        <span v-for="genre in book.BookGenre" :key="genre">
          <v-chip class="ma-2">{{ genre }}</v-chip>
        </span>
        <v-divider></v-divider>
        <p class="text-subtitle-1 py-10">{{ book.BookDescription }}</p>

        <v-chip
          class="text-subtitle-1 text-blue pointer mb-3"
          
          @click="toggleReview"
        >
          Show reviews <v-icon>mdi mdi-arrow-right</v-icon> 
        </v-chip>

        <v-divider :thickness="3" class="mb-10"></v-divider>

        <BookReview v-if="showReview" :book="book"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { bookStore } from '../store/book'
import BookReview from '@/components/BookReview.vue'

const books = bookStore()
const book = ref('')

const route = useRoute()
const showReview = ref(false)
const toggleReview = () => showReview.value = !showReview.value

onMounted(async () => {
  const routeParams = route.params.id;
  
  if (routeParams) {
    await books.fetchSingleBook(routeParams);
    book.value = books.book
  }
})
</script>

<style scope>
  .container{
    min-height: 700px;
  }

  .pointer{
    cursor: pointer;
  }
</style>