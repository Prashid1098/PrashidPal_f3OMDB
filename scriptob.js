const API_KEY="fd829fe1";
const msearch=document.querySelector("#sub-2");
const searchbox2=document.querySelector(".search-2");
const Cinema_c=document.querySelector(".movie-cards");
const loading = document.querySelector(".loader");
const url="https://www.omdbapi.com/?s=";


// {SEARCH_TERM}&apikey={API_KEY}


async function checkMovie(cinema)
{
    const response=await fetch(url+cinema+`&apikey=${API_KEY}`);
    var data=await response.json();
    console.log(data);
    const res=createCard(data);
    return res;
}

function createCard(data)
{
    const m_card=document.createElement("div");
    m_card.classList.add("movie-m");
    m_card.innerHTML=
    `<div>
        <img src="${data.Search[0].Poster}" alt="" class="poster-image">
    </div>
    <div class="movie-info">
    <div>
        <span id="title">${data.Search[0].Title}</span>
        <span id="year">(${data.Search[0].Year})</span>
    </div>
    <div>
        <a href="https://www.imdb.com/title/${data.Search[0].imdbID}/" target="_blank" id="rating">More Details</a>
        <span id="type">${data.Search[0].Type}</span>
    </div>
</div>`
console.log(m_card);
return m_card;
}

function updateMovieCards(cards)
{
    Cinema_c.innerHTML="";
    cards.forEach(card => {
        Cinema_c.appendChild(card);
    });
}

function load()
{
    loading.style.display="block";
}

msearch.addEventListener("click", async ()=>{
    const cinema=searchbox2.value;

    loading.style.display="block";

    setTimeout(async ()=>{
        const m_card=await checkMovie(cinema);
        const cards=Array.from(Cinema_c.getElementsByClassName("movie-m"));
        cards.push(m_card);
        updateMovieCards(cards);
        loading.style.display="none";
    },1000);
});

