// const sortMenu = document.getElementById("divSort");
// sortMenu.addEventListener("click", function (e) {
//   e.stopPropagation();
// });

const search = document.getElementById("q");
const searchddl = document.getElementById("divSearchSuggestionsWrapper");

search.addEventListener("focus", function (e) {
  const inputTop = search.offsetTop;
  const inputHeight = search.offsetHeight;
  searchddl.style.top = inputTop + inputHeight - 10;

  searchddl.classList.toggle("d-none");
});

window.addEventListener("click", (e) => {
  if (e.target.id === "q") return;

  const withinBoundaries = e.composedPath().includes(searchddl);

  if (!withinBoundaries && !searchddl.classList.contains("d-none")) {
    console.log("both are false so hiding the menu");
    searchddl.classList.add("d-none");
  }
});
