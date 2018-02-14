const btnXhr = document.getElementById("xhr");
const btnFetch = document.getElementById("fetch");
const searchInput = document.getElementById("search-keyword");
const responseContainer = document.getElementById("response-container");
let searchForText;


getNews = () => {
  const articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function() {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      articleRequest.onload = addNews(response);
      articleRequest.onerror = handleError; 
    }
  };
  articleRequest.open("GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=38cb0fffb3ed4bb686c01e0e3af471a8`);
  articleRequest.send();
}

addNews = (array) => {
  if (array.length > 0) {
    array.forEach((element) => {
      if (element.document_type === "article") {
        const containerResult = `
      <div class = "col-md-4 col-sm-6 border">
      <hr>
      <h3>${element.headline.main}</h3>
      <hr>
      <p>${element.snippet}</p>
      <div class="img-box">
      <img class="size" src="https://static01.nyt.com/${element.multimedia[0].url}">
      </div>
      <a class="btn btn-color" href="${element.web_url}">Find out more</a>
      </div>`;
        responseContainer.innerHTML += containerResult;
      }
    });
  } 
  else {
    const containerNoResult = `<span class="alert">Sorry, We don't have information about that</span>`;
    responseContainer.innerHTML += containerNoResult;
    searchInput.value = "";
  }
}

handleError = (error) =>  {
  console.log(error);
}

btnXhr.addEventListener("click", (event) =>  {
  event.preventDefault();
  responseContainer.innerHTML = "";
  searchForText = searchInput.value;
  getNews();
});

btnFetch.addEventListener("click", () => {
  event.preventDefault();
  responseContainer.innerHTML = "";
  searchForText = searchInput.value;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=38cb0fffb3ed4bb686c01e0e3af471a8`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const response = data.response.docs;
      addNews(response);
    })
    .catch((error) => {
      console.log(error);
    });
});