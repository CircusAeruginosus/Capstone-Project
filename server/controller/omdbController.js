require("dotenv").config()
const axios = require("axios")
const { OMDB_KEY } = process.env


module.exports = {
    searchMovie: async (req, res) => {
        const { movieInput } = req.query
        let movieData 
        await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${movieInput}`)
        .then(res => {
            movieData = res.data 
        })
        .catch(error => console.log(error))
        res.status(200).send(movieData)
    }

}