import Tags from "./Tags";
import "./index.js";

document.addEventListener("DOMContentLoaded", function (event) {
  Tags.init(".tobeTagged");

  //#region - global variables
  // variables for enabling up/down arrow keys for product selection
  // in the product suggestions div in order create offcanvas
  const body = document.querySelector("body");
  const productsSearchTextBox = document.getElementById("txtSearchProducts");
  const ul = document.getElementById("ulProductSuggestions");
  const productQuantityDialog = document.getElementById(
    "dialogProductQuantity"
  );
  const divProductSearchSuggestions = document.getElementById(
    "divProductSearchSuggestions"
  );
  const divOrderProductSearch = document.getElementById("orderProductSearch");

  const ulBasketItems = document.getElementById("ulBasketItems");

  // order create variables
  const hdnProductId = document.getElementById("hdnProductId");
  const spnProductName = document.getElementById("productNameSpan");
  const ddlProductQuantity = document.getElementById("ddlProductQuantity");
  const frmAcceptProductQuantity = document.getElementById(
    "frmAcceptProductQuantity"
  );
  const btnQuantityDialogAdd = document.getElementById("btnQuantityDialogAdd");
  const btnQuantityDialogCancel = document.getElementById(
    "btnQuantityDialogCancel"
  );
  const offCanvasOrderCreate = document.getElementById("offCanvasOrderCreate");

  // print summary table
  const spanSubTotal = document.getElementById("spanSubTotal");
  const spanDiscountTotal = document.getElementById("spanDiscountTotal");
  const spanVatTotal = document.getElementById("spanVatTotal");
  const spanGrandTotal = document.getElementById("spanGrandTotal");
  const showAfterBasketHasItems = document.querySelectorAll(
    ".showAfterBasketHasItem"
  );

  const search = document.getElementById("q");
  const searchddl = document.getElementById("divSearchSuggestionsWrapper");
  const ordersDiv = document.querySelector(".orders");

  // ***************** ORDER CREATE *******************
  const ddlCustomers = document.getElementById("ddlCustomers");
  const ddlCustomersWrapper = document.getElementById(
    "orderCreateSelectCustomer"
  );

  let liSelectedProductSuggestion;
  let liProductIndex = -1;
  let next;

  //#endregion

  // load this from server in production
  let products;
  const productsPromise = fetch("./Products.json")
    .then((data) => data.json())
    .then((results) => (products = results));

  // END -----------------------------------------------------------

  // move up and down
  const ProductSelectionWithKeyboard = (event) => {
    // if suggestion list is not open there is no need to listen for this event...
    if (ul.classList.contains("d-none")) return;

    // LIST SELECTION FOR PRODUCT SUGGESTIONS IN ORDER CREATE
    const len = ul.getElementsByTagName("li").length - 1;
    if (event.code === "ArrowDown") {
      liProductIndex++;
      //down
      if (liSelectedProductSuggestion) {
        liSelectedProductSuggestion.classList.remove("bg-light");
        next = ul.getElementsByTagName("li")[liProductIndex];
        if (typeof next !== undefined && liProductIndex <= len) {
          liSelectedProductSuggestion = next;
        } else {
          liProductIndex = 0;
          liSelectedProductSuggestion = ul.getElementsByTagName("li")[0];
        }
        liSelectedProductSuggestion.classList.add("bg-light");
      } else {
        liProductIndex = 0;

        liSelectedProductSuggestion = ul.getElementsByTagName("li")[0];
        liSelectedProductSuggestion.classList.add("bg-light");
      }
    } else if (event.code === "ArrowUp") {
      //up
      if (liSelectedProductSuggestion) {
        liSelectedProductSuggestion.classList.remove("bg-light");
        liProductIndex--;
        next = ul.getElementsByTagName("li")[liProductIndex];
        if (typeof next !== undefined && liProductIndex >= 0) {
          liSelectedProductSuggestion = next;
        } else {
          liProductIndex = len;
          liSelectedProductSuggestion = ul.getElementsByTagName("li")[len];
        }
        liSelectedProductSuggestion.classList.add("bg-light");
      } else {
        liProductIndex = 0;
        liSelectedProductSuggestion = ul.getElementsByTagName("li")[len];
        liSelectedProductSuggestion.classList.add("bg-light");
      }
    }
    if (liSelectedProductSuggestion) liSelectedProductSuggestion.focus();
  };
  // event handler to detect keydown of up and down arrow keys to enable
  // selection of a particular product in the product suggestions div
  // in order create offcanvas
  document.addEventListener(
    "keyup",
    function (e) {
      // if quantity dialog is open, we don't mean to select a product and it means
      // we are pressing the keys to select quantity. So do not navigate the product list
      // if the product quantity dialog is open..

      if (!productQuantityDialog.open) {
        ProductSelectionWithKeyboard(e);
      }
    },
    false
  );

  // just about when the OrderCreate offcanvas is about to close, check if product suggestions is open.
  // if product suggestions div is open, then we probably mean to close that, instead of the offcanvas when we
  // initially pressed the ESC key.
  offCanvasOrderCreate.addEventListener("hide.bs.offcanvas", (e) => {
    if (!divProductSearchSuggestions.classList.contains("d-none")) {
      return e.preventDefault();
    }

    if (
      ShekelBasket.basketItems.length > 0 &&
      ShekelBasket.basketItems != undefined
    ) {
      console.log(ShekelBasket.basketItems);
      if (
        !confirm(
          "Yarım kalmış bu sipariş tamamen silinecek. Onaylıyor musunuz?"
        )
      ) {
        return e.preventDefault();
      } else {
        customerDeSelected();
        resetOrder();
      }
    }
  });

  body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // if quantity dialog (order create) open, close it and do not propagete
      if (productQuantityDialog.open) {
        btnQuantityDialogCancel.click();
        return;
        // or if the product suggestions div is open, then close that one.
      } else if (!divProductSearchSuggestions.classList.contains("d-none")) {
        divProductSearchSuggestions.classList.add("d-none");
        return;
      } else if (offCanvasOrderCreate.classList.contains("show")) {
        // find a way to programatically hide offcanvas.
        // until then, we trigger click event of the close button...
        document.querySelector(".btnCloseOffCanvasOrderCreate").click();
      }
    }
  });

  // we stop propagation for the click event of the below two buttons in order
  // to prevent open product suggestion div from closing when these are clicked.
  btnQuantityDialogCancel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  btnQuantityDialogAdd.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const displayQuantityModal = (el) => {
    const item = new basketItem(
      el.dataset.id,
      el.dataset.brand,
      el.dataset.name,
      el.dataset.image,
      el.dataset.price1,
      el.dataset.price2,
      el.dataset.vat,
      el.dataset.vatpercent,
      el.dataset.code,
      el.dataset.barcode,
      el.dataset.campaignid,
      undefined
    );

    const hdnBasketItem = document.getElementById("hdnBasketItem");
    hdnBasketItem.value = JSON.stringify(item);

    hdnProductId.value = item.id;
    spnProductName.textContent = item.name;

    productQuantityDialog.showModal();
    ddlProductQuantity.focus();
  };

  // document
  //   .getElementById("btnConfirmProductQuantity")
  //   .addEventListener("click", (e) => {
  //     e.preventDefault();
  //     document.querySelector("#frmAcceptProductQuantity").submit();
  //   });

  // form values inside of the dialog element can be received by not
  // listening to form submit event but by listening to dialog close event.
  // https://blog.logrocket.com/using-the-dialog-element/

  productQuantityDialog.addEventListener("close", (e) => {
    if (productQuantityDialog.returnValue === "cancel") {
      hdnProductId.value = "";
      ddlProductQuantity.selectedIndex = 0;
      spnProductName.textContent = "";
      productsSearchTextBox.focus();
    } else if (productQuantityDialog.returnValue === "send") {
      // submit the form
      frmAcceptProductQuantity.submit();

      // convert the hidden textbox value of the basket object into a valid JSON object
      const json = JSON.parse(hdnBasketItem.value);
      let orderedItem = new basketItem(
        Number.parseInt(json.id),
        json.brand,
        json.name,
        json.image,
        Number.parseFloat(json.price1),
        Number.parseFloat(json.price2),
        Number.parseFloat(json.vat),
        Number.parseFloat(json.vatpercent),
        json.code,
        json.barcode,
        json.campaign
      );

      // asign the order quantity
      orderedItem.quantity = Number.parseInt(ddlProductQuantity.value);

      // reset form values
      hdnProductId.value = "";
      ddlProductQuantity.value = "1";
      spnProductName.textContent = "";
      hdnBasketItem.value = "";

      //focus back in the product search textbox
      productsSearchTextBox.focus();

      // update the user basket
      Basket.AddItem(orderedItem);

      // save shekelbasket to local storage
      if (Shekel.Utility.isLocalStorageAvailable) {
        localStorage.setItem("ShekelBasket", JSON.stringify(ShekelBasket));
      }

      // inject a product row into the dom
      drawProductRows();

      // display a confirmation toast for the added product
      document.querySelector(
        ".toast-body"
      ).textContent = `${orderedItem.quantity} adet ${orderedItem.name} sepete eklendi.`;
      const toast = new bootstrap.Toast(document.querySelector(".toast"), {
        animation: false,
        delay: 3000,
      });
      toast.show();
    }
    return false;
  });

  function drawProductRows() {
    ulBasketItems.innerHTML = "";

    const items = ShekelBasket.basketItems;
    items.forEach((item) => {
      ulBasketItems.innerHTML += addProductRow(item, "productRow");
    });

    if (items.length) {
      showAfterBasketHasItems.forEach((el) => el.classList.remove("d-none"));
    } else {
      showAfterBasketHasItems.forEach((el) => el.classList.add("d-none"));
    }

    spanSubTotal.innerText = ShekelBasket.subTotal;
    spanDiscountTotal.innerText = ShekelBasket.discountTotal;
    spanVatTotal.innerText = ShekelBasket.vatTotal;
    spanGrandTotal.innerText = ShekelBasket.grandTotal;
  }

  //*************** ENTER KEYPRESS EVENT **************** */
  document.addEventListener("keypress", (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      // enter keypress event for PRODUCT SUGGESTION SELECTION
      if (!ul.classList.contains("d-none") && !productQuantityDialog.open) {
        // only run this event if ul is visible and if modal is not already open
        displayQuantityModal(e.target);
        return;
      }

      // if the dialog is open, then it means we are entering a quantity
      if (productQuantityDialog.open) {
        if (document.activeElement === ddlProductQuantity) {
          document.querySelector(".btnAddQuantity").click();
        }
        return false;
      }
    }
  });

  // END - LIST SELECTION FOR PRODUCTS IN ORDER CRERATE
  function getPreviousSibling(elem, callback) {
    // Get the next sibling element
    let sibling = elem.previousElementSibling;

    // If there's no callback, return the first sibling
    if (!callback || typeof callback !== "function") return sibling;

    // If the sibling matches our test condition, use it
    // If not, jump to the next sibling and continue the loop
    let liProductIndex = 0;
    while (sibling) {
      if (callback(sibling, liProductIndex, elem)) return sibling;
      liProductIndex++;
      sibling = sibling.previousElementSibling;
    }
  }

  // listen for the keydown event on Product Search textbox (productsSearchTextBox)
  productsSearchTextBox.addEventListener("keyup", function (event) {
    const searchTerm = productsSearchTextBox.value;
    if (searchTerm.length < 3) return;

    // display product suggestions div
    divProductSearchSuggestions.classList.remove("d-none");

    const inputTop = productsSearchTextBox.offsetTop;
    const inputHeight = productsSearchTextBox.offsetHeight;
    divProductSearchSuggestions.style.top = inputTop + inputHeight;

    let results = [];
    let html = "";
    ul.innerHTML = "";
    results = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    results.forEach((p) => {
      html += addProductRow(p, "search");
      ul.insertAdjacentHTML("beforeend", html);
    });
  });

  // we are adding event listener to the container div and use event bubbling to
  // listen for the click event of the ---dynamically created buttons---
  // because the event handler will not be available on the button itself
  ul.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("btnAddToBasket") ||
      e.target.parentElement.classList.contains("btnAddToBasket")
    ) {
      const el = e.target.closest("li");
      displayQuantityModal(el);
    }
  });

  // this function calculates the height of the orders div by calculating height on the other elements on top of this div and then covering the complete visible space of the remaining viewable area.
  const calculateOrdersHeight = () => {
    const distanceFromOrdersToTop =
      window.pageYOffset + ordersDiv.getBoundingClientRect().top;
    ordersDiv.setAttribute(
      "style",
      "height:" +
        (window.innerHeight - distanceFromOrdersToTop) +
        "px; overflow-y: auto; overflow-x:hidden;"
    );
  };

  calculateOrdersHeight(); // resize orders as soon as document loads

  // also resize when window is resized.
  window.addEventListener("resize", (e) => calculateOrdersHeight());

  // this function runs when search input has focus and it displays the suggestions div.
  search.addEventListener("focus", function (e) {
    document.getElementById("divSearch").classList.add("show");
    const inputTop = search.offsetTop - 5;
    const inputHeight = search.offsetHeight;
    searchddl.style.top = inputTop + inputHeight;
    searchddl.classList.toggle("d-none");
  });

  // adds a click event listener to elements outside of the search suggestions div and closes it if the clicked area is outside.
  window.addEventListener("click", (e) => {
    if (e.target.id === "q" || productQuantityDialog.open) return;

    const withinBoundaries = e.composedPath().includes(searchddl);

    if (!withinBoundaries && !searchddl.classList.contains("d-none")) {
      searchddl.classList.add("d-none");
      document.getElementById("divSearch").classList.remove("show");
    }
  });

  const isClickOutsideOf = (el) => {}; // do this function later

  // make Arşivde Ara option visible only if Yeni Arama Yap radio is selected
  const searchTypeRadioButtons = document.querySelectorAll(
    'input[name="searchType"]'
  );

  searchTypeRadioButtons.forEach((rd) => {
    rd.addEventListener("change", () => {
      const chkSearchArchive = document.getElementById(
        "divArchiveSearchCheckbox"
      );

      rd.id === "searchNew"
        ? chkSearchArchive.classList.remove("d-none")
        : chkSearchArchive.classList.add("d-none");
    });

    // ################################ SHARE ORDER ###################################
    const btn = document.querySelector("#btnShareOrder");
    const resultPara = document.querySelector("#errorNotifications");

    // Share must be triggered by "user activation"
    btn.addEventListener("click", async () => {
      try {
        const shareData = {
          title: "MDN",
          text: "Learn web development on MDN!",
          url: "https://developer.mozilla.org",
        };

        await navigator.share(shareData);
        resultPara.textContent = "MDN shared successfully";
      } catch (err) {
        resultPara.textContent = `Error: ${err}`;
      }
    });
  });

  // removing a product completely from basket
  document.getElementById("divBasketItems").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("btnRemoveFromBasket") ||
      e.target.parentElement.classList.contains("btnRemoveFromBasket")
    ) {
      const productId = Number.parseInt(e.target.closest("li").dataset.id);

      Basket.RemoveItem(productId);
      drawProductRows();
    }
  });

  // ORDER DETAILS

  const addProductRow = (product, returnType) => {
    let actionHtml =
      returnType === "search"
        ? `<button class="btnAddToBasket btn btn-circle btn-white ms-auto"><i class="fa fa-plus" ></i></button>`
        : `
    <div class="d-flex align-items-center justify-content-between">
      <a href="#" data-productid="${product.id}" class="btnRemoveFromBasket btn btn-circle btn-white bg-soft-danger">
        <i class="fa fa-trash"></i>
      </a>
      <input type="text" class="form-control form-control-sm" value="${product.quantity}"/>
    </div>`;

    return `<li tabIndex="-1" class="list-group-item mb-2 border-bottom pb-2" data-id="${product.id}" data-brand="${product.brand}" data-name="${product.name}" data-price1="${product.price1}" 
          data-price2="${product.price2}" 
          data-vat="${product.vat}" 
          data-vat-percent="${product.vatpercent}" 
          data-code="${product.code}" 
          data-image="${product.image}"
          data-barcode="4645646465464" data-campaignid="2">
          <div class="d-flex align-items-center justify-content-start">
            <img src="./${product.image}" data-src="./${product.image}" class="me-2" width="60">
            <div class="flex-grow-1">
              <small class="brand">${product.brand}</small> <small class="productcode">${product.code}</small><br/>
              <span class="productname"><strong>${product.name}</strong></span> <br/><span class="price">Toptan: ${product.price1}
              </span> <span class="price">PSF: ${product.price2}</span> <span class="price">KDV: ${product.vat} (%${product.vatpercent})</span>
            </div>
            ${actionHtml}
          </div>
          </td>
        </li>`;
  };

  // adds a click event listener to elements outside of the search suggestions div and closes it if the clicked area is outside.
  document.addEventListener("click", (e) => {
    if (e.target === productQuantityDialog) return;
    if (e.target.id === "productsSearchTextBox") return;
    if (e.target.id === "ddlProductQuantity") return;

    const withinBoundaries = e
      .composedPath()
      .includes(divProductSearchSuggestions);

    if (
      !withinBoundaries &&
      !divProductSearchSuggestions.classList.contains("d-none")
    ) {
      divProductSearchSuggestions.classList.add("d-none");
      //document.getElementById("divSearch").classList.remove("show");
    }
  });

  // when a customer is selected, the tags input disappears and
  // customer name span with a close button appears.
  ddlCustomers.addEventListener("change", () => {
    if (ddlCustomers.options.length) {
      customerSelected();
    } else {
      customerDeSelected();
      resetOrder();
    }
  });

  function customerSelected() {
    const custId = ddlCustomers.value;

    const custName = ddlCustomers.textContent.trim();

    const parent = document.querySelector("#orderCreateDdlCustomersWrapper");
    parent.classList.add("d-none");

    const customerNameWrapper = document.getElementById(
      "orderCreateCustomerNameTitle"
    );

    const h5 = document.createElement("h5");
    h5.classList.add("m-0", "customerHeaderRelated");
    h5.style.display = "inline-block";
    h5.textContent = custName;

    const a = document.createElement("a");
    a.href = "#";
    a.classList.add(
      "btn",
      "btn-circle",
      "btn-white",
      "ms-2",
      "customerHeaderRelated"
    );

    const i = document.createElement("i");
    i.classList.add("fa", "fa-times", "customerHeaderRelated");
    a.appendChild(i);

    customerNameWrapper.append(h5, a);

    // reset the textbox to its default value after a customer is de-selected by clicking on the x icon after it's name
    a.addEventListener("click", () => {
      customerDeSelected();
    });

    // display orderProductSearch div
    divOrderProductSearch.classList.remove("d-none");
  }

  function customerDeSelected() {
    const parent = document.querySelector("#orderCreateDdlCustomersWrapper");

    parent.classList.remove("d-none");

    const customerNameWrapper = document.getElementById(
      "orderCreateCustomerNameTitle"
    );

    customerNameWrapper.innerHTML = "";
    customerNameWrapper.textContent = "";

    divOrderProductSearch.classList.add("d-none");

    let inst = Tags.getInstance(ddlCustomers);
    inst.removeAll();
    ddlCustomers.length = 0;
    console.log("i am trying to re-initialize");
    Tags.init(".tobeTagged");
    console.log("init completed");

    console.log("selecting next sibling of ddlCustomers");
    ddlCustomers.nextSibling.querySelector("input").focus();
  }

  function resetOrder() {
    // clear product rows
    ulBasketItems.innerHTML = "";

    // clear text of summary table & set classes to d-none for those who should not be visible
    spanSubTotal.innerText = "";
    spanDiscountTotal.innerText = "";
    spanVatTotal.innerText = "";
    spanGrandTotal.innerText = "";
    showAfterBasketHasItems.forEach((el) => el.classList.add("d-none"));

    // clear localStorage
    localStorage.clear();

    // clear ShekelBasket
    Basket.Clear = [];
    ShekelBasket.basketItems = [];
  }

  // const showProductPhotos = () => {
  //   const suggestionsDiv = document.getElementById(
  //     "divProductSearchSuggestions"
  //   );

  //   const images = suggestionsDiv.querySelectorAll("img");

  //   if (!Shekel.Utility.isMobile()) {
  //     for (let image of images) {
  //       const src = image.dataset.src;
  //       image.setAttribute("src", src);
  //     }
  //   }
  // };

  // addEventListener("resize", (event) => {
  //   showProductPhotos();
  // });

  // showProductPhotos();

  // ##### development mockup data -- delete later.
  const order = `<div class="row order">
               <div class="col-10">
                 <div class="order p-2">
                   <div class="form-check form-check-inline order-no">
                     <input
                       type="checkbox"
                       value="false"
                       class="form-check-input"
                       name="order-2234"
                       id="order-2234"
                     />
                     <label for="order-2234">#2234</label>
                   </div>
                   <span class="order-customer-span">
                     <strong>
                       <a href="#" class="">Yusuf Tandoğan Girne Eczanesi (Girne)</a>
                     </strong>
                     <span class="order-datetime d-inline d-md-none"><time datetime="2022-08-06T10:32">28.08 @ 10:32</time></span>
                     <span class="d-none d-md-inline"
                       > --  Toplam <strong>4</strong> kalem<strong>32</strong> parça
                       ve<strong> ₺123.45</strong></span
                     >
                   </span>
                   <div class="tags">
                     <!-- -- kanal -->
                     <span
                       class="badge bg-soft-secondary "
                       title="Sipariş Kanalı"
                       >#POS</span
                     >
                     <!-- -- siparisi alan -->
                     <span
                       class="badge bg-soft-info"
                       title="Siparişi Alan"
                     >
                       <a href="#" class="badge-link"
                         ><i class="bx bxs-user"></i> İrfan Demirkıran</a
                       >
                     </span>
                     <!-- -- durum bilgisi -->
                     <span class="badge bg-soft-secondary ">
                       <a href="#" class="badge-link "
                         ><i class="fa fa-circle-small"></i> Alındı - İşlem
                         Görmedi</a
                       >
                     </span>
                     <!-- -- odeme bilgisi -->
                     <span
                       class="badge bg-soft-secondary "
                       title="Ödeme Bilgisi"
                       >kredi kartı - ödendi</span
                     >
                   </div>
                 </div>
               </div>
               <div class="col-2 d-flex align-items-center justify-content-end">
                 <div class="p-2">
                   <span class="order-datetime me-4 d-none d-md-inline"><time datetime="2022-08-06T10:32">28 Agu</time></span>
                   <a href="#" class="btn btn-circle btn-white btnOrderDetail">
                     <i class="fa fa-chevron-right"></i>
                   </a>
                 </div>
               </div>
             </div><hr/>`;

  for (var i = 1; i <= 50; i++) {
    ordersDiv.innerHTML += order;
  }

  // ##### ORDER ITEM
  const orderItem = `<tr>
  <td class="d-none d-md-table-cell"><img src="" data-src="{{image}}"></td>
  <td class="d-none d-md-table-cell">{{brandabbrv}}</td>
  <td>{{name}}</td>
  <td>{{price1}}</td>
  <td>{{vat}}</td>
  <td>{{price2}}</td>
  <td>{{campaign}}</td>
  <td>
    <div class="quantityWrapper float-end">
      <div class="b-0 p-0 m-0 border d-flex">
        <div class="text-danger d-flex align-items-center p-2">{{stock}}</div>
        <button class="btn qtyChange decrement" type="button">-</button>
        <input type="text" class="form-control qty" value="{{quantity}}" autocomplete="off">
        <button class="btn qtyChange increment" type="button">+</button>
        <button class="btn addtocart" type="button" data-id="{{id}}" ><i class="fa-solid fa-cart-plus"></i></button>
      </div>
    </div>
  </td>
</tr>`;
});
