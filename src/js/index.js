// let Shekel = (() => {
//   // Code that runs in your function
//   Utility = {
//     isMobile: () => window.matchMedia("only screen and (max-width: 760px)").matches,
//   };
// })();

let Shekel = window.Shekel || {};
(() => {
  Shekel.Utility = Shekel.Utility || {};
  Shekel.Utility.isMobile = () =>
    window.matchMedia("only screen and (max-width: 760px)").matches;

  // Shekel.Uility.getPreviousSibling = (elem, callback) => {
  //   // Get the next sibling element
  //   let sibling = elem.previousElementSibling;

  //   // If there's no callback, return the first sibling
  //   if (!callback || typeof callback !== "function") return sibling;

  //   // If the sibling matches our test condition, use it
  //   // If not, jump to the next sibling and continue the loop
  //   let index = 0;
  //   while (sibling) {
  //     if (callback(sibling, index, elem)) return sibling;
  //     index++;
  //     sibling = sibling.previousElementSibling;
  //   }
  // };
})();
