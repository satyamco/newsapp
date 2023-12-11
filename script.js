/* ======== navLogo reloading ======== */
function reload(){
    window.location.reload()
}

/* ======== Fetching data by api ========== */ 

const apiKey = "871f48d33b924f21a06eff338bfa6390"
const apiUrl = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => getNews('india'))
async function getNews(query){
    const response = await fetch(`${apiUrl}${query}&apikey=${apiKey}`);
    const data = await response.json();
    bindData(data.articles);
}


/* ======== bindData ======== */

function bindData(articles){
    const feed = document.querySelector(".feed");
    const newsCard = document.querySelector("#template-news-card");

    feed.innerHTML = "";
    articles.forEach((article) => {
        if(!article.urlToImage) return;
         const newNewsCard = newsCard.content.cloneNode(true);
         fillData(newNewsCard, article)
         feed.appendChild(newNewsCard)
    })
}


/* ======== Filling Data in Cards ======= */

function fillData(newNewsCard, article){
    const newsImg = newNewsCard.querySelector('#news-img');
    const newsTitle = newNewsCard.querySelector('#news-title');
    const newsSource = newNewsCard.querySelector('#news-source');
    const newsDesc = newNewsCard.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const souceDate = new Date(article.publishedAt).toLocaleDateString('en-US',{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name}🔹 ${souceDate}`

    newNewsCard.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank');
    })
}


/* =========== fetch news by nevitems ========== */

let selectedNavItem = null;
function navItemClick(id){
     getNews(id)
     const navItem = document.getElementById(id);
     selectedNavItem?.classList.remove('active');
     selectedNavItem = navItem;
     selectedNavItem.classList.add('active');

}

/* ======== adding search functionality ========= */

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("search-input");

searchButton.addEventListener("click" , () => {
    const query = searchText.value;
    if (!query) return;
    getNews(query);
    selectedNavItem?.classList.remove("active");
    selectedNavItem = null;
});

searchText.addEventListener("keydown" , (event) => {
    const query = searchText.value;
    if(event.key === 'Enter'){
    if (!query) return;
    getNews(query);
    selectedNavItem?.classList.remove("active");
    selectedNavItem = null;
}
});


