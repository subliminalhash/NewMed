document.addEventListener("DOMContentLoaded", function (event) {
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
  });

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
});
