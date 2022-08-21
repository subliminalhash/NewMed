document.addEventListener("DOMContentLoaded", function (event) {
  // variables for enabling up/down arrow keys for product selection
  // in the product suggestions div in order create offcanvas
  const ul = document.getElementById("ulProductSuggestions");
  const productQuantityDialog = document.getElementById(
    "dialogProductQuantity"
  );
  const productSearchSuggestionsDiv = document.getElementById(
    "divProductSearchSuggestions"
  );
  const ddlProductQuantity = document.getElementById("ddlProductQuantity");

  let liSelectedProductSuggestion;
  let liProductIndex = -1;
  let next;

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

  productQuantityDialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (productQuantityDialog.open) {
        document.querySelector(".btnCloseWithEscape").click();
        return false;
      }
    }
  });

  const displayQuantityModal = (el) => {
    const productId = el.dataset.productid,
      name = el.dataset.productname;

    document.getElementById("hdnProductId").value = productId;
    document.getElementById("productNameSpan").textContent = name;

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
    //event.preventDefault();
    //closeQuantityModal("submit");

    console.log(productQuantityDialog.returnValue);
    if (productQuantityDialog.returnValue === "cancel") {
      document.getElementById("hdnProductId").value = "";
      ddlProductQuantity.selectedIndex = 0;
      document.getElementById("productNameSpan").textContent = "";
      document.getElementById("txtSearchProducts").focus();
    } else if (productQuantityDialog.returnValue === "send") {
      // submit the form
      document.getElementById("frmAcceptProductQuantity").submit();

      // al bu bilgiyi ne yaparsan yap
      const productId = document.getElementById("hdnProductId").value;
      const orderQty = document.getElementById("ddlProductQuantity").value;
      const name = document.getElementById("productNameSpan").textContent;

      // reset values
      document.getElementById("hdnProductId").value = "";
      ddlProductQuantity.value = "1";
      document.getElementById("productNameSpan").textContent = "";

      //focus back in the product search textbox

      document.getElementById("txtSearchProducts").focus();

      // inject a product row into the dom
      //**
      //** Code goes here
      //**

      // display a toast for the added product
      document.querySelector(
        ".toast-body"
      ).textContent = `${orderQty} adet ${name} sepete eklendi.`;
      const toast = new bootstrap.Toast(document.querySelector(".toast"), {
        animation: false,
        delay: 3000,
      });
      toast.show();
    } else {
      console.error(`other: ${productQuantityDialog.returnValue}`);
    }
    return false;
  });

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

  // listen for the keydown event on Product Search textbox (txtSearchProducts)
  txtSearchProducts.addEventListener("keyup", function (event) {
    const searchTerm = document.getElementById("txtSearchProducts").value;
    if (searchTerm.length < 3) return;

    productSearchSuggestionsDiv.classList.remove("d-none");
    const inputTop = txtSearchProducts.offsetTop;
    const inputHeight = txtSearchProducts.offsetHeight;
    productSearchSuggestionsDiv.style.top = inputTop + inputHeight;

    let results = [];
    let html = "";
    ul.innerHTML = "";
    results = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    results.forEach((p) => {
      html += `<li tabIndex="-1" class="list-group-item" data-productid="${
        p.pid
      }" data-brand="${p.brandname}" data-productname="${
        p.name
      }" data-price1="${p.price1 / 100}" 
            data-price2="${p.price2 / 100}" 
            data-vat="${p.vat}" 
            data-vat-percent="${p.vatpercent}" 
            data-productcode="${p.code}" 
            data-barcode="4645646465464" data-campaignid="2">
            <div class="d-flex align-items-center justify-content-start">
              <img src="./${p.image}" data-src="./${
        p.image
      }" class="me-2" width="60">
              <div>
                <small class="brand">${
                  p.brandname
                }</small> <small class="productcode">${p.code}</small><br/>
                <span class="productname"><strong>${
                  p.name
                }</strong></span> <br/><span class="price">Toptan: ${
        p.price1 / 100
      }
                </span> <span class="price">PSF: ${
                  p.price2 / 100
                }</span> <span class="price">KDV: ${p.vat / 100} (%${
        p.vatpercent
      })</span>
              </div>
              <button class="btnAddToBasket btn btn-circle btn-white ms-auto"><i class="fa fa-plus" ></i></button>
            </div>
            </td>
          </li>`;
      ul.innerHTML = html;
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

  const product = {};

  const search = document.getElementById("q");
  const searchddl = document.getElementById("divSearchSuggestionsWrapper");
  const ordersDiv = document.querySelector(".orders");

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
    console.log(productQuantityDialog.open);
    if (e.target.id === "q" || productQuantityDialog.open) return;

    const withinBoundaries = e.composedPath().includes(searchddl);

    if (!withinBoundaries && !searchddl.classList.contains("d-none")) {
      console.log("closing");
      searchddl.classList.add("d-none");
      document.getElementById("divSearch").classList.remove("show");
    }
  });

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

  // ORDER DETAILS

  // adds a click event listener to elements outside of the search suggestions div and closes it if the clicked area is outside.
  window.addEventListener("click", (e) => {
    if (e.target.id === "txtSearchProducts") return;

    const withinBoundaries = e
      .composedPath()
      .includes(productSearchSuggestionsDiv);

    if (
      !withinBoundaries &&
      !productSearchSuggestionsDiv.classList.contains("d-none")
    ) {
      productSearchSuggestionsDiv.classList.add("d-none");
      //document.getElementById("divSearch").classList.remove("show");
    }
  });

  // ***************** ORDER CREATE *******************
  const ddlCustomers = document.getElementById("ddlCustomers");
  const ddlCustomersWrapper = document.getElementById(
    "orderCreateSelectCustomer"
  );

  ddlCustomers.addEventListener("change", () => {
    const custId = ddlCustomers.value;
    const custName = ddlCustomers.textContent.trim();

    const parent = document.querySelector("#orderCreateDdlCustomersWrapper");
    parent.classList.add("d-none");

    const customerNameWrapper = document.getElementById(
      "orderCreateCustomerNameTitle"
    );

    const h5 = document.createElement("h5");
    h5.classList.add("m-0");
    h5.style.display = "inline-block";
    h5.textContent = custName;

    const a = document.createElement("a");
    a.href = "#";
    a.classList.add("btn", "btn-circle", "btn-white", "ms-2");

    const i = document.createElement("i");
    i.classList.add("fa", "fa-times");
    a.appendChild(i);

    customerNameWrapper.append(h5, a);

    // reset the textbox to its default value after a customer is de-selected by clicking on the x icon after it's name
    a.addEventListener("click", () => {
      a.remove();
      h5.remove();
      parent.classList.remove("d-none");
      document.getElementById("ddlCustomers").options.length = 0;
      document.querySelector(".bg-customer-selection-badge").remove();
      document.getElementById("txtSearchProducts").focus();
    });
  });

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
        <input type="text" class="form-control qty" value="{{qty}}" autocomplete="off">
        <button class="btn qtyChange increment" type="button">+</button>
        <button class="btn addtocart" type="button" data-productid="{{productid}}" ><i class="fa-solid fa-cart-plus"></i></button>
      </div>
    </div>
  </td>
</tr>`;
});
