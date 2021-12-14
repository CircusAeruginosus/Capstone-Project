require("dotenv").config()
const axios = require("axios")
const { OMDB_KEY } = process.env


module.exports = {
    searchTitle: async (req, res) => {
        const { titleInput } = req.query
        let titleData 
        console.log(req.query)
        await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${titleInput}`)
        .then(res => {
            titleData = res.data 
        })
        .catch(error => console.log(error))
        res.status(200).send(titleData)
    },

}