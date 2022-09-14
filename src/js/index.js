import { v4 as uuidv4 } from "uuid";

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

  Shekel.Utility.isLocalStorageAvailable = () => {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  Shekel.Utility.Guid = () => uuidv4();

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

window.Shekel = Shekel;

function basketItem(
  id,
  brand,
  name,
  image,
  price1,
  price2,
  vat,
  vatpercent,
  code,
  barcode,
  campaign,
  quantity
) {
  this.id = Number.parseInt(id, 10);
  this.brand = brand;
  this.name = name;
  this.image = image;
  this.price2 = parseFloat(price2);
  this.price1 = parseFloat(price1);
  this.vat = parseFloat(vat);
  this.vatpercent = parseFloat(vatpercent);
  this.code = code;
  this.barcode = barcode;
  this.campaign = campaign;
  this.quantity = Number.parseInt(quantity, 10);
}

window.basketItem = basketItem;

let Basket = {
  Init: () => window.ShekelBasket || Basket.CreateNew(),

  CreateNew: () => {
    window.ShekelBasket = {
      guid: uuidv4(),
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      basketItems: [],
      customer: "",
      totalItems: 0,
      subTotal: 0,
      discountTotal: 0,
      vatTotal: 0,
      grandTotal: 0,
    };
  },

  //greet: function () {
  AddItem: (item) => {
    // if we don't have anything to add, exit
    if (!item) return;

    // check if quantity is a number
    if (!Number.isInteger(Number.parseInt(item.quantity))) return;
    // check if already in basket. If so increment quantity instead of creating a new one.
    const index = ShekelBasket.basketItems.findIndex(
      (obj) => obj.id == item.id
    );

    if (index > -1) {
      ShekelBasket.basketItems[index].quantity += item.quantity;
    } else {
      // add item to cart
      ShekelBasket.basketItems.push(item);
      ShekelBasket.lastModifiedDate = new Date();

      //calculate totals
      Basket.calculateTotals();
    }
  },

  RemoveItem: (productId) => {
    if (!Number.isInteger(Number.parseInt(productId, 10))) return;

    const index = ShekelBasket.basketItems.findIndex(
      (x) => x.id === Number.parseInt(productId, 10)
    );

    if (index !== -1) {
      ShekelBasket.basketItems.splice(index, 1);
      ShekelBasket.lastModifiedDate = new Date();

      // calculate totals
      Basket.calculateTotals();
    } else {
      alert("product not found");
    }
  },

  Clear: () => {
    ShekelBasket.basketItems = [];
  },

  getBasketItems: () => ShekelBasket.basketItems,

  calculateTotals: () => {
    if (!ShekelBasket.totalItems.length) return;

    // calculate total number of items (sum quantities)
    ShekelBasket.totalItems = ShekelBasket.basketItems
      .map((qty) => qty.quantity)
      .reduce((prev, next) => prev + next);

    // calculate subtotal
    ShekelBasket.subTotal = ShekelBasket.basketItems
      .map((item) => item.quantity * item.price1)
      .reduce((prev, next) => prev + next);

    // calculate discountTotal
    ShekelBasket.discountTotal = 0;

    // calculate vat
    ShekelBasket.vatTotal = ShekelBasket.basketItems
      .map((item) => item.vat * item.quantity)
      .reduce((prev, next) => prev + next);

    // calculate grand total
    ShekelBasket.grandTotal =
      ShekelBasket.subTotal -
      ShekelBasket.discountTotal +
      ShekelBasket.vatTotal;
  },
};

window.Basket = Basket;
Basket.Init();
