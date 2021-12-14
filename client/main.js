const searchBtn = document.querySelector("#search-btn");

const titleContainer = document.querySelector("#want-to-watch")



const searchApi = (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search-input").value;
    console.log(searchInput)
    axios
    .get(`http://localhost:4040/api/title/search/?titleInput=${searchInput}`)
    .then(response => {
        console.log(response.data)
        if (response.data) {
            if (window.confirm(`Do you want to add ${response.data.Title}?`)) {
                
                let movieObj = {title: response.data.Title,
                poster: response.data.Poster,
                }
                axios
                .post


                let wantToWatchList = document.createElement("ul")
                titleContainer.appendChild(wantToWatchList)


                let wantToWatchPoster = document.createElement("img")
                wantToWatchPoster.src = response.data.Poster
                wantToWatchList.appendChild(wantToWatchPoster)


                let wantToWatchListItem = document.createElement("li")
                wantToWatchListItem.textContent = response.data.Title
                wantToWatchList.appendChild(wantToWatchListItem)
                

                let moveToWatchedIcon = document.createElement("span")
                moveToWatchedIcon.classList.add("material-icons")
                moveToWatchedIcon.textContent = "east"
                wantToWatchList.appendChild(moveToWatchedIcon)
                moveToWatchedIcon.addEventListener("click", handleMove)


            }
        }
    })
    .catch(error => console.log(error))
        
}

const handleMove = () => {
    //remove the movie from the want to watch list
    //add the movie to the watched list
    axios
    .delete(`http://localhost:4040/api/title/search/?titleInput=${searchInput}`)
    .then()
    
}


searchBtn.addEventListener("click", searchApi)

