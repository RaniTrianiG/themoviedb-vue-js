<template>
    <nav>
        <v-system-bar app dark>
            <v-spacer></v-spacer>
            <v-icon>mdi-minus</v-icon>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <v-icon>mdi-close</v-icon>
        </v-system-bar>
        <v-app-bar app color="blue" dark>
            <v-icon class="mr-2">fas fa-video</v-icon>
            <v-toolbar-title>Movies & TV Shows</v-toolbar-title>
            <v-btn text class="ml-2" to="/">Movies & TV Shows</v-btn>
            <v-btn text class="ml-2" to="/actors">Actors</v-btn>
            <v-btn text class="ml-2" to="/about">Info</v-btn>
            <v-spacer></v-spacer>
            <v-autocomplete clearable hide-no-data hide-selected color="white" label="search movies" prepend-inner-icon="search" flat :items="movies" item-text="title" item-value="id" id="search">
                <template v-slot:item="{item}">
                    <v-btn text :to="`/movie/${item.id}`">{{ item.title }}</v-btn>
                </template>
            </v-autocomplete>
            <v-btn icon>
            </v-btn>
            <v-badge bordered bottom color="green" dot offset-x="10" offset-y="10">
                <v-avatar size="40">
                    <v-img src="data:image/jpeg;base64,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"></v-img>
                </v-avatar>
            </v-badge>
        </v-app-bar>
    </nav>
</template>

<script>
export default {
    data:()=>({
        drawer:null,
        model: '',
        search: null,
        movies: []
    }),
    mounted(){
        this.loadMovies();
    },
    methods: {
        loadMovies: async function(){
            try {
                const response = await this.$http.get("/movie/popular");
                this.movies = response.data.results;

            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style>
</style>