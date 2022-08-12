// const sortMenu = document.getElementById("divSort");
// sortMenu.addEventListener("click", function (e) {
//   e.stopPropagation();
// });

const search = document.getElementById("q");
const searchddl = document.getElementById("divSearchSuggestionsWrapper");
search.addEventListener("focus", function (e) {
  searchddl.classList.toggle("d-none");
});
