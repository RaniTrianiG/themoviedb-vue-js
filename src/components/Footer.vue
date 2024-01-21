<template>
    <v-footer dark padless>
        <v-card flat tile class="blue white--text text-conter footerstyle widthstyle">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                <v-icon size="24px">{{icon}}</v-icon>
            </v-btn>
            </v-card-text>
            <c-card-text class="white--text pt-0 footerstyle">
                This website contains information about Movies & TV shows that are consumed from The Movie DB API using the vue.js programming language
            </c-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text footerstyle">
                <strong>{{new Date().getFullYear()}} - Movies & TV Shows created by Rani Triani Gustia </strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data:()=>({
        icons:[
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram'
        ]
    })
}
</script>

<style>
.widthstyle {
    width: 100%;
}
.footerstyle {
    text-align: center;
    justify-content: center;
}
</style>