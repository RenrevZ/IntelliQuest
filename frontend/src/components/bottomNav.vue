<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      active
      color="primary"
    >

       <router-link :to="{name:'books'}" class="link">
        <v-btn class="btn">
              <v-icon class="mb-1">mdi mdi-book-multiple</v-icon>
                Books
        </v-btn>
      </router-link>
     

      <router-link :to="{name:'published'}" class="link">
      <v-btn class="btn">
      
          <v-icon  class="mb-1">mdi mdi-book-plus-multiple</v-icon>
          Published
      </v-btn>
     </router-link>
     
      <router-link :to="{name:'findBooks'}" class="link">
        <v-btn class="btn">
          <v-icon class="mb-1">mdi mdi-text-box-search-outline</v-icon>

          <span>find</span>
        </v-btn>
      </router-link>
    </v-bottom-navigation>
  </v-layout>
</template>
<style scope>
  .link{
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    color: #202020;
    font-size: 10px !important;
  }

  .btn{
    font-size: 11px !important;
  }
</style>