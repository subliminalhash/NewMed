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

class Basket {
  constructor() {
    // constructor body
  }

  createdDate = new Date();
  items = [];

  static add(item) {
    // if we don't have anything to add, exit
    if (!item) return;

    // check if quantity is a number
    if (Number.isInteger(item.qty)) return;

    // check if already in basket. If so increment quantity instead of creating a new one.
    const index = items.findIndex((i) => i.id === item.id);
    if (index) {
      items[index].qty = item.qty;

      // add item to cart
      items.push(item);
    }
    return;
  }

  remove(item) {
    if (!item) return;
    const index = items.findIndex((i) => i.id === item.id);
    if (index) items.splice(i, 1);
  }
}
