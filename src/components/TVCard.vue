<template>
    <v-hover v-slot="{ hover }" open-delay="200">
        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
            <router-link :to="`/show/${show.id}`">
                <v-img :src="posterPath" alt="" class=""></v-img>
            </router-link>
            <v-card-title class="subtitle-2">{{ show.original_name }}</v-card-title>
            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value="show.vote_average / 2" color="amber" dense half-increments readonly size="14">
                    </v-rating>
                    <div class="grey--text">
                        {{ show.vote_average }} % | {{ show.first_air_date }} 
                    </div>
                </v-row>
                <div class="my-4 subtitle-2">
                    <span>
                        Popularity: {{ show.popularity }} 
                    </span>
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    props: {
        show: {
            required: true,
        },
    },
    computed: {
        posterPath() {
            if(this.show.poster_path){
                return "https://image.tmdb.org/t/p/w1280" + this.show.poster_path
            }
            if(this.show.poster_path === null){
                return "https://via.placeholder.com/300x450"
            }
            
        }
    },
}
</script>

<style></style>