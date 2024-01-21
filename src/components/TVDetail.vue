<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-hover v-slot="{ hover }" open-delay="200">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
                            <router-link :to="`/show/${show.id}`">
                                <v-img :src="posterPath" alt="" class="" />
                            </router-link>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col cols="12" sm="8">
                    <h1 class="grey--text text-darken-3 mt-5">{{ show.name }}</h1>
                    <span class="blue--text">Detail TV Show</span>
                    <v-row>
                        <v-col cols="12" sm="2">
                            <v-rating :value="show.vote_average / 2" color="amber" dense half-increments readonly
                                size="14"></v-rating>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <span class="gray--text ml-n7">
                                {{ show.vote_average }}% | {{ show.first_air_date }}
                            </span>
                        </v-col>
                        <v-col cols="12" sm="7">
                            <div class="subtitle-2 grey--text ml-n16">
                                <span v-for="(item, index) in show.genres" :key="index" class="ml-1">
                                    {{ item.name }}
                                    <span v-if="(show.genres.length - 1 != index)">|</span>
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                    <p class="mt-5 grey--text text--darken-3 subheader">{{ show.overview }}</p>
                    <div class="mt-5">
                        <div :key="index" v-for="(crew, index) in show.created_by" class="mt-5">
                            <div v-if="index < 2">
                                <h3>Created By : </h3>
                                <span class="grey--text">{{ crew.name === null || '' ? 'No Name' : crew.name }}</span>
                                <h3>Total Seasons : </h3>
                                <span class="grey--text">{{ show.seasons.length === null || '' ? '1' : show.seasons.length}}</span>
                            </div>
                        </div>
                        <div class="style-padding">
                            <h3>Status TV Shows : </h3>
                            <span class="red--text">{{ show.status === null || '' ? '1' : show.status}}</span>
                        </div>
                    </div>
                    <div class="style-padding">
                        <v-btn tile color="blue">
                            <v-icon left color="white">mdi-play</v-icon>
                            <h4 class="colourText">Watchlist</h4>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <h1 class="grey--text">Name of Seasons</h1>
            <span v-for="(item, index) in show.seasons" :key="index" class="ml-1">
                {{item.name}}
                <span v-if="(show.seasons.length - 1 != index)">|</span>
            </span>
        </v-container>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            required: true
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        this.fetchShow(this.$route.params.id);
    },
    watch: {
        "$route.params.id": {
            handler() {
                this.fetchShow(this.$route.params.id);
            },
            immediate: true,
        }
    },
    computed: {
        posterPath() {
            return "https://image.tmdb.org/t/p/w1280" + this.show.poster_path
        }
    },
    methods: {
        async fetchShow(showId) {
            const response = await this.$http.get(
                "/tv/" + showId + "&language=en-US&page="
            );
            this.show = response.data;
            console.log('response detail show:', this.show, response)
        },
    }
}
</script>

<style>
.style-padding {
    padding-top: 5%;
}

.colourText {
    color: white;
}
</style>