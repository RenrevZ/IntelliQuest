<template>
<transition name="slide-x-review">
    <v-container fluid class="mt-10">
                <div class="d-flex justify-center mt-auto text-h5 ">
                    Rating overview
                </div>

                <div class="d-flex align-center flex-column my-auto">
                <div class="text-h2 mt-5">
                    {{ averageRating }}
                    <span class="text-h6 ml-n3">/5</span>
                </div>

                <v-rating
                    :model-value="averageRating"
                    color="yellow-darken-3"
                    half-increments
                ></v-rating>
                <div class="px-3">{{ totalUsers }} ratings</div>
                </div>

                <v-list
                    bg-color="transparent"
                    class="d-flex flex-column-reverse mb-3"
                    density="compact"
                    >
                    <div>
                        <v-list-item v-for="element in stars" :key="element">
                            <v-progress-linear
                            :model-value="userStars[element]"
                            class="mx-n5"
                            color="yellow-darken-3"
                            height="20"
                            rounded
                            ></v-progress-linear>

                            <template v-slot:prepend>
                            <span>{{ element }}</span>
                            <v-icon icon="mdi-star" class="mx-3"></v-icon>
                            </template>

                            <template v-slot:append>
                            <div class="rating-values">
                                <span class="d-flex justify-end"> {{ userStars[element] }} </span>
                            </div>
                            </template>
                        </v-list-item>
                    </div>
                </v-list>
            
             
                <div class="star-rating d-flex justify-start align-center mb-3">
                    <span
                        v-for="(star, index) in stars"
                        :key="index"
                        @click="rate(index + 1)"
                        :class="{ 'filled': index < currentRating }"
                        >
                        <v-icon>
                            <template v-if="index < currentRating">
                            mdi mdi-star
                            </template>
                            <template v-else>
                            mdi mdi-star-outline
                            </template>
                        </v-icon>
                    </span>
                    <p class="text-darken-grey-3 text-h4">{{ currentRating }}</p>
                </div>

                <v-textarea
                    label="make your review"
                    auto-grow
                    variant="outlined"
                    rows="3"
                    row-height="25"
                    shaped
                    v-model="reviewDescription"
                ></v-textarea>

                <v-btn rounded="xs" 
                       size="large" 
                       class="bg-blue mb-3"
                       @click="SubmitReview(book._id)">{{ submitText }}</v-btn>

                <v-divider :thickness="3" class="mb-10"></v-divider>

                <!-- COMMENTS -->
                <div v-if="reviewList != ''">
                    <v-row class="d-flex flex-column justify-around align-center" v-for="review in reviewList" :key="review._id">
                            <v-col class="d-flex justify-around align-center">
                                <v-icon>mdi mdi-account-circle-outline</v-icon>
                                
                                <p class="text-subtitle-2 text-grey-darken-3 mr-4">
                                    {{ review.userID != null ? 'Anonymous' : review.userID }}
                                </p>

                                <p class="text-subtitle-1 text-yellow-darken-2">
                                    <v-icon v-for="(rating,index) in 5" :key="rating">
                                    <template v-if="index < review.Rating">
                                        mdi mdi-star
                                        </template>
                                        <template v-else>
                                        mdi mdi-star-outline
                                    </template>
                                    </v-icon>
                                </p>
                                <p class="text-h6 text-darken-grey-3 d-flex justify-center align-center mt-2 px-3">{{ review.Rating }}</p>
                            </v-col>
                            
                            <v-col>
                                <v-textarea
                                label="make your review"
                                auto-grow
                                variant="filled"
                                rows="3"
                                row-height="3"
                                shaped
                                readonly
                                :model-value="review.Description"
                                ></v-textarea>
                            </v-col>
                    </v-row>
                 </div>
                 <div v-else>
                    <v-row>
                        <v-col cols="12" class="text-h6 text-center">No reviews has been made yet</v-col>
                    </v-row>
                 </div>
    </v-container>
</transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { reviewStore } from '../store/review'

/* eslint-disable */
const props = defineProps(['book'])
const reviews = reviewStore()
const reviewList = ref(null)
const averageRating = ref(0)
const totalUsers = ref(0)

// GET THE NUMBER OF USER PER STARS
const userStars = {
  1:0,
  2:0,
  3:0,
  4:0,
  5:0
}

// Create a new Review
const currentRating = ref(0);
const reviewDescription = ref(null)
const stars = [1, 2, 3, 4, 5];

const rate = (value) => {
  currentRating.value = value;
};

// SUBMIT REVIEW
const submitText = ref('add review')

const SubmitReview = (bookid) => {
    try{
        submitText.value = 'adding....'
        const formData = {
            BookId:bookid,
            Rating:currentRating.value,
            averageRating:averageRating.value,
            Description:reviewDescription.value,
            userID:''
        }

        reviews.storeReview(formData)
        setTimeout(() => window.location.reload(),1000)
        
    }catch(err){
        console.log(err.message)
    }
    location.reload()
    submitText.value = 'add review'
}

//fetch reviews
onMounted(async () => {
   await reviews.fetchBookReview(props.book._id)
   reviewList.value = reviews.reviewList

   // CALCULATE THE OVERALL RATINGS
    const totalSum = reviewList.value.reduce((accumulator, item) => {

    const rating = parseFloat(item.Rating);

    if (!isNaN(rating)) {
        return accumulator + rating;
    }
    return accumulator;
    }, 0);

   totalUsers.value = reviewList.value.length;

   averageRating.value = totalUsers.value > 0 ? (totalSum / totalUsers.value).toFixed(1) : 0;

  const getUsersStarCount = reviewList.value.map(item => {

       const star =  stars.map(element => {
            if(element == item.Rating){
                userStars[item.Rating]++
            }
        });

        return star
  })
})

</script>

<style>
.slide-x-review-enter-active,
.slide-x-review-leave-active {
  transition: transform 0.5s;
}

.slide-x-review-enter-from,
.slide-x-review-leave-to {
  transform: translateX(100%); /* Adjust this value based on your desired slide direction */
}

.star-rating {
  display: inline-block;
  font-size: 15px;
}

.star-rating span {
  cursor: pointer;
  color: #ccc;
  transition: color 0.2s;
  margin-right: 5px;
}

.star-rating span.filled {
  color: #fdd835; /* Yellow color for filled stars */
}
</style>