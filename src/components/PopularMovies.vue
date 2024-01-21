<template>
    <div class="mx-3">
        <h1 class="mt-2 grey--text popularmovie">Popular Movies</h1>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="3" v-for="movie in movies" :key="movie.id">
                    <MovieCard :movie="movie" :genres="genres" />
                </v-col>
            </v-row>
        </v-container>
        <h1 class="mt-4 grey--text populartv">Popular TV Shows</h1>
        <v-container fluid>
            <v-row>
                <v-col cols="12" sm="3" v-for="show in shows" :key="show.id" :sortCriteria="sortCriteria"
                    @popularity="sortBy('popularity')" @vote_average="sortBy('vote_average')"
                    @release_date="sortBy('release_date')">
                    <TVCard :show="show" />
                </v-col>
            </v-row>
            <div class="text-center mt-4 pagination" v-if="showPagination">
                <v-pagination color="primary" v-model="page" :length="3" :value="page"></v-pagination>
            </div>
        </v-container>
    </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import TVCard from './TVCard.vue';
export default {
    components: {
        MovieCard,
        TVCard,
    },
    data: function () {
        return {
            shows: [],
            page: 1,
            showPagination: false,
            movies: [],
            genres: [],
            sortCriteria: "Most Popular",
            sortedBy: "popularity",
        };
    },
    async mounted() {
        this.init();
        this.fetchGenres();
        try {
            const response = await this.$http.get("/movie/popular");
            this.movies = response.data.results;
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async fetchGenres() {
            try {
                const response = await this.$http.get("/genre/movie/list");
                this.genres = response.data.genres;
            } catch (error) {
                console.log(error)
            }
        },
        async init() {
            try {
                const key = process.env.APP_KEY;
                const response = await this.$http.get("/tv/popular?api_key=" + key + "&language=en-US&page=" + this.page);
                this.shows = response.data.results;
            } catch (error) {
                console.log(error)
            }
            this.sortBy(this.sortedBy);
            this.showPagination = true;
        },
        sortBy(prop) {
            if (prop === "popularity") {
                this.sortCriteria = "Most Popular";
            } else if (prop === "vote_average") {
                this.sortCriteria = "Highest Rated";
            } else if (prop === "release_date") {
                prop = "first_air_date";
                this.sortCriteria = "Release Date";
            }
            this.sortedBy = prop;
            this.shows.sort((a, b) => (a[prop] > b[prop] ? -1 : 1));
        },
    },
    watch: {
        page: function (page) {
            this.init();
        }
    }
}
</script>

<style>
.populartv {
    padding-top: 10%;
    text-align: center;
}
.popularmovie {
    padding-top: 3%;
    text-align: center;
}
.pagination {
    padding-top: 3%;
}
</style>