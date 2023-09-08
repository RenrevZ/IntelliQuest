<template>
  <v-container>
    <v-row class="d-flex justify-center align-center h-screen">
  <!-- Second Column (Image) -->
  <v-col order-md-2>
    <v-img
      class="bg-white"
      width="500"
      :aspect-ratio="1"
      src="../assets/systemCover.jpg"
    ></v-img>
  </v-col>

  <!-- First Column (Text and Buttons) -->
  <v-col transition="scroll-x-transition" cols-md="6" order-md-1>
    <h1 class="text-h1 text-grey-darken-1">Inteli<span class="Subtitle">Quest</span></h1>
    <p class="text-subtitle-1 text-center text-grey-darken-1">Discuss, rate, and interact ideas in the quest for intelligence</p>
    <v-col class="d-flex justify-around align-center" cols="5" sm="12" md="6">
      <v-btn class="aboutMebtn text-grey-darken-1 mx-8" 
        block rounded="xs" 
        size="x-large" 
      >
        <v-icon>mdi mdi-github</v-icon>About Me
      </v-btn>
              
      <router-link :to="{name:'books'}">
        <v-btn class="startBtn" 
          rounded="xs" 
          size="x-large"
        >
          Get Started <v-icon class="p-10">mdi mdi-arrow-right</v-icon>
        </v-btn>
      </router-link>
    </v-col>
  </v-col>
</v-row>

   
   <footer>
      <v-row>
        <v-col class="text-center text-grey-darken-1">&copy; Harvy Gascon</v-col>
      </v-row>
   </footer>
  </v-container>
</template>

<style scope>
.Subtitle{
  color:#59E4A8;
}

.startBtn{
    background-color:#59E4A8;
    color:#FFFFFF;
    font-weight: 500;
}

.aboutMebtn{
    border: 1px solid #21353C;
}
</style>