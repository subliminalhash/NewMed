document.addEventListener("DOMContentLoaded", function (event) {
  /*!
   * Get previous sibling of an element that matches a test condition
   * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}     elem     The element
   * @param  {Function} callback The test condition
   * @return {Node}              The sibling
   */
  function getPreviousSibling(elem, callback) {
    // Get the next sibling element
    let sibling = elem.previousElementSibling;

    // If there's no callback, return the first sibling
    if (!callback || typeof callback !== "function") return sibling;

    // If the sibling matches our test condition, use it
    // If not, jump to the next sibling and continue the loop
    let index = 0;
    while (sibling) {
      if (callback(sibling, index, elem)) return sibling;
      index++;
      sibling = sibling.previousElementSibling;
    }
  }

  // listen for the keydown event
  window.addEventListener("keydown", function (event) {
    // if current cursor is not in txtSearchProducts textbox, then stop code execution.
    if (
      !document.activeElement ===
      this.document.getElementById("txtSearchProducts")
    )
      return;

    // else, if we are pressing ALT + Numped Add, focus the qty input textbox so we can start typing immediately.
    if (event.altKey && event.code === "NumpadAdd") {
      event.preventDefault();
      const qtyInput = document.querySelectorAll(".qty")[0];
      qtyInput.focus();
    }
  });

  window.addEventListener("keydown", function (event) {
    if (event.altKey && event.code === "NumpadEnter") {
      event.preventDefault();

      const addToCart = document.querySelectorAll(".addtocart")[0];
      addToCart.click();
    }
  });

  const product = {};

  const addToCartButtons = document.querySelectorAll(".addtocart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const qtyInput = getPreviousSibling(btn, (sibling) =>
        sibling.matches(".qty")
      );
      createOrderItem({
        id: btn.dataset.productid,
        name: btn.dataset.productname,
        price1: btn.dataset.price1,
        price2: btn.dataset.price2,
        vat: btn.dataset.vat,
        campaign: btn.dataset.campaign,
        image: btn.dataset.imgsrc,
        brand: btn.dataset.brand,
        brandabbrv: btn.dataset.brandabbrv,
        qty: qtyInput.value,
      });
    });
  });

  const createOrderItem = (product) => {
    let html = `${orderItem}`;

    html = html.replaceAll("{{productid}}", product.id);
    html = html.replaceAll("{{name}}", product.name);
    html = html.replaceAll("{{price1}}", product.price1);
    html = html.replaceAll("{{price2}}", product.price2);
    html = html.replaceAll("{{vat}}", product.vat);
    html = html.replaceAll("{{image}}", product.image);
    html = html.replaceAll("{{brand}}", product.brand);
    html = html.replaceAll("{{brandabbrv}}", product.brandabbrv);
    html = html.replaceAll("{{qty}}", product.qty);
    html = html.replaceAll(
      "{{campaign}}",
      product.campaign === "-" ? "-" : product.campaign
    );

    document.getElementById("tblItemsBody").innerHTML = html;
  };

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
    if (e.target.id === "q") return;

    const withinBoundaries = e.composedPath().includes(searchddl);

    if (!withinBoundaries && !searchddl.classList.contains("d-none")) {
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
      console.log(rd.id);
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
  // when product search input gains focus, display product suggestions if length is more than 2 chars
  const productSearchSuggestionsDiv = document.getElementById(
    "divProductSearchSuggestions"
  );
  const productSearchSuggestionsInput =
    document.getElementById("txtSearchProducts");
  productSearchSuggestionsInput.addEventListener("keyup", () => {
    console.log(productSearchSuggestionsInput.value.length);
    if (productSearchSuggestionsInput.value.trim().length < 2) return;

    productSearchSuggestionsDiv.classList.remove("d-none");
    const inputTop = productSearchSuggestionsInput.offsetTop;
    const inputHeight = productSearchSuggestionsInput.offsetHeight;
    productSearchSuggestionsDiv.style.top = inputTop + inputHeight;
  });

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
    document.getElementById("txtSearchProducts").focus();

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

  const showProductPhotos = () => {
    const suggestionsDiv = document.getElementById(
      "divProductSearchSuggestions"
    );

    const images = suggestionsDiv.querySelectorAll("img");

    if (!Shekel.Utility.isMobile()) {
      for (let image of images) {
        const src = image.dataset.src;
        image.setAttribute("src", src);
      }
    }
  };

  addEventListener("resize", (event) => {
    showProductPhotos();
  });

  showProductPhotos();

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

  for (var i = 1; i <= 100; i++) {
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
