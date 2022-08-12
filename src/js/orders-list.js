// const sortMenu = document.getElementById("divSort");
// sortMenu.addEventListener("click", function (e) {
//   e.stopPropagation();
// });

const search = document.getElementById("q");
const searchddl = document.getElementById("divSearchSuggestionsWrapper");

search.addEventListener("focus", function (e) {
  document.getElementById("divSearch").classList.add("show");
  const inputTop = search.offsetTop - 5;
  const inputHeight = search.offsetHeight;
  searchddl.style.top = inputTop + inputHeight;
  searchddl.classList.toggle("d-none");
});

window.addEventListener("click", (e) => {
  if (e.target.id === "q") return;

  const withinBoundaries = e.composedPath().includes(searchddl);

  if (!withinBoundaries && !searchddl.classList.contains("d-none")) {
    console.log("both are false so hiding the menu");
    searchddl.classList.add("d-none");
    document.getElementById("divSearch").classList.remove("show");
  }
});
