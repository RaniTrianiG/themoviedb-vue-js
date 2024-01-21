import axios from "axios";
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2I5ZTNjYzFkYzU3MjI4NTAxNzA4ODQxMDI5NTZjZiIsInN1YiI6IjYxNjg2ODdjYTgwMjM2MDAyYjI3NWU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n642L8AeOUCXYwZvCtoknl_qEBhjE10Cx4cmX9w4tNs";
export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `${token}`
    }
})