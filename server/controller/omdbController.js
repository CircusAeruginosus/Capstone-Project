require("dotenv").config()
const axios = require("axios")
const { OMDB_KEY } = process.env

const fakeDb = {
    wantToWatch: [],
    watched: []
}

const findIndex = (movieId) => {
    const index = fakeDb.wantToWatch.findIndex(movieObj => {
        return movieObj.imdbID === movieId
    })
    return index
} 

module.exports = {
    searchTitle: async (req, res) => {
        const { titleInput } = req.query
        let titleData 
        await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${titleInput}`)
        .then(dbres => {
            const targetIndex = findIndex(dbres.data.imdbID)
            if (targetIndex !== -1) {
                res.status(403).send({errMsg: "You've already added that!"})
            } else {
                fakeDb.wantToWatch.push(dbres.data)
                console.log(fakeDb)
                res.status(200).send(fakeDb)

            }
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(500)
        })
    },
    moveToWatched: (req, res) => {
        const { movieId } = req.params 
        const targetIndex = findIndex(movieId)
        fakeDb.watched.push(fakeDb.wantToWatch.splice(targetIndex, 1)[0])
        console.log(fakeDb)
        res.status(200).send(fakeDb)

    }
}