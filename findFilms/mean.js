// Muallif: Joraqozi Turdaliyev

//  select elemens
const elfilmList = document.querySelector(".filmList");
const elfilmTepmlate = document.querySelector(".filmTemplate").content;
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const InputSearch = document.querySelector(".filmInput");

// values
let page = 1;
let Search = "shazam";

// Render films
function renderFilm(filmArr, element) {
  element.innerHTML = null;
  const filmFragment = document.createDocumentFragment();
  filmArr.forEach((row) => {
    const filmTemplate = elfilmTepmlate.cloneNode(true);

    filmTemplate.querySelector(".filmImg").src = row.Poster;
    filmTemplate.querySelector(".filmTitle").textContent = row.Title;
    filmTemplate.querySelector(".filmType").textContent = row.Type;
    filmTemplate.querySelector(".filmYear").textContent = row.Year;
    filmTemplate.querySelector(".filmId").textContent = row.imdbID;

    filmFragment.appendChild(filmTemplate);
  });
  element.appendChild(filmFragment);
}
// Fetch Function
async function fetchFilm() {
  elfilmList.innerHTML = "<img class='slider' src='slider.svg' />";
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=5ebec614&s=" + Search + "&page=" + page
  );
  const data = await response.json();
  renderFilm(data.Search, elfilmList);

  //  Buttons
  if (page <= 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  if (page === Math.ceil(data.totalResults / 10)) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}
// buttons
nextBtn.addEventListener("click", (evt) => {
  page++;
  fetchFilm();
});
prevBtn.addEventListener("click", (evt) => {
  page--;
  fetchFilm();
});
// input
InputSearch.addEventListener("change", (evt) => {
  Search = evt.target.value.trim();
  InputSearch.value = null;
  fetchFilm();
});

fetchFilm();
