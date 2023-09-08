<template>
    <v-form @submit.prevent="publishedBook" enctype="multipart/form-data">
         <v-container>
           <v-card>
            <v-toolbar
                flat
                color="blue-grey"
                dark
                >
             <v-toolbar-title>
              <v-icon>mdi mdi-bookshelf</v-icon> Published a book
            </v-toolbar-title>
            </v-toolbar>
    
        <v-card-text>
            <!-- ERROR MESSAGE -->
            <v-alert
              v-if="v$.$errors != ''"
              color="red"
              type="error"
              variant="outlined"
              class="mb-2"
            >
    
            <ul v-for="error in v$.$errors" :key="error.$uid">
              <li>{{error.$property}} {{error.$message}}</li>
            </ul>
            </v-alert>
    
            <v-alert
              v-if="validation.hasError"
              color="red"
              type="error"
              variant="outlined"
              class="mb-2"
              :text="validation.errorMessage"
            />
            <!-- SUCCESS MESSAGE  -->
           <success-message
                v-if="!validation.hasError"
                :message="messageResponse.message" 
                :showSuccessMessage="messageResponse.show" />
    
            <v-col class="d-md-flex justify-content-center align-center">
              <v-img
                class="bg-white mb-5"
                height="200"
                :aspect-ratio="1"
                :src="formInput.BookCoverPreview != null ? formInput.BookCoverPreview : '../assets/defaultCover.jpg'"
              ></v-img>
    
              <v-file-input
                accept="image/*"
                label="Book Cover"
                @change="handleFileChange"
              ></v-file-input>
            </v-col>
    
            <v-text-field
              variant="filled"
              label="Book Title"
              v-model="formInput.BookTitle"
            ></v-text-field>

            <v-text-field
              variant="filled"
              label="Book Subtitle"
              v-model="formInput.BooksubTitle"
            ></v-text-field>
    
            <v-text-field
              variant="filled"
              label="Author"
              v-model="formInput.Author"
            ></v-text-field>
    
          <v-textarea
            variant="filled"
            label="Book Description"
            v-model="formInput.BookDescription"
          ></v-textarea>
    
          <v-text-field
            variant="filled"
            label="Date published"
            v-model="formInput.datePublished"
          ></v-text-field>
    
            <v-select
              v-model="formInput.genreSelected"
              :items="formInput.bookgenre"
              label="Select"
              multiple
              hint="Pick a genre"
              persistent-hint
            ></v-select>
        </v-card-text>

        <v-divider></v-divider>
    
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            type="submit"
            :text="submitBtn"
          />
        </v-card-actions>
      </v-card>
      </v-container>
    </v-form>
</template>

<script setup>
      import { onMounted,ref,reactive } from 'vue'
      import { bookStore } from '../store/book'
      import successMessage from '../components/successMessage.vue'
      import validateInputs from '@/validators/PublisheBookValidator'
    
      const books = bookStore()
      const booksList = ref([])
      
      // FORM INPUT
      const validation = reactive({
         hasError : false,
         errorMessage: ''
      })
    
      const formInput =  reactive({
          BookCover :null,
          BookCoverPreview:null,
          BookTitle : '',
          BooksubTitle : '',
          BookDescription : '',
          Author:'',
          datePublished : null,
          genre: [],
          bookgenre: books.genre,
          genreSelected: []
      })
    
      const handleFileChange = (event) => {
          const file = event.target.files[0]
    
          if (file) {
            formInput.BookCover = file;
            
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
    
              reader.onload = (e) => {
                formInput.BookCoverPreview = e.target.result;
              };
    
              reader.readAsDataURL(file);
          } else {
            formInput.BookCoverPreview = null;
          }
        } else {
          formInput.BookCover = null;
          formInput.BookCoverPreview = null;
        }
      }
    
      onMounted(async () => {
          try {
            await books.fetchAllbooks()
            booksList.value = books.bookList
          } catch (error) {
            console.error('Error fetching books:', error)
          }
      })
      
      // SUCCESS MESSAGE
      const messageResponse = reactive({
          show:false,
          message:''
      })
    
      const v$ = validateInputs(formInput)
    
      let submitBtn = ref("Published");
    
      const publishedBook = async () => {
        console.log(formInput.BooksubTitle)
        const validate = await v$.value.$validate();
    
        if(validate){
          try {
             submitBtn.value = 'Publishing....';
            
             const formData = new FormData();
             formData.append('BookCover', formInput.BookCover);
             formData.append('BookTitle', formInput.BookTitle);
             formData.append('BookSubtitle', formInput.BooksubTitle);
             formData.append('BookDescription', formInput.BookDescription);
             formData.append('genreSelected',formInput.genreSelected);
             formData.append('Author', formInput.Author);
             formData.append('datePublished', formInput.datePublished);
           
              await books.storeBooks(formInput)
              messageResponse.show = true
              messageResponse.message = 'Books successfully published'
    
              setTimeout(() => {
                  window.location.reload()
              },2000)
          } catch (error) {
              validation.hasError = true
              validation.errorMessage = error.message
          }
        }
      }
</script>
<style>
    
</style>