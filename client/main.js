const searchBtn = document.querySelector("#search-btn");

const titleContainer = document.querySelector("#want-to-watch");

const showOnScreen = (dbObj) => {
    document.querySelector("#want-to-watch").innerHTML = ""
    document.querySelector("#watched").innerHTML = ""
    

  const createEl = (movieObj, wtw) => {
    let movieContainer = document.createElement("ul");
    movieContainer.setAttribute("name", movieObj.imdbID)

    let moviePoster = document.createElement("img");
    moviePoster.src = movieObj.Poster;
    movieContainer.appendChild(moviePoster);
    console.log(movieContainer)
  
    let movieTitle = document.createElement("li");
    movieTitle.textContent = movieObj.Title;
    movieContainer.appendChild(movieTitle);
  
    if (wtw) {
        let moveToWatchedIcon = document.createElement("span");
        moveToWatchedIcon.setAttribute("name", movieObj.imdbID)
        moveToWatchedIcon.classList.add("material-icons");
        moveToWatchedIcon.textContent = "east";
        moveToWatchedIcon.addEventListener("click", handleMove);
        movieContainer.appendChild(moveToWatchedIcon);
    }
    return movieContainer
  };

  dbObj.wantToWatch.forEach((movie) => {
    const movieEl = createEl(movie, true);
    // wantToWatchEls.push(movieEl);
    document.querySelector("#want-to-watch").appendChild(movieEl)
  });

  dbObj.watched.forEach((movie) => {
    const movieEl = createEl(movie, false);
    // watchedEls.push(movieEl);
    document.querySelector("#watched").appendChild(movieEl)
  });
};

const searchApi = (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#search-input").value;
    const confirmed = confirm("Do you want to add this?")
    if (confirmed) {
        axios
    .get(`/api/title/search/?titleInput=${searchInput}`)
    .then((response) => {
      console.log(response.data);
      showOnScreen(response.data);
    })
    .catch((error) => {
        console.log(error)
        if (error.response.data.errMsg) {
            alert(error.response.data.errMsg)

        }
    });
    } else {
        return
    }
};

const handleMove = (evt) => {
    const id = evt.target.getAttribute("name")
    axios
    .put(`/api/title/${id}`)
    .then((response) => {
        console.log(response.data);
        showOnScreen(response.data);
      })
      .catch((error) => console.log(error));
};

searchBtn.addEventListener("click", searchApi);
