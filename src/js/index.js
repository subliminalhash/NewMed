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
})();
