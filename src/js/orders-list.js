// const sortMenu = document.getElementById("divSort");
// sortMenu.addEventListener("click", function (e) {
//   e.stopPropagation();
// });

const search = document.getElementById("q");

search.addEventListener("focus", function (e) {
  const searchddl = document.getElementById("divSearchSuggestionsWrapper");
  const inputTop = search.offsetTop;
  const inputHeight = search.offsetHeight;
  searchddl.style.top = inputTop + inputHeight;

  searchddl.classList.toggle("d-none");
});
