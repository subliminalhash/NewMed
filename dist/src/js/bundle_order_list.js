/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/js/Tags.js":
/*!************************!*\
  !*** ./src/js/Tags.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Bootstrap 5 (and 4!) tags
 * https://github.com/lekoala/bootstrap5-tags
 * Turns your select[multiple] into nice tags lists
 *
 * Required Bootstrap 5 styles:
 * - badge
 * - background-color utility
 * - margin-end utility
 * - float-start utility
 * - forms
 * - dropdown
 */

const ACTIVE_CLASS = "is-active";
const ACTIVE_CLASSES = ["is-active", "bg-primary", "text-white"];
const VALUE_ATTRIBUTE = "data-value";

// Static map will minify very badly as class prop, so we use an external constant
const INSTANCE_MAP = new WeakMap();

class Tags {
  /**
   * @param {HTMLSelectElement} el
   * @param {Object} globalOpts
   */
  constructor(el, globalOpts = {}) {
    // Hide the select element and register a tags attr
    el.style.display = "none";
    INSTANCE_MAP.set(el, this);
    this._selectElement = el;

    // Allow 1/0, true/false as strings
    const parseBool = (value) =>
      ["true", "false", "1", "0", true, false].includes(value) &&
      !!JSON.parse(value);

    // Handle options, using global settings first and data attr override
    const opts = { ...globalOpts, ...el.dataset };
    this.allowNew = opts.allowNew ? parseBool(opts.allowNew) : false;
    this.showAllSuggestions = opts.showAllSuggestions
      ? parseBool(opts.showAllSuggestions)
      : false;
    this.badgeStyle = opts.badgeStyle || "primary";
    this.allowClear = opts.allowClear ? parseBool(opts.allowClear) : false;
    this.clearEnd = opts.clearEnd ? parseBool(opts.clearEnd) : false;
    this.server = opts.server || false;
    this.liveServer = opts.liveServer ? parseBool(opts.liveServer) : false;
    this.serverParams = opts.serverParams || {};
    if (typeof this.serverParams == "string") {
      this.serverParams = JSON.parse(this.serverParams);
    }
    this.selected = opts.selected ? opts.selected.split(",") : [];
    this.suggestionsThreshold =
      typeof opts.suggestionsThreshold != "undefined"
        ? parseInt(opts.suggestionsThreshold)
        : 1;
    this.validationRegex = opts.regex || "";
    this.separator = opts.separator ? opts.separator.split("|") : [];
    this.max = opts.max ? parseInt(opts.max) : null;
    this.clearLabel = opts.clearLabel || "Clear";
    this.searchLabel = opts.searchLabel || "Type a value";
    this.valueField = opts.valueField || "value";
    this.labelField = opts.labelField || "label";
    this.keepOpen = opts.keepOpen ? parseBool(opts.keepOpen) : false;
    this.fullWidth = opts.fullWidth ? parseBool(opts.fullWidth) : false;
    this.debounceTime = opts.debounceTime ? parseInt(opts.debounceTime) : 300;
    this.baseClass = opts.baseClass || "";

    this.placeholder = opts.placeholder || this._getPlaceholder();
    this._keyboardNavigation = false;
    this._fireEvents = true;
    this._searchFunc = Tags.debounce(() => {
      this._loadFromServer(true);
    }, this.debounceTime);

    this.overflowParent = null;
    this.parentForm = el.parentElement;
    while (this.parentForm) {
      if (this.parentForm.style.overflow === "hidden") {
        this.overflowParent = this.parentForm;
      }
      this.parentForm = this.parentForm.parentElement;
      if (this.parentForm && this.parentForm.nodeName == "FORM") {
        break;
      }
    }
    this.reset = this.reset.bind(this);
    if (this.parentForm) {
      this.parentForm.addEventListener("reset", this.reset);
    }

    // Create elements
    this._holderElement = document.createElement("div"); // this is the one holding the fake input and the dropmenu
    this._containerElement = document.createElement("div"); // this is the one for the fake input (labels + input)
    this._dropElement = document.createElement("ul");
    this._searchInput = document.createElement("input");

    this._holderElement.appendChild(this._containerElement);
    this._containerElement.appendChild(this._searchInput);
    this._holderElement.appendChild(this._dropElement);
    // insert after select
    this._selectElement.parentNode.insertBefore(
      this._holderElement,
      this._selectElement.nextSibling
    );

    // Configure them
    this._configureHolderElement();
    this._configureDropElement();
    this._configureContainerElement();
    this._configureSearchInput();
    this.resetState();

    if (this.server && !this.liveServer) {
      this._loadFromServer();
    } else {
      this.resetSuggestions();
    }
  }

  /**
   * Attach to all elements matched by the selector
   * @param {string} selector
   * @param {Object} opts
   */
  static init(selector = "select[multiple]", opts = {}) {
    let list = document.querySelectorAll(selector);
    for (let i = 0; i < list.length; i++) {
      if (Tags.getInstance(list[i])) {
        continue;
      }
      new Tags(list[i], opts);
    }
  }

  /**
   * @param {HTMLSelectElement} el
   */
  static getInstance(el) {
    if (INSTANCE_MAP.has(el)) {
      return INSTANCE_MAP.get(el);
    }
  }

  /**
   * @param {Function} func
   * @param {number} timeout
   * @returns {Function}
   */
  static debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  dispose() {
    INSTANCE_MAP.delete(this._selectElement);
    this._selectElement.style.display = "block";
    this._holderElement.parentNode.removeChild(this._holderElement);
    if (this.parentForm) {
      this.parentForm.removeEventListener("reset", this.reset);
    }
  }

  resetState() {
    if (this.isDisabled()) {
      this._holderElement.setAttribute("readonly", "");
      this._searchInput.setAttribute("disabled", "");
    } else {
      if (this._holderElement.hasAttribute("readonly")) {
        this._holderElement.removeAttribute("readonly");
      }
      if (this._searchInput.hasAttribute("disabled")) {
        this._searchInput.removeAttribute("disabled");
      }
    }
  }

  resetSuggestions() {
    let suggestions = Array.from(this._selectElement.querySelectorAll("option"))
      .filter((option) => {
        return !option.disabled;
      })
      .map((option) => {
        return {
          value: option.getAttribute("value"),
          label: option.textContent,
        };
      });
    this._buildSuggestions(suggestions);
  }

  /**
   * @param {boolean} show
   */
  _loadFromServer(show = false) {
    if (this._abortController) {
      this._abortController.abort();
    }
    this._abortController = new AbortController();

    this.serverParams.query = this._searchInput.value;
    const params = new URLSearchParams(this.serverParams).toString();

    fetch(this.server + "?" + params, { signal: this._abortController.signal })
      .then((r) => r.json())
      .then((suggestions) => {
        let data = suggestions.data || suggestions;
        this._buildSuggestions(data);
        this._abortController = null;
        if (show) {
          this._showSuggestions();
        }
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          return;
        }
        console.error(e);
      });
  }

  /**
   * @returns {string}
   */
  _getPlaceholder() {
    // Use placeholder and data-placeholder in priority
    if (this._selectElement.hasAttribute("placeholder")) {
      return this._selectElement.getAttribute("placeholder");
    }
    if (this._selectElement.dataset.placeholder) {
      return this._selectElement.dataset.placeholder;
    }
    // Fallback to first option if no value
    let firstOption = this._selectElement.querySelector("option");
    if (!firstOption) {
      return "";
    }
    if (firstOption.hasAttribute("selected")) {
      firstOption.removeAttribute("selected");
    }
    return !firstOption.value ? firstOption.textContent : "";
  }

  _configureDropElement() {
    this._dropElement.classList.add(...["dropdown-menu", "p-0"]);
    this._dropElement.style.maxHeight = "280px";
    if (!this.fullWidth) {
      this._dropElement.style.maxWidth = "360px";
    }
    this._dropElement.style.overflowY = "auto";

    // If the mouse was outside, entering remove keyboard nav mode
    this._dropElement.addEventListener("mouseenter", (event) => {
      this._keyboardNavigation = false;
    });
  }

  _configureHolderElement() {
    this._holderElement.classList.add(...["form-control", "dropdown"]);
    if (this._selectElement.classList.contains("form-select-lg")) {
      this._holderElement.classList.add("form-control-lg");
    }
    if (this._selectElement.classList.contains("form-select-sm")) {
      this._holderElement.classList.add("form-control-sm");
    }
    // If we don't have an overflow parent, we can simply inherit styles
    // If we have an overflow parent, it needs a relatively positioned element
    if (this.overflowParent) {
      this._holderElement.style.position = "inherit";
    }
    if (this._getBootstrapVersion() === 4) {
      // Prevent fixed height due to form-control
      this._holderElement.style.height = "auto";
    }
  }

  _configureContainerElement() {
    this._containerElement.addEventListener("click", (event) => {
      if (this.isDisabled()) {
        return;
      }
      if (this._searchInput.style.visibility != "hidden") {
        this._searchInput.focus();
      }
    });

    // add initial values
    // we use selectedOptions because single select can have a selected option
    // without a selected attribute if it's the first value
    let initialValues = this._selectElement.selectedOptions;
    for (let j = 0; j < initialValues.length; j++) {
      let initialValue = initialValues[j];
      if (!initialValue.value) {
        continue;
      }
      // track initial values for reset
      initialValue.dataset.init = 1;
      this.addItem(initialValue.textContent, initialValue.value);
    }
  }

  _configureSearchInput() {
    this._searchInput.type = "text";
    this._searchInput.autocomplete = "off";
    this._searchInput.spellcheck = false;
    this._searchInput.style.backgroundColor = "transparent";
    this._searchInput.style.border = 0;
    this._searchInput.style.outline = 0;
    this._searchInput.style.maxWidth = "100%";
    this._searchInput.ariaLabel = this.searchLabel;
    this._resetSearchInput(true);

    this._searchInput.addEventListener("input", (event) => {
      // Add item if a separator is used
      // On mobile or copy paste, it can pass multiple chars (eg: when pressing space and it formats the string)
      if (event.data) {
        const lastChar = event.data.slice(-1);
        if (
          this.separator.length &&
          this._searchInput.value &&
          this.separator.includes(lastChar)
        ) {
          // Remove separator even if adding is prevented
          this._searchInput.value = this._searchInput.value.slice(0, -1);
          let text = this._searchInput.value;
          this._add(text, null);
          return;
        }
      }

      // Adjust input width to current content
      this._adjustWidth();

      // Check if we should display suggestions
      if (this._searchInput.value.length >= this.suggestionsThreshold) {
        if (this.liveServer) {
          this._searchFunc();
        } else {
          this._showSuggestions();
        }
      } else {
        this._hideSuggestions();
      }
    });
    this._searchInput.addEventListener("focus", (event) => {
      if (this._searchInput.value.length >= this.suggestionsThreshold) {
        this._showSuggestions();
      }
    });
    this._searchInput.addEventListener("focusout", (event) => {
      this._hideSuggestions();
      if (this.keepOpen) {
        this._resetSearchInput();
      }
    });
    // keypress doesn't send arrow keys, so we use keydown
    this._searchInput.addEventListener("keydown", (event) => {
      // Keycode reference : https://css-tricks.com/snippets/javascript/javascript-keycodes/
      let key = event.keyCode || event.key;

      // Keyboard keys
      switch (key) {
        case 13:
        case "Enter":
          event.preventDefault();
          let selection = this.getActiveSelection();
          if (selection) {
            selection.click();
          } else {
            // We use what is typed if not selected and not empty
            if (this.allowNew && this._searchInput.value) {
              let text = this._searchInput.value;
              this._add(text, null);
            }
          }
          break;
        case 38:
        case "ArrowUp":
          event.preventDefault();
          this._keyboardNavigation = true;
          let newSelection = this._moveSelectionUp();
          // If we use arrow up without input and there is no new selection, hide suggestions
          if (
            this._searchInput.value.length == 0 &&
            this._dropElement.classList.contains("show") &&
            !newSelection
          ) {
            this._hideSuggestions();
          }
          break;
        case 40:
        case "ArrowDown":
          event.preventDefault();
          this._keyboardNavigation = true;
          this._moveSelectionDown();
          // If we use arrow down without input, show suggestions
          if (
            this._searchInput.value.length == 0 &&
            !this._dropElement.classList.contains("show")
          ) {
            this._showSuggestions();
          }
          break;
        case 8:
        case "Backspace":
          if (this._searchInput.value.length == 0) {
            this.removeLastItem();
            this._adjustWidth();
            this._hideSuggestions();
          }
          break;
        case 27:
        case "Escape":
          // We may wish to not use the suggestions
          this._hideSuggestions();
          break;
      }
    });
  }

  /**
   * @param {string} text
   * @param {string} value
   * @param {object} data
   */
  _add(text, value = null, data = {}) {
    if (!this.canAdd(text, value)) {
      return;
    }
    this.addItem(text, value, data);
    if (this.keepOpen) {
      this._showSuggestions();
    } else {
      this._resetSearchInput();
    }
  }

  /**
   * @returns {HTMLElement}
   */
  _moveSelectionUp() {
    let active = this.getActiveSelection();
    if (active) {
      let prev = active.parentNode;
      do {
        prev = prev.previousSibling;
      } while (prev && prev.style.display == "none");
      if (!prev) {
        return null;
      }
      active.classList.remove(...ACTIVE_CLASSES);
      prev.querySelector("a").classList.add(...ACTIVE_CLASSES);
      // Don't use scrollIntoView as it scrolls the whole window
      prev.parentNode.scrollTop = prev.offsetTop - prev.parentNode.offsetTop;
      return prev;
    }
    return null;
  }

  /**
   * @returns {HTMLElement}
   */
  _moveSelectionDown() {
    let active = this.getActiveSelection();
    let next = null;
    if (active) {
      next = active.parentNode;
      do {
        next = next.nextSibling;
      } while (next && next.style.display == "none");
      if (!next) {
        return null;
      }
      active.classList.remove(...ACTIVE_CLASSES);
      next.querySelector("a").classList.add(...ACTIVE_CLASSES);
      // This is the equivalent of scrollIntoView(false) but only for parent node
      if (next.offsetTop > next.parentNode.offsetHeight - next.offsetHeight) {
        next.parentNode.scrollTop += next.offsetHeight;
      }
      return next;
    }
    return next;
  }

  /**
   * @param {string} text
   * @param {string} size
   * @returns {Number}
   */
  _calcTextWidth(text, size = null) {
    var span = document.createElement("span");
    document.body.appendChild(span);
    span.style.fontSize = size || "inherit";
    span.style.height = "auto";
    span.style.width = "auto";
    span.style.position = "absolute";
    span.style.whiteSpace = "no-wrap";
    span.innerHTML = text;
    const width = Math.ceil(span.clientWidth) + 8;
    document.body.removeChild(span);
    return width;
  }

  /**
   * Adjust the field to fit its content and show/hide placeholder if needed
   */
  _adjustWidth() {
    if (this._searchInput.value) {
      this._searchInput.size = this._searchInput.value.length;
    } else {
      // Show the placeholder only if empty
      if (this.getSelectedValues().length) {
        this._searchInput.placeholder = "";
        this._searchInput.size = 1;
      } else {
        this._searchInput.size =
          this.placeholder.length > 0 ? this.placeholder.length : 1;
        this._searchInput.placeholder = this.placeholder;
      }
    }

    // If the string contains ascii chars or strange font, input size may be wrong
    const v = this._searchInput.value || this._searchInput.placeholder;
    const computedFontSize = window.getComputedStyle(
      this._holderElement
    ).fontSize;
    const w = this._calcTextWidth(v, computedFontSize);
    this._searchInput.style.minWidth = w + "px";
  }

  /**
   * Add suggestions to the drop element
   * @param {array} suggestions
   */
  _buildSuggestions(suggestions) {
    while (this._dropElement.lastChild) {
      this._dropElement.removeChild(this._dropElement.lastChild);
    }
    for (let i = 0; i < suggestions.length; i++) {
      let suggestion = suggestions[i];
      if (!suggestion[this.valueField]) {
        continue;
      }

      // initial selection
      if (
        suggestion.selected ||
        this.selected.includes(suggestion[this.valueField])
      ) {
        this._add(
          suggestion[this.labelField],
          suggestion[this.valueField],
          suggestion.data
        );
        continue; // no need to add as suggestion
      }

      let newChild = document.createElement("li");
      let newChildLink = document.createElement("a");
      newChild.append(newChildLink);
      newChildLink.classList.add(...["dropdown-item", "text-truncate"]);
      newChildLink.setAttribute(VALUE_ATTRIBUTE, suggestion[this.valueField]);
      newChildLink.setAttribute("href", "#");
      newChildLink.textContent = suggestion[this.labelField];
      if (suggestion.data) {
        for (const [key, value] of Object.entries(suggestion.data)) {
          newChildLink.dataset[key] = value;
        }
      }
      this._dropElement.appendChild(newChild);

      // Hover sets active item
      newChildLink.addEventListener("mouseenter", (event) => {
        // Don't trigger enter if using arrows
        if (this._keyboardNavigation) {
          return;
        }
        this.removeActiveSelection();
        newChild.querySelector("a").classList.add(...ACTIVE_CLASSES);
      });
      // Moving the mouse means no longer using keyboard
      newChildLink.addEventListener("mousemove", (event) => {
        this._keyboardNavigation = false;
      });

      newChildLink.addEventListener("mousedown", (event) => {
        // Otherwise searchInput would lose focus and close the menu
        event.preventDefault();
      });
      newChildLink.addEventListener("click", (event) => {
        event.preventDefault();
        this._add(
          newChildLink.textContent,
          newChildLink.getAttribute(VALUE_ATTRIBUTE),
          newChildLink.dataset
        );
      });
    }
  }

  reset() {
    this.removeAll();

    // Reset doesn't fire change event
    this._fireEvents = false;
    let initialValues =
      this._selectElement.querySelectorAll("option[data-init]");
    for (let j = 0; j < initialValues.length; j++) {
      let initialValue = initialValues[j];
      this.addItem(initialValue.textContent, initialValue.value);
    }
    this._adjustWidth();
    this._fireEvents = true;
  }

  /**
   * @param {bool} init Pass true during init
   */
  _resetSearchInput(init = false) {
    this._searchInput.value = "";
    this._adjustWidth();

    if (!init) {
      this._hideSuggestions();
      // Trigger input even to show suggestions if needed
      this._searchInput.dispatchEvent(new Event("input"));
    }

    // We use visibility instead of display to keep layout intact
    if (this.max && this.getSelectedValues().length >= this.max) {
      this._searchInput.style.visibility = "hidden";
    } else if (this._searchInput.style.visibility == "hidden") {
      this._searchInput.style.visibility = "visible";
    }

    if (this.isSingle() && !init) {
      document.activeElement.blur();
    }
  }

  /**
   * @returns {array}
   */
  getSelectedValues() {
    // option[selected] is used rather that selectedOptions as it works more consistently
    let selected = this._selectElement.querySelectorAll("option[selected]");
    return Array.from(selected).map((el) => el.value);
  }

  /**
   * The element create with buildSuggestions
   */
  _showSuggestions() {
    if (this._searchInput.style.visibility == "hidden") {
      return;
    }

    // Get search value
    let search = this._searchInput.value.toLocaleLowerCase();

    // Get current values
    let values = this.getSelectedValues();

    // Filter the list according to search string
    let list = this._dropElement.querySelectorAll("li");
    let found = false;
    let firstItem = null;
    let hasPossibleValues = false;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      let text = item.textContent.toLocaleLowerCase();
      let link = item.querySelector("a");

      // Remove previous selection
      link.classList.remove(...ACTIVE_CLASSES);

      // Hide selected values
      if (values.indexOf(link.getAttribute(VALUE_ATTRIBUTE)) != -1) {
        item.style.display = "none";
        continue;
      }

      hasPossibleValues = true;

      // Check search length since we can trigger dropdown with arrow
      let isMatched = search.length === 0 || text.indexOf(search) !== -1;
      if (
        this.showAllSuggestions ||
        this.suggestionsThreshold === 0 ||
        isMatched
      ) {
        item.style.display = "list-item";
        found = true;
        if (!firstItem && isMatched) {
          firstItem = item;
        }
      } else {
        item.style.display = "none";
      }
    }

    if (firstItem || this.showAllSuggestions) {
      this._holderElement.classList.remove("is-invalid");
      // Always select first item
      if (firstItem) {
        firstItem.querySelector("a").classList.add(...ACTIVE_CLASSES);
        firstItem.parentNode.scrollTop = firstItem.offsetTop;
      }
    } else {
      // No item and we don't allow new items => error
      if (!this.allowNew && !(search.length === 0 && !hasPossibleValues)) {
        this._holderElement.classList.add("is-invalid");
      } else if (this.validationRegex && this.isInvalid()) {
        this._holderElement.classList.remove("is-invalid");
      }
    }

    // Remove dropdown if not found or to show validation message
    if (!found || this.isInvalid()) {
      this._dropElement.classList.remove("show");
    } else {
      // Or show it if necessary
      this._dropElement.classList.add("show");

      if (this.fullWidth) {
        // Use full input width
        this._dropElement.style.left = -1 + "px";
        this._dropElement.style.width = this._holderElement.offsetWidth + "px";
      } else {
        // Position next to search input
        let left = this._searchInput.offsetLeft;

        // Overflow right
        const w = document.body.offsetWidth - 1; // avoid rounding issues
        const scrollbarOffset = 30; // scrollbars are not taken into account
        const wdiff =
          w - (left + this._dropElement.offsetWidth) - scrollbarOffset;

        // If the dropdowns goes out of the viewport, remove the diff from the left position
        if (wdiff < 0) {
          left = left + wdiff;
        }
        this._dropElement.style.left = left + "px";

        // Overflow bottom
        const h = document.body.offsetHeight;
        let bottom =
          this._searchInput.getBoundingClientRect().y +
          window.pageYOffset +
          this._dropElement.offsetHeight;
        const hdiff = h - bottom;
        if (hdiff < 0) {
          // We display above input
          this._dropElement.style.transform =
            "translateY(calc(-100% - " + scrollbarOffset + "px))";
        } else {
          this._dropElement.style.transform = "none";
        }
      }
    }
  }

  /**
   * The element create with buildSuggestions
   */
  _hideSuggestions() {
    this._dropElement.classList.remove("show");
    this._holderElement.classList.remove("is-invalid");
    this.removeActiveSelection();
  }

  /**
   * @returns {Number}
   */
  _getBootstrapVersion() {
    let ver = 5;
    // If we have jQuery and the tooltip plugin for BS4
    if (
      window.jQuery &&
      $.fn.tooltip != undefined &&
      $.fn.tooltip.Constructor != undefined
    ) {
      ver = parseInt($.fn.tooltip.Constructor.VERSION.charAt(0));
    }
    return ver;
  }

  /**
   * Find if label is already selected (based on attribute)
   * @param {string} text
   * @returns {boolean}
   */
  _isSelected(text) {
    const opt = Array.from(this._selectElement.querySelectorAll("option")).find(
      (el) => el.textContent == text
    );
    if (opt && opt.getAttribute("selected")) {
      return true;
    }
    return false;
  }

  /**
   * Checks if value matches a configured regex
   * @param {string} value
   * @returns {boolean}
   */
  _validateRegex(value) {
    const regex = new RegExp(this.validationRegex.trim());
    return regex.test(value);
  }

  /**
   * @returns {HTMLElement}
   */
  getActiveSelection() {
    return this._dropElement.querySelector("a." + ACTIVE_CLASS);
  }

  removeActiveSelection() {
    let selection = this.getActiveSelection();
    if (selection) {
      selection.classList.remove(...ACTIVE_CLASSES);
    }
  }

  removeAll() {
    let items = this.getSelectedValues();
    items.forEach((item) => {
      this.removeItem(item, true);
    });
    this._adjustWidth();
  }

  /**
   * @param {boolean} noEvents
   */
  removeLastItem(noEvents) {
    let items = this._containerElement.querySelectorAll("span");
    if (!items.length) {
      return;
    }
    let lastItem = items[items.length - 1];
    this.removeItem(lastItem.getAttribute(VALUE_ATTRIBUTE), noEvents);
  }

  /**
   * @returns {boolean}
   */
  isDisabled() {
    return (
      this._selectElement.hasAttribute("disabled") ||
      this._selectElement.disabled ||
      this._selectElement.hasAttribute("readonly")
    );
  }

  /**
   * @returns {boolean}
   */
  isInvalid() {
    return this._holderElement.classList.contains("is-invalid");
  }

  /**
   * @returns {boolean}
   */
  isSingle() {
    return !this._selectElement.hasAttribute("multiple");
  }

  /**
   * @param {string} text
   * @param {string} value
   * @returns {boolean}
   */
  canAdd(text, value = null) {
    if (!value) {
      value = text;
    }
    // Check invalid input
    if (!text) {
      return false;
    }
    // Check disabled
    if (this.isDisabled()) {
      return false;
    }
    // Check already selected input (single will replace)
    if (!this.isSingle() && this._isSelected(text)) {
      return false;
    }
    // Check for max
    if (this.max && this.getSelectedValues().length >= this.max) {
      return false;
    }
    // Check for regex
    if (this.validationRegex && !this._validateRegex(text)) {
      this._holderElement.classList.add("is-invalid");
      return false;
    }
    return true;
  }

  /**
   * You might want to use canAdd before to ensure the item is valid
   * @param {string} text
   * @param {string} value
   * @param {object} data
   */
  addItem(text, value = null, data = {}) {
    if (!value) {
      value = text;
    }

    // Single items remove first
    if (this.isSingle() && this.getSelectedValues().length) {
      this.removeLastItem(true);
    }

    const bver = this._getBootstrapVersion();
    let opt = this._selectElement.querySelector(
      'option[value="' + value + '"]'
    );
    if (opt) {
      data = opt.dataset;
    }

    // create span
    let html = text;
    let span = document.createElement("span");
    let classes = ["badge"];
    let badgeStyle = this.badgeStyle;
    if (data.badgeStyle) {
      badgeStyle = data.badgeStyle;
    }
    if (data.badgeClass) {
      classes.push(...data.badgeClass.split(" "));
    }
    if (this.baseClass) {
      // custom style
      bver === 5 ? classes.push("me-2") : classes.push("mr-2");
      classes.push(...this.baseClass.split(" "));
    } else if (bver === 5) {
      //https://getbootstrap.com/docs/5.1/components/badge/
      classes = [...classes, ...["me-2", "bg-" + badgeStyle, "mw-100"]];
    } else {
      // https://getbootstrap.com/docs/4.6/components/badge/
      classes = [...classes, ...["mr-2", "badge-" + badgeStyle]];
    }
    span.classList.add(...classes);
    span.setAttribute(VALUE_ATTRIBUTE, value);

    if (this.allowClear) {
      const closeClass = classes.includes("text-dark")
        ? "btn-close"
        : "btn-close-white";
      let btnMargin;
      let btnFloat;
      if (this.clearEnd) {
        btnMargin = bver === 5 ? "ms-2" : "ml-2";
        btnFloat = bver === 5 ? "float-end" : "float:right;";
      } else {
        btnMargin = bver === 5 ? "me-2" : "mr-2";
        btnFloat = bver === 5 ? "float-start" : "float:left;";
      }
      const btn =
        bver === 5
          ? '<button type="button" style="font-size:0.65em" class="' +
            btnMargin +
            " " +
            btnFloat +
            " btn-close " +
            closeClass +
            '" aria-label="' +
            this.clearLabel +
            '"></button>'
          : '<button type="button" style="font-size:1em;' +
            btnFloat +
            'text-shadow:none;color:currentColor;transform:scale(1.2)" class="' +
            btnMargin +
            ' close" aria-label="' +
            this.clearLabel +
            '"><span aria-hidden="true">&times;</span></button>';
      html = btn + html;
    }

    span.innerHTML = html;
    this._containerElement.insertBefore(span, this._searchInput);

    if (this.allowClear) {
      span.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isDisabled()) {
          this.removeItem(value);
          document.activeElement.blur();
          this._adjustWidth();
        }
      });
    }

    // we need to create a new option
    if (!opt) {
      opt = document.createElement("option");
      opt.value = value;
      opt.textContent = text; // innerText is not well supported by jsdom
      // Pass along data provided
      for (const [key, value] of Object.entries(data)) {
        opt.dataset[key] = value;
      }
      this._selectElement.appendChild(opt);
    }

    // update select, we need to set attribute for option[selected]
    opt.setAttribute("selected", "selected");
    opt.selected = true;

    // Fire change event
    if (this._fireEvents) {
      this._selectElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  /**
   * @param {string} value
   * @param {boolean} value
   */
  removeItem(value, noEvents = false) {
    let item = this._containerElement.querySelector(
      "span[" + VALUE_ATTRIBUTE + '="' + value + '"]'
    );
    if (!item) {
      return;
    }
    item.remove();

    // update select
    let opt = this._selectElement.querySelector(
      'option[value="' + value + '"]'
    );
    if (opt) {
      opt.removeAttribute("selected");
      opt.selected = false;

      // Fire change event
      if (this._fireEvents && !noEvents) {
        this._selectElement.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }

    // Make input visible
    if (
      this._searchInput.style.visibility == "hidden" &&
      this.max &&
      this.getSelectedValues().length < this.max
    ) {
      this._searchInput.style.visibility = "visible";
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tags);


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


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

  Shekel.Utility.Guid = () => (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();

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
      guid: (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
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


/***/ }),

/***/ "./src/js/orders-list.js":
/*!*******************************!*\
  !*** ./src/js/orders-list.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags */ "./src/js/Tags.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/js/index.js");



document.addEventListener("DOMContentLoaded", function (event) {
  _Tags__WEBPACK_IMPORTED_MODULE_0__["default"].init(".tobeTagged");

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
    if (ShekelBasket.basketItems.length > 0) {
      if (confirm("Bu sipariş iptal edilecektir. Onaylıyor musunuz?")) {
        if (ddlCustomers.options.length) {
          customerDeSelected();
          resetOrder();
        }
      }
    }

    customerSelected();
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

    let inst = _Tags__WEBPACK_IMPORTED_MODULE_0__["default"].getInstance(ddlCustomers);
    inst.removeAll();
    ddlCustomers.length = 0;
    console.log("i am trying to re-initialize");
    _Tags__WEBPACK_IMPORTED_MODULE_0__["default"].init(".tobeTagged");
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/orders-list.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5SzBCO0FBQ047QUFDcEI7QUFDQTtBQUNBLEVBQUUsa0RBQVM7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLDJDQUEyQyxJQUFJO0FBQy9DO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFdBQVc7QUFDL0M7QUFDQTtBQUNBLHVFQUF1RSxpQkFBaUI7QUFDeEY7QUFDQTtBQUNBLHlGQUF5RixXQUFXLGdCQUFnQixjQUFjLGVBQWUsYUFBYSxpQkFBaUIsZUFBZTtBQUM5TCx5QkFBeUIsZUFBZTtBQUN4QyxzQkFBc0IsWUFBWTtBQUNsQyw4QkFBOEIsbUJBQW1CO0FBQ2pELHVCQUF1QixhQUFhO0FBQ3BDLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQSwwQkFBMEIsY0FBYyxnQkFBZ0IsY0FBYztBQUN0RTtBQUNBLHFDQUFxQyxjQUFjLHNDQUFzQyxhQUFhO0FBQ3RHLGtEQUFrRCxhQUFhLG9EQUFvRDtBQUNuSCxpREFBaUQsZUFBZSxtQ0FBbUMsYUFBYSxJQUFJLG1CQUFtQjtBQUN2STtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5REFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELE9BQU87QUFDcEUsdUNBQXVDLFlBQVk7QUFDbkQsUUFBUSxNQUFNO0FBQ2QsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsS0FBSztBQUNiLFFBQVEsUUFBUTtBQUNoQixRQUFRLFVBQVU7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLE9BQU87QUFDeEU7QUFDQSw2REFBNkQsVUFBVTtBQUN2RTtBQUNBLCtEQUErRCxJQUFJO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQ2p1QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25ld21lZC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbmV3bWVkLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbmV3bWVkLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vbmV3bWVkLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9uZXdtZWQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL25ld21lZC8uL3NyYy9qcy9UYWdzLmpzIiwid2VicGFjazovL25ld21lZC8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZXdtZWQvLi9zcmMvanMvb3JkZXJzLWxpc3QuanMiLCJ3ZWJwYWNrOi8vbmV3bWVkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ld21lZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3bWVkL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3bWVkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3bWVkL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmV3bWVkL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZXdtZWQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLyoqXHJcbiAqIEJvb3RzdHJhcCA1IChhbmQgNCEpIHRhZ3NcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2xla29hbGEvYm9vdHN0cmFwNS10YWdzXHJcbiAqIFR1cm5zIHlvdXIgc2VsZWN0W211bHRpcGxlXSBpbnRvIG5pY2UgdGFncyBsaXN0c1xyXG4gKlxyXG4gKiBSZXF1aXJlZCBCb290c3RyYXAgNSBzdHlsZXM6XHJcbiAqIC0gYmFkZ2VcclxuICogLSBiYWNrZ3JvdW5kLWNvbG9yIHV0aWxpdHlcclxuICogLSBtYXJnaW4tZW5kIHV0aWxpdHlcclxuICogLSBmbG9hdC1zdGFydCB1dGlsaXR5XHJcbiAqIC0gZm9ybXNcclxuICogLSBkcm9wZG93blxyXG4gKi9cclxuXHJcbmNvbnN0IEFDVElWRV9DTEFTUyA9IFwiaXMtYWN0aXZlXCI7XHJcbmNvbnN0IEFDVElWRV9DTEFTU0VTID0gW1wiaXMtYWN0aXZlXCIsIFwiYmctcHJpbWFyeVwiLCBcInRleHQtd2hpdGVcIl07XHJcbmNvbnN0IFZBTFVFX0FUVFJJQlVURSA9IFwiZGF0YS12YWx1ZVwiO1xyXG5cclxuLy8gU3RhdGljIG1hcCB3aWxsIG1pbmlmeSB2ZXJ5IGJhZGx5IGFzIGNsYXNzIHByb3AsIHNvIHdlIHVzZSBhbiBleHRlcm5hbCBjb25zdGFudFxyXG5jb25zdCBJTlNUQU5DRV9NQVAgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuY2xhc3MgVGFncyB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtIVE1MU2VsZWN0RWxlbWVudH0gZWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZ2xvYmFsT3B0c1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsLCBnbG9iYWxPcHRzID0ge30pIHtcclxuICAgIC8vIEhpZGUgdGhlIHNlbGVjdCBlbGVtZW50IGFuZCByZWdpc3RlciBhIHRhZ3MgYXR0clxyXG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgSU5TVEFOQ0VfTUFQLnNldChlbCwgdGhpcyk7XHJcbiAgICB0aGlzLl9zZWxlY3RFbGVtZW50ID0gZWw7XHJcblxyXG4gICAgLy8gQWxsb3cgMS8wLCB0cnVlL2ZhbHNlIGFzIHN0cmluZ3NcclxuICAgIGNvbnN0IHBhcnNlQm9vbCA9ICh2YWx1ZSkgPT5cclxuICAgICAgW1widHJ1ZVwiLCBcImZhbHNlXCIsIFwiMVwiLCBcIjBcIiwgdHJ1ZSwgZmFsc2VdLmluY2x1ZGVzKHZhbHVlKSAmJlxyXG4gICAgICAhIUpTT04ucGFyc2UodmFsdWUpO1xyXG5cclxuICAgIC8vIEhhbmRsZSBvcHRpb25zLCB1c2luZyBnbG9iYWwgc2V0dGluZ3MgZmlyc3QgYW5kIGRhdGEgYXR0ciBvdmVycmlkZVxyXG4gICAgY29uc3Qgb3B0cyA9IHsgLi4uZ2xvYmFsT3B0cywgLi4uZWwuZGF0YXNldCB9O1xyXG4gICAgdGhpcy5hbGxvd05ldyA9IG9wdHMuYWxsb3dOZXcgPyBwYXJzZUJvb2wob3B0cy5hbGxvd05ldykgOiBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0FsbFN1Z2dlc3Rpb25zID0gb3B0cy5zaG93QWxsU3VnZ2VzdGlvbnNcclxuICAgICAgPyBwYXJzZUJvb2wob3B0cy5zaG93QWxsU3VnZ2VzdGlvbnMpXHJcbiAgICAgIDogZmFsc2U7XHJcbiAgICB0aGlzLmJhZGdlU3R5bGUgPSBvcHRzLmJhZGdlU3R5bGUgfHwgXCJwcmltYXJ5XCI7XHJcbiAgICB0aGlzLmFsbG93Q2xlYXIgPSBvcHRzLmFsbG93Q2xlYXIgPyBwYXJzZUJvb2wob3B0cy5hbGxvd0NsZWFyKSA6IGZhbHNlO1xyXG4gICAgdGhpcy5jbGVhckVuZCA9IG9wdHMuY2xlYXJFbmQgPyBwYXJzZUJvb2wob3B0cy5jbGVhckVuZCkgOiBmYWxzZTtcclxuICAgIHRoaXMuc2VydmVyID0gb3B0cy5zZXJ2ZXIgfHwgZmFsc2U7XHJcbiAgICB0aGlzLmxpdmVTZXJ2ZXIgPSBvcHRzLmxpdmVTZXJ2ZXIgPyBwYXJzZUJvb2wob3B0cy5saXZlU2VydmVyKSA6IGZhbHNlO1xyXG4gICAgdGhpcy5zZXJ2ZXJQYXJhbXMgPSBvcHRzLnNlcnZlclBhcmFtcyB8fCB7fTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5zZXJ2ZXJQYXJhbXMgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB0aGlzLnNlcnZlclBhcmFtcyA9IEpTT04ucGFyc2UodGhpcy5zZXJ2ZXJQYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IG9wdHMuc2VsZWN0ZWQgPyBvcHRzLnNlbGVjdGVkLnNwbGl0KFwiLFwiKSA6IFtdO1xyXG4gICAgdGhpcy5zdWdnZXN0aW9uc1RocmVzaG9sZCA9XHJcbiAgICAgIHR5cGVvZiBvcHRzLnN1Z2dlc3Rpb25zVGhyZXNob2xkICE9IFwidW5kZWZpbmVkXCJcclxuICAgICAgICA/IHBhcnNlSW50KG9wdHMuc3VnZ2VzdGlvbnNUaHJlc2hvbGQpXHJcbiAgICAgICAgOiAxO1xyXG4gICAgdGhpcy52YWxpZGF0aW9uUmVnZXggPSBvcHRzLnJlZ2V4IHx8IFwiXCI7XHJcbiAgICB0aGlzLnNlcGFyYXRvciA9IG9wdHMuc2VwYXJhdG9yID8gb3B0cy5zZXBhcmF0b3Iuc3BsaXQoXCJ8XCIpIDogW107XHJcbiAgICB0aGlzLm1heCA9IG9wdHMubWF4ID8gcGFyc2VJbnQob3B0cy5tYXgpIDogbnVsbDtcclxuICAgIHRoaXMuY2xlYXJMYWJlbCA9IG9wdHMuY2xlYXJMYWJlbCB8fCBcIkNsZWFyXCI7XHJcbiAgICB0aGlzLnNlYXJjaExhYmVsID0gb3B0cy5zZWFyY2hMYWJlbCB8fCBcIlR5cGUgYSB2YWx1ZVwiO1xyXG4gICAgdGhpcy52YWx1ZUZpZWxkID0gb3B0cy52YWx1ZUZpZWxkIHx8IFwidmFsdWVcIjtcclxuICAgIHRoaXMubGFiZWxGaWVsZCA9IG9wdHMubGFiZWxGaWVsZCB8fCBcImxhYmVsXCI7XHJcbiAgICB0aGlzLmtlZXBPcGVuID0gb3B0cy5rZWVwT3BlbiA/IHBhcnNlQm9vbChvcHRzLmtlZXBPcGVuKSA6IGZhbHNlO1xyXG4gICAgdGhpcy5mdWxsV2lkdGggPSBvcHRzLmZ1bGxXaWR0aCA/IHBhcnNlQm9vbChvcHRzLmZ1bGxXaWR0aCkgOiBmYWxzZTtcclxuICAgIHRoaXMuZGVib3VuY2VUaW1lID0gb3B0cy5kZWJvdW5jZVRpbWUgPyBwYXJzZUludChvcHRzLmRlYm91bmNlVGltZSkgOiAzMDA7XHJcbiAgICB0aGlzLmJhc2VDbGFzcyA9IG9wdHMuYmFzZUNsYXNzIHx8IFwiXCI7XHJcblxyXG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IG9wdHMucGxhY2Vob2xkZXIgfHwgdGhpcy5fZ2V0UGxhY2Vob2xkZXIoKTtcclxuICAgIHRoaXMuX2tleWJvYXJkTmF2aWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZmlyZUV2ZW50cyA9IHRydWU7XHJcbiAgICB0aGlzLl9zZWFyY2hGdW5jID0gVGFncy5kZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2xvYWRGcm9tU2VydmVyKHRydWUpO1xyXG4gICAgfSwgdGhpcy5kZWJvdW5jZVRpbWUpO1xyXG5cclxuICAgIHRoaXMub3ZlcmZsb3dQYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5wYXJlbnRGb3JtID0gZWwucGFyZW50RWxlbWVudDtcclxuICAgIHdoaWxlICh0aGlzLnBhcmVudEZvcm0pIHtcclxuICAgICAgaWYgKHRoaXMucGFyZW50Rm9ybS5zdHlsZS5vdmVyZmxvdyA9PT0gXCJoaWRkZW5cIikge1xyXG4gICAgICAgIHRoaXMub3ZlcmZsb3dQYXJlbnQgPSB0aGlzLnBhcmVudEZvcm07XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYXJlbnRGb3JtID0gdGhpcy5wYXJlbnRGb3JtLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGlmICh0aGlzLnBhcmVudEZvcm0gJiYgdGhpcy5wYXJlbnRGb3JtLm5vZGVOYW1lID09IFwiRk9STVwiKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVzZXQgPSB0aGlzLnJlc2V0LmJpbmQodGhpcyk7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRGb3JtKSB7XHJcbiAgICAgIHRoaXMucGFyZW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwicmVzZXRcIiwgdGhpcy5yZXNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGVsZW1lbnRzXHJcbiAgICB0aGlzLl9ob2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgLy8gdGhpcyBpcyB0aGUgb25lIGhvbGRpbmcgdGhlIGZha2UgaW5wdXQgYW5kIHRoZSBkcm9wbWVudVxyXG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vIHRoaXMgaXMgdGhlIG9uZSBmb3IgdGhlIGZha2UgaW5wdXQgKGxhYmVscyArIGlucHV0KVxyXG4gICAgdGhpcy5fZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICB0aGlzLl9zZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuXHJcbiAgICB0aGlzLl9ob2xkZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9zZWFyY2hJbnB1dCk7XHJcbiAgICB0aGlzLl9ob2xkZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2Ryb3BFbGVtZW50KTtcclxuICAgIC8vIGluc2VydCBhZnRlciBzZWxlY3RcclxuICAgIHRoaXMuX3NlbGVjdEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXHJcbiAgICAgIHRoaXMuX2hvbGRlckVsZW1lbnQsXHJcbiAgICAgIHRoaXMuX3NlbGVjdEVsZW1lbnQubmV4dFNpYmxpbmdcclxuICAgICk7XHJcblxyXG4gICAgLy8gQ29uZmlndXJlIHRoZW1cclxuICAgIHRoaXMuX2NvbmZpZ3VyZUhvbGRlckVsZW1lbnQoKTtcclxuICAgIHRoaXMuX2NvbmZpZ3VyZURyb3BFbGVtZW50KCk7XHJcbiAgICB0aGlzLl9jb25maWd1cmVDb250YWluZXJFbGVtZW50KCk7XHJcbiAgICB0aGlzLl9jb25maWd1cmVTZWFyY2hJbnB1dCgpO1xyXG4gICAgdGhpcy5yZXNldFN0YXRlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VydmVyICYmICF0aGlzLmxpdmVTZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5fbG9hZEZyb21TZXJ2ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVzZXRTdWdnZXN0aW9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIHRvIGFsbCBlbGVtZW50cyBtYXRjaGVkIGJ5IHRoZSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAgICovXHJcbiAgc3RhdGljIGluaXQoc2VsZWN0b3IgPSBcInNlbGVjdFttdWx0aXBsZV1cIiwgb3B0cyA9IHt9KSB7XHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChUYWdzLmdldEluc3RhbmNlKGxpc3RbaV0pKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgbmV3IFRhZ3MobGlzdFtpXSwgb3B0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxTZWxlY3RFbGVtZW50fSBlbFxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZShlbCkge1xyXG4gICAgaWYgKElOU1RBTkNFX01BUC5oYXMoZWwpKSB7XHJcbiAgICAgIHJldHVybiBJTlNUQU5DRV9NQVAuZ2V0KGVsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxyXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICAgKi9cclxuICBzdGF0aWMgZGVib3VuY2UoZnVuYywgdGltZW91dCA9IDMwMCkge1xyXG4gICAgbGV0IHRpbWVyO1xyXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgfSwgdGltZW91dCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIElOU1RBTkNFX01BUC5kZWxldGUodGhpcy5fc2VsZWN0RWxlbWVudCk7XHJcbiAgICB0aGlzLl9zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB0aGlzLl9ob2xkZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5faG9sZGVyRWxlbWVudCk7XHJcbiAgICBpZiAodGhpcy5wYXJlbnRGb3JtKSB7XHJcbiAgICAgIHRoaXMucGFyZW50Rm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzZXRcIiwgdGhpcy5yZXNldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgIHRoaXMuX2hvbGRlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XHJcbiAgICAgIHRoaXMuX3NlYXJjaElucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuX2hvbGRlckVsZW1lbnQuaGFzQXR0cmlidXRlKFwicmVhZG9ubHlcIikpIHtcclxuICAgICAgICB0aGlzLl9ob2xkZXJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcInJlYWRvbmx5XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLl9zZWFyY2hJbnB1dC5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSkge1xyXG4gICAgICAgIHRoaXMuX3NlYXJjaElucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFN1Z2dlc3Rpb25zKCkge1xyXG4gICAgbGV0IHN1Z2dlc3Rpb25zID0gQXJyYXkuZnJvbSh0aGlzLl9zZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIikpXHJcbiAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4ge1xyXG4gICAgICAgIHJldHVybiAhb3B0aW9uLmRpc2FibGVkO1xyXG4gICAgICB9KVxyXG4gICAgICAubWFwKChvcHRpb24pID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdmFsdWU6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSxcclxuICAgICAgICAgIGxhYmVsOiBvcHRpb24udGV4dENvbnRlbnQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLl9idWlsZFN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd1xyXG4gICAqL1xyXG4gIF9sb2FkRnJvbVNlcnZlcihzaG93ID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLl9hYm9ydENvbnRyb2xsZXIpIHtcclxuICAgICAgdGhpcy5fYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgdGhpcy5zZXJ2ZXJQYXJhbXMucXVlcnkgPSB0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5zZXJ2ZXJQYXJhbXMpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgZmV0Y2godGhpcy5zZXJ2ZXIgKyBcIj9cIiArIHBhcmFtcywgeyBzaWduYWw6IHRoaXMuX2Fib3J0Q29udHJvbGxlci5zaWduYWwgfSlcclxuICAgICAgLnRoZW4oKHIpID0+IHIuanNvbigpKVxyXG4gICAgICAudGhlbigoc3VnZ2VzdGlvbnMpID0+IHtcclxuICAgICAgICBsZXQgZGF0YSA9IHN1Z2dlc3Rpb25zLmRhdGEgfHwgc3VnZ2VzdGlvbnM7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRTdWdnZXN0aW9ucyhkYXRhKTtcclxuICAgICAgICB0aGlzLl9hYm9ydENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICB0aGlzLl9zaG93U3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBfZ2V0UGxhY2Vob2xkZXIoKSB7XHJcbiAgICAvLyBVc2UgcGxhY2Vob2xkZXIgYW5kIGRhdGEtcGxhY2Vob2xkZXIgaW4gcHJpb3JpdHlcclxuICAgIGlmICh0aGlzLl9zZWxlY3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RFbGVtZW50LmdldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdEVsZW1lbnQuZGF0YXNldC5wbGFjZWhvbGRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0RWxlbWVudC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xyXG4gICAgfVxyXG4gICAgLy8gRmFsbGJhY2sgdG8gZmlyc3Qgb3B0aW9uIGlmIG5vIHZhbHVlXHJcbiAgICBsZXQgZmlyc3RPcHRpb24gPSB0aGlzLl9zZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJvcHRpb25cIik7XHJcbiAgICBpZiAoIWZpcnN0T3B0aW9uKSB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpcnN0T3B0aW9uLmhhc0F0dHJpYnV0ZShcInNlbGVjdGVkXCIpKSB7XHJcbiAgICAgIGZpcnN0T3B0aW9uLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICFmaXJzdE9wdGlvbi52YWx1ZSA/IGZpcnN0T3B0aW9uLnRleHRDb250ZW50IDogXCJcIjtcclxuICB9XHJcblxyXG4gIF9jb25maWd1cmVEcm9wRWxlbWVudCgpIHtcclxuICAgIHRoaXMuX2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uW1wiZHJvcGRvd24tbWVudVwiLCBcInAtMFwiXSk7XHJcbiAgICB0aGlzLl9kcm9wRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBcIjI4MHB4XCI7XHJcbiAgICBpZiAoIXRoaXMuZnVsbFdpZHRoKSB7XHJcbiAgICAgIHRoaXMuX2Ryb3BFbGVtZW50LnN0eWxlLm1heFdpZHRoID0gXCIzNjBweFwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZHJvcEVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XHJcblxyXG4gICAgLy8gSWYgdGhlIG1vdXNlIHdhcyBvdXRzaWRlLCBlbnRlcmluZyByZW1vdmUga2V5Ym9hcmQgbmF2IG1vZGVcclxuICAgIHRoaXMuX2Ryb3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLl9rZXlib2FyZE5hdmlnYXRpb24gPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2NvbmZpZ3VyZUhvbGRlckVsZW1lbnQoKSB7XHJcbiAgICB0aGlzLl9ob2xkZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uW1wiZm9ybS1jb250cm9sXCIsIFwiZHJvcGRvd25cIl0pO1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9ybS1zZWxlY3QtbGdcIikpIHtcclxuICAgICAgdGhpcy5faG9sZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sLWxnXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3NlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9ybS1zZWxlY3Qtc21cIikpIHtcclxuICAgICAgdGhpcy5faG9sZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1jb250cm9sLXNtXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhbiBvdmVyZmxvdyBwYXJlbnQsIHdlIGNhbiBzaW1wbHkgaW5oZXJpdCBzdHlsZXNcclxuICAgIC8vIElmIHdlIGhhdmUgYW4gb3ZlcmZsb3cgcGFyZW50LCBpdCBuZWVkcyBhIHJlbGF0aXZlbHkgcG9zaXRpb25lZCBlbGVtZW50XHJcbiAgICBpZiAodGhpcy5vdmVyZmxvd1BhcmVudCkge1xyXG4gICAgICB0aGlzLl9ob2xkZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJpbmhlcml0XCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZ2V0Qm9vdHN0cmFwVmVyc2lvbigpID09PSA0KSB7XHJcbiAgICAgIC8vIFByZXZlbnQgZml4ZWQgaGVpZ2h0IGR1ZSB0byBmb3JtLWNvbnRyb2xcclxuICAgICAgdGhpcy5faG9sZGVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jb25maWd1cmVDb250YWluZXJFbGVtZW50KCkge1xyXG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUudmlzaWJpbGl0eSAhPSBcImhpZGRlblwiKSB7XHJcbiAgICAgICAgdGhpcy5fc2VhcmNoSW5wdXQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWRkIGluaXRpYWwgdmFsdWVzXHJcbiAgICAvLyB3ZSB1c2Ugc2VsZWN0ZWRPcHRpb25zIGJlY2F1c2Ugc2luZ2xlIHNlbGVjdCBjYW4gaGF2ZSBhIHNlbGVjdGVkIG9wdGlvblxyXG4gICAgLy8gd2l0aG91dCBhIHNlbGVjdGVkIGF0dHJpYnV0ZSBpZiBpdCdzIHRoZSBmaXJzdCB2YWx1ZVxyXG4gICAgbGV0IGluaXRpYWxWYWx1ZXMgPSB0aGlzLl9zZWxlY3RFbGVtZW50LnNlbGVjdGVkT3B0aW9ucztcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5pdGlhbFZhbHVlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBsZXQgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlc1tqXTtcclxuICAgICAgaWYgKCFpbml0aWFsVmFsdWUudmFsdWUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICAvLyB0cmFjayBpbml0aWFsIHZhbHVlcyBmb3IgcmVzZXRcclxuICAgICAgaW5pdGlhbFZhbHVlLmRhdGFzZXQuaW5pdCA9IDE7XHJcbiAgICAgIHRoaXMuYWRkSXRlbShpbml0aWFsVmFsdWUudGV4dENvbnRlbnQsIGluaXRpYWxWYWx1ZS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY29uZmlndXJlU2VhcmNoSW5wdXQoKSB7XHJcbiAgICB0aGlzLl9zZWFyY2hJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB0aGlzLl9zZWFyY2hJbnB1dC5hdXRvY29tcGxldGUgPSBcIm9mZlwiO1xyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuc3BlbGxjaGVjayA9IGZhbHNlO1xyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUuYm9yZGVyID0gMDtcclxuICAgIHRoaXMuX3NlYXJjaElucHV0LnN0eWxlLm91dGxpbmUgPSAwO1xyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUubWF4V2lkdGggPSBcIjEwMCVcIjtcclxuICAgIHRoaXMuX3NlYXJjaElucHV0LmFyaWFMYWJlbCA9IHRoaXMuc2VhcmNoTGFiZWw7XHJcbiAgICB0aGlzLl9yZXNldFNlYXJjaElucHV0KHRydWUpO1xyXG5cclxuICAgIHRoaXMuX3NlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgLy8gQWRkIGl0ZW0gaWYgYSBzZXBhcmF0b3IgaXMgdXNlZFxyXG4gICAgICAvLyBPbiBtb2JpbGUgb3IgY29weSBwYXN0ZSwgaXQgY2FuIHBhc3MgbXVsdGlwbGUgY2hhcnMgKGVnOiB3aGVuIHByZXNzaW5nIHNwYWNlIGFuZCBpdCBmb3JtYXRzIHRoZSBzdHJpbmcpXHJcbiAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdENoYXIgPSBldmVudC5kYXRhLnNsaWNlKC0xKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnNlcGFyYXRvci5sZW5ndGggJiZcclxuICAgICAgICAgIHRoaXMuX3NlYXJjaElucHV0LnZhbHVlICYmXHJcbiAgICAgICAgICB0aGlzLnNlcGFyYXRvci5pbmNsdWRlcyhsYXN0Q2hhcilcclxuICAgICAgICApIHtcclxuICAgICAgICAgIC8vIFJlbW92ZSBzZXBhcmF0b3IgZXZlbiBpZiBhZGRpbmcgaXMgcHJldmVudGVkXHJcbiAgICAgICAgICB0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZSA9IHRoaXMuX3NlYXJjaElucHV0LnZhbHVlLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgIGxldCB0ZXh0ID0gdGhpcy5fc2VhcmNoSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLl9hZGQodGV4dCwgbnVsbCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBZGp1c3QgaW5wdXQgd2lkdGggdG8gY3VycmVudCBjb250ZW50XHJcbiAgICAgIHRoaXMuX2FkanVzdFdpZHRoKCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgZGlzcGxheSBzdWdnZXN0aW9uc1xyXG4gICAgICBpZiAodGhpcy5fc2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoID49IHRoaXMuc3VnZ2VzdGlvbnNUaHJlc2hvbGQpIHtcclxuICAgICAgICBpZiAodGhpcy5saXZlU2VydmVyKSB7XHJcbiAgICAgICAgICB0aGlzLl9zZWFyY2hGdW5jKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3Nob3dTdWdnZXN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9oaWRlU3VnZ2VzdGlvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zdWdnZXN0aW9uc1RocmVzaG9sZCkge1xyXG4gICAgICAgIHRoaXMuX3Nob3dTdWdnZXN0aW9ucygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3NlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5faGlkZVN1Z2dlc3Rpb25zKCk7XHJcbiAgICAgIGlmICh0aGlzLmtlZXBPcGVuKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRTZWFyY2hJbnB1dCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGtleXByZXNzIGRvZXNuJ3Qgc2VuZCBhcnJvdyBrZXlzLCBzbyB3ZSB1c2Uga2V5ZG93blxyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIEtleWNvZGUgcmVmZXJlbmNlIDogaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9qYXZhc2NyaXB0L2phdmFzY3JpcHQta2V5Y29kZXMvXHJcbiAgICAgIGxldCBrZXkgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LmtleTtcclxuXHJcbiAgICAgIC8vIEtleWJvYXJkIGtleXNcclxuICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgIGNhc2UgXCJFbnRlclwiOlxyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24uY2xpY2soKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFdlIHVzZSB3aGF0IGlzIHR5cGVkIGlmIG5vdCBzZWxlY3RlZCBhbmQgbm90IGVtcHR5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbG93TmV3ICYmIHRoaXMuX3NlYXJjaElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICB0aGlzLl9hZGQodGV4dCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgY2FzZSBcIkFycm93VXBcIjpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl9rZXlib2FyZE5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgbGV0IG5ld1NlbGVjdGlvbiA9IHRoaXMuX21vdmVTZWxlY3Rpb25VcCgpO1xyXG4gICAgICAgICAgLy8gSWYgd2UgdXNlIGFycm93IHVwIHdpdGhvdXQgaW5wdXQgYW5kIHRoZXJlIGlzIG5vIG5ldyBzZWxlY3Rpb24sIGhpZGUgc3VnZ2VzdGlvbnNcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoID09IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5fZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSAmJlxyXG4gICAgICAgICAgICAhbmV3U2VsZWN0aW9uXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZVN1Z2dlc3Rpb25zKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgIGNhc2UgXCJBcnJvd0Rvd25cIjpcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB0aGlzLl9rZXlib2FyZE5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5fbW92ZVNlbGVjdGlvbkRvd24oKTtcclxuICAgICAgICAgIC8vIElmIHdlIHVzZSBhcnJvdyBkb3duIHdpdGhvdXQgaW5wdXQsIHNob3cgc3VnZ2VzdGlvbnNcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoID09IDAgJiZcclxuICAgICAgICAgICAgIXRoaXMuX2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIilcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93U3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgODpcclxuICAgICAgICBjYXNlIFwiQmFja3NwYWNlXCI6XHJcbiAgICAgICAgICBpZiAodGhpcy5fc2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXN0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hZGp1c3RXaWR0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlU3VnZ2VzdGlvbnMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjc6XHJcbiAgICAgICAgY2FzZSBcIkVzY2FwZVwiOlxyXG4gICAgICAgICAgLy8gV2UgbWF5IHdpc2ggdG8gbm90IHVzZSB0aGUgc3VnZ2VzdGlvbnNcclxuICAgICAgICAgIHRoaXMuX2hpZGVTdWdnZXN0aW9ucygpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG4gICAqL1xyXG4gIF9hZGQodGV4dCwgdmFsdWUgPSBudWxsLCBkYXRhID0ge30pIHtcclxuICAgIGlmICghdGhpcy5jYW5BZGQodGV4dCwgdmFsdWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuYWRkSXRlbSh0ZXh0LCB2YWx1ZSwgZGF0YSk7XHJcbiAgICBpZiAodGhpcy5rZWVwT3Blbikge1xyXG4gICAgICB0aGlzLl9zaG93U3VnZ2VzdGlvbnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3Jlc2V0U2VhcmNoSW5wdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cclxuICAgKi9cclxuICBfbW92ZVNlbGVjdGlvblVwKCkge1xyXG4gICAgbGV0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0aW9uKCk7XHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIGxldCBwcmV2ID0gYWN0aXZlLnBhcmVudE5vZGU7XHJcbiAgICAgIGRvIHtcclxuICAgICAgICBwcmV2ID0gcHJldi5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgIH0gd2hpbGUgKHByZXYgJiYgcHJldi5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKTtcclxuICAgICAgaWYgKCFwcmV2KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoLi4uQUNUSVZFX0NMQVNTRVMpO1xyXG4gICAgICBwcmV2LnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLmNsYXNzTGlzdC5hZGQoLi4uQUNUSVZFX0NMQVNTRVMpO1xyXG4gICAgICAvLyBEb24ndCB1c2Ugc2Nyb2xsSW50b1ZpZXcgYXMgaXQgc2Nyb2xscyB0aGUgd2hvbGUgd2luZG93XHJcbiAgICAgIHByZXYucGFyZW50Tm9kZS5zY3JvbGxUb3AgPSBwcmV2Lm9mZnNldFRvcCAtIHByZXYucGFyZW50Tm9kZS5vZmZzZXRUb3A7XHJcbiAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XHJcbiAgICovXHJcbiAgX21vdmVTZWxlY3Rpb25Eb3duKCkge1xyXG4gICAgbGV0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0aW9uKCk7XHJcbiAgICBsZXQgbmV4dCA9IG51bGw7XHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIG5leHQgPSBhY3RpdmUucGFyZW50Tm9kZTtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xyXG4gICAgICB9IHdoaWxlIChuZXh0ICYmIG5leHQuc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIik7XHJcbiAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKC4uLkFDVElWRV9DTEFTU0VTKTtcclxuICAgICAgbmV4dC5xdWVyeVNlbGVjdG9yKFwiYVwiKS5jbGFzc0xpc3QuYWRkKC4uLkFDVElWRV9DTEFTU0VTKTtcclxuICAgICAgLy8gVGhpcyBpcyB0aGUgZXF1aXZhbGVudCBvZiBzY3JvbGxJbnRvVmlldyhmYWxzZSkgYnV0IG9ubHkgZm9yIHBhcmVudCBub2RlXHJcbiAgICAgIGlmIChuZXh0Lm9mZnNldFRvcCA+IG5leHQucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQgLSBuZXh0Lm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgIG5leHQucGFyZW50Tm9kZS5zY3JvbGxUb3AgKz0gbmV4dC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqL1xyXG4gIF9jYWxjVGV4dFdpZHRoKHRleHQsIHNpemUgPSBudWxsKSB7XHJcbiAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgIHNwYW4uc3R5bGUuZm9udFNpemUgPSBzaXplIHx8IFwiaW5oZXJpdFwiO1xyXG4gICAgc3Bhbi5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcclxuICAgIHNwYW4uc3R5bGUud2lkdGggPSBcImF1dG9cIjtcclxuICAgIHNwYW4uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBzcGFuLnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vLXdyYXBcIjtcclxuICAgIHNwYW4uaW5uZXJIVE1MID0gdGV4dDtcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHNwYW4uY2xpZW50V2lkdGgpICsgODtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc3Bhbik7XHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGp1c3QgdGhlIGZpZWxkIHRvIGZpdCBpdHMgY29udGVudCBhbmQgc2hvdy9oaWRlIHBsYWNlaG9sZGVyIGlmIG5lZWRlZFxyXG4gICAqL1xyXG4gIF9hZGp1c3RXaWR0aCgpIHtcclxuICAgIGlmICh0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zZWFyY2hJbnB1dC5zaXplID0gdGhpcy5fc2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2hvdyB0aGUgcGxhY2Vob2xkZXIgb25seSBpZiBlbXB0eVxyXG4gICAgICBpZiAodGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMuX3NlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9zZWFyY2hJbnB1dC5zaXplID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zZWFyY2hJbnB1dC5zaXplID1cclxuICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIubGVuZ3RoID4gMCA/IHRoaXMucGxhY2Vob2xkZXIubGVuZ3RoIDogMTtcclxuICAgICAgICB0aGlzLl9zZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB0aGUgc3RyaW5nIGNvbnRhaW5zIGFzY2lpIGNoYXJzIG9yIHN0cmFuZ2UgZm9udCwgaW5wdXQgc2l6ZSBtYXkgYmUgd3JvbmdcclxuICAgIGNvbnN0IHYgPSB0aGlzLl9zZWFyY2hJbnB1dC52YWx1ZSB8fCB0aGlzLl9zZWFyY2hJbnB1dC5wbGFjZWhvbGRlcjtcclxuICAgIGNvbnN0IGNvbXB1dGVkRm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShcclxuICAgICAgdGhpcy5faG9sZGVyRWxlbWVudFxyXG4gICAgKS5mb250U2l6ZTtcclxuICAgIGNvbnN0IHcgPSB0aGlzLl9jYWxjVGV4dFdpZHRoKHYsIGNvbXB1dGVkRm9udFNpemUpO1xyXG4gICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUubWluV2lkdGggPSB3ICsgXCJweFwiO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHN1Z2dlc3Rpb25zIHRvIHRoZSBkcm9wIGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge2FycmF5fSBzdWdnZXN0aW9uc1xyXG4gICAqL1xyXG4gIF9idWlsZFN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zKSB7XHJcbiAgICB3aGlsZSAodGhpcy5fZHJvcEVsZW1lbnQubGFzdENoaWxkKSB7XHJcbiAgICAgIHRoaXMuX2Ryb3BFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuX2Ryb3BFbGVtZW50Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Z2dlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBzdWdnZXN0aW9uID0gc3VnZ2VzdGlvbnNbaV07XHJcbiAgICAgIGlmICghc3VnZ2VzdGlvblt0aGlzLnZhbHVlRmllbGRdKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGluaXRpYWwgc2VsZWN0aW9uXHJcbiAgICAgIGlmIChcclxuICAgICAgICBzdWdnZXN0aW9uLnNlbGVjdGVkIHx8XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZC5pbmNsdWRlcyhzdWdnZXN0aW9uW3RoaXMudmFsdWVGaWVsZF0pXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuX2FkZChcclxuICAgICAgICAgIHN1Z2dlc3Rpb25bdGhpcy5sYWJlbEZpZWxkXSxcclxuICAgICAgICAgIHN1Z2dlc3Rpb25bdGhpcy52YWx1ZUZpZWxkXSxcclxuICAgICAgICAgIHN1Z2dlc3Rpb24uZGF0YVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29udGludWU7IC8vIG5vIG5lZWQgdG8gYWRkIGFzIHN1Z2dlc3Rpb25cclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG5ld0NoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICBsZXQgbmV3Q2hpbGRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgIG5ld0NoaWxkLmFwcGVuZChuZXdDaGlsZExpbmspO1xyXG4gICAgICBuZXdDaGlsZExpbmsuY2xhc3NMaXN0LmFkZCguLi5bXCJkcm9wZG93bi1pdGVtXCIsIFwidGV4dC10cnVuY2F0ZVwiXSk7XHJcbiAgICAgIG5ld0NoaWxkTGluay5zZXRBdHRyaWJ1dGUoVkFMVUVfQVRUUklCVVRFLCBzdWdnZXN0aW9uW3RoaXMudmFsdWVGaWVsZF0pO1xyXG4gICAgICBuZXdDaGlsZExpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcIiNcIik7XHJcbiAgICAgIG5ld0NoaWxkTGluay50ZXh0Q29udGVudCA9IHN1Z2dlc3Rpb25bdGhpcy5sYWJlbEZpZWxkXTtcclxuICAgICAgaWYgKHN1Z2dlc3Rpb24uZGF0YSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHN1Z2dlc3Rpb24uZGF0YSkpIHtcclxuICAgICAgICAgIG5ld0NoaWxkTGluay5kYXRhc2V0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZHJvcEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xyXG5cclxuICAgICAgLy8gSG92ZXIgc2V0cyBhY3RpdmUgaXRlbVxyXG4gICAgICBuZXdDaGlsZExpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gRG9uJ3QgdHJpZ2dlciBlbnRlciBpZiB1c2luZyBhcnJvd3NcclxuICAgICAgICBpZiAodGhpcy5fa2V5Ym9hcmROYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlQWN0aXZlU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgbmV3Q2hpbGQucXVlcnlTZWxlY3RvcihcImFcIikuY2xhc3NMaXN0LmFkZCguLi5BQ1RJVkVfQ0xBU1NFUyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBNb3ZpbmcgdGhlIG1vdXNlIG1lYW5zIG5vIGxvbmdlciB1c2luZyBrZXlib2FyZFxyXG4gICAgICBuZXdDaGlsZExpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9rZXlib2FyZE5hdmlnYXRpb24gPSBmYWxzZTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXdDaGlsZExpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAvLyBPdGhlcndpc2Ugc2VhcmNoSW5wdXQgd291bGQgbG9zZSBmb2N1cyBhbmQgY2xvc2UgdGhlIG1lbnVcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgbmV3Q2hpbGRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuX2FkZChcclxuICAgICAgICAgIG5ld0NoaWxkTGluay50ZXh0Q29udGVudCxcclxuICAgICAgICAgIG5ld0NoaWxkTGluay5nZXRBdHRyaWJ1dGUoVkFMVUVfQVRUUklCVVRFKSxcclxuICAgICAgICAgIG5ld0NoaWxkTGluay5kYXRhc2V0XHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMucmVtb3ZlQWxsKCk7XHJcblxyXG4gICAgLy8gUmVzZXQgZG9lc24ndCBmaXJlIGNoYW5nZSBldmVudFxyXG4gICAgdGhpcy5fZmlyZUV2ZW50cyA9IGZhbHNlO1xyXG4gICAgbGV0IGluaXRpYWxWYWx1ZXMgPVxyXG4gICAgICB0aGlzLl9zZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25bZGF0YS1pbml0XVwiKTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5pdGlhbFZhbHVlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICBsZXQgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlc1tqXTtcclxuICAgICAgdGhpcy5hZGRJdGVtKGluaXRpYWxWYWx1ZS50ZXh0Q29udGVudCwgaW5pdGlhbFZhbHVlLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FkanVzdFdpZHRoKCk7XHJcbiAgICB0aGlzLl9maXJlRXZlbnRzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7Ym9vbH0gaW5pdCBQYXNzIHRydWUgZHVyaW5nIGluaXRcclxuICAgKi9cclxuICBfcmVzZXRTZWFyY2hJbnB1dChpbml0ID0gZmFsc2UpIHtcclxuICAgIHRoaXMuX3NlYXJjaElucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIHRoaXMuX2FkanVzdFdpZHRoKCk7XHJcblxyXG4gICAgaWYgKCFpbml0KSB7XHJcbiAgICAgIHRoaXMuX2hpZGVTdWdnZXN0aW9ucygpO1xyXG4gICAgICAvLyBUcmlnZ2VyIGlucHV0IGV2ZW4gdG8gc2hvdyBzdWdnZXN0aW9ucyBpZiBuZWVkZWRcclxuICAgICAgdGhpcy5fc2VhcmNoSW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgdXNlIHZpc2liaWxpdHkgaW5zdGVhZCBvZiBkaXNwbGF5IHRvIGtlZXAgbGF5b3V0IGludGFjdFxyXG4gICAgaWYgKHRoaXMubWF4ICYmIHRoaXMuZ2V0U2VsZWN0ZWRWYWx1ZXMoKS5sZW5ndGggPj0gdGhpcy5tYXgpIHtcclxuICAgICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlYXJjaElucHV0LnN0eWxlLnZpc2liaWxpdHkgPT0gXCJoaWRkZW5cIikge1xyXG4gICAgICB0aGlzLl9zZWFyY2hJbnB1dC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNTaW5nbGUoKSAmJiAhaW5pdCkge1xyXG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHthcnJheX1cclxuICAgKi9cclxuICBnZXRTZWxlY3RlZFZhbHVlcygpIHtcclxuICAgIC8vIG9wdGlvbltzZWxlY3RlZF0gaXMgdXNlZCByYXRoZXIgdGhhdCBzZWxlY3RlZE9wdGlvbnMgYXMgaXQgd29ya3MgbW9yZSBjb25zaXN0ZW50bHlcclxuICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuX3NlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIm9wdGlvbltzZWxlY3RlZF1cIik7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3RlZCkubWFwKChlbCkgPT4gZWwudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGVsZW1lbnQgY3JlYXRlIHdpdGggYnVpbGRTdWdnZXN0aW9uc1xyXG4gICAqL1xyXG4gIF9zaG93U3VnZ2VzdGlvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9PSBcImhpZGRlblwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgc2VhcmNoIHZhbHVlXHJcbiAgICBsZXQgc2VhcmNoID0gdGhpcy5fc2VhcmNoSW5wdXQudmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuXHJcbiAgICAvLyBHZXQgY3VycmVudCB2YWx1ZXNcclxuICAgIGxldCB2YWx1ZXMgPSB0aGlzLmdldFNlbGVjdGVkVmFsdWVzKCk7XHJcblxyXG4gICAgLy8gRmlsdGVyIHRoZSBsaXN0IGFjY29yZGluZyB0byBzZWFyY2ggc3RyaW5nXHJcbiAgICBsZXQgbGlzdCA9IHRoaXMuX2Ryb3BFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgbGV0IGZpcnN0SXRlbSA9IG51bGw7XHJcbiAgICBsZXQgaGFzUG9zc2libGVWYWx1ZXMgPSBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgaXRlbSA9IGxpc3RbaV07XHJcbiAgICAgIGxldCB0ZXh0ID0gaXRlbS50ZXh0Q29udGVudC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICBsZXQgbGluayA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcImFcIik7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgcHJldmlvdXMgc2VsZWN0aW9uXHJcbiAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSguLi5BQ1RJVkVfQ0xBU1NFUyk7XHJcblxyXG4gICAgICAvLyBIaWRlIHNlbGVjdGVkIHZhbHVlc1xyXG4gICAgICBpZiAodmFsdWVzLmluZGV4T2YobGluay5nZXRBdHRyaWJ1dGUoVkFMVUVfQVRUUklCVVRFKSkgIT0gLTEpIHtcclxuICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaGFzUG9zc2libGVWYWx1ZXMgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgc2VhcmNoIGxlbmd0aCBzaW5jZSB3ZSBjYW4gdHJpZ2dlciBkcm9wZG93biB3aXRoIGFycm93XHJcbiAgICAgIGxldCBpc01hdGNoZWQgPSBzZWFyY2gubGVuZ3RoID09PSAwIHx8IHRleHQuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2hvd0FsbFN1Z2dlc3Rpb25zIHx8XHJcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc1RocmVzaG9sZCA9PT0gMCB8fFxyXG4gICAgICAgIGlzTWF0Y2hlZFxyXG4gICAgICApIHtcclxuICAgICAgICBpdGVtLnN0eWxlLmRpc3BsYXkgPSBcImxpc3QtaXRlbVwiO1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIWZpcnN0SXRlbSAmJiBpc01hdGNoZWQpIHtcclxuICAgICAgICAgIGZpcnN0SXRlbSA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpcnN0SXRlbSB8fCB0aGlzLnNob3dBbGxTdWdnZXN0aW9ucykge1xyXG4gICAgICB0aGlzLl9ob2xkZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1pbnZhbGlkXCIpO1xyXG4gICAgICAvLyBBbHdheXMgc2VsZWN0IGZpcnN0IGl0ZW1cclxuICAgICAgaWYgKGZpcnN0SXRlbSkge1xyXG4gICAgICAgIGZpcnN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5jbGFzc0xpc3QuYWRkKC4uLkFDVElWRV9DTEFTU0VTKTtcclxuICAgICAgICBmaXJzdEl0ZW0ucGFyZW50Tm9kZS5zY3JvbGxUb3AgPSBmaXJzdEl0ZW0ub2Zmc2V0VG9wO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBObyBpdGVtIGFuZCB3ZSBkb24ndCBhbGxvdyBuZXcgaXRlbXMgPT4gZXJyb3JcclxuICAgICAgaWYgKCF0aGlzLmFsbG93TmV3ICYmICEoc2VhcmNoLmxlbmd0aCA9PT0gMCAmJiAhaGFzUG9zc2libGVWYWx1ZXMpKSB7XHJcbiAgICAgICAgdGhpcy5faG9sZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaXMtaW52YWxpZFwiKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbGlkYXRpb25SZWdleCAmJiB0aGlzLmlzSW52YWxpZCgpKSB7XHJcbiAgICAgICAgdGhpcy5faG9sZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaW52YWxpZFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBkcm9wZG93biBpZiBub3QgZm91bmQgb3IgdG8gc2hvdyB2YWxpZGF0aW9uIG1lc3NhZ2VcclxuICAgIGlmICghZm91bmQgfHwgdGhpcy5pc0ludmFsaWQoKSkge1xyXG4gICAgICB0aGlzLl9kcm9wRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIE9yIHNob3cgaXQgaWYgbmVjZXNzYXJ5XHJcbiAgICAgIHRoaXMuX2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZnVsbFdpZHRoKSB7XHJcbiAgICAgICAgLy8gVXNlIGZ1bGwgaW5wdXQgd2lkdGhcclxuICAgICAgICB0aGlzLl9kcm9wRWxlbWVudC5zdHlsZS5sZWZ0ID0gLTEgKyBcInB4XCI7XHJcbiAgICAgICAgdGhpcy5fZHJvcEVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLl9ob2xkZXJFbGVtZW50Lm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFBvc2l0aW9uIG5leHQgdG8gc2VhcmNoIGlucHV0XHJcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl9zZWFyY2hJbnB1dC5vZmZzZXRMZWZ0O1xyXG5cclxuICAgICAgICAvLyBPdmVyZmxvdyByaWdodFxyXG4gICAgICAgIGNvbnN0IHcgPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC0gMTsgLy8gYXZvaWQgcm91bmRpbmcgaXNzdWVzXHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsYmFyT2Zmc2V0ID0gMzA7IC8vIHNjcm9sbGJhcnMgYXJlIG5vdCB0YWtlbiBpbnRvIGFjY291bnRcclxuICAgICAgICBjb25zdCB3ZGlmZiA9XHJcbiAgICAgICAgICB3IC0gKGxlZnQgKyB0aGlzLl9kcm9wRWxlbWVudC5vZmZzZXRXaWR0aCkgLSBzY3JvbGxiYXJPZmZzZXQ7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBkcm9wZG93bnMgZ29lcyBvdXQgb2YgdGhlIHZpZXdwb3J0LCByZW1vdmUgdGhlIGRpZmYgZnJvbSB0aGUgbGVmdCBwb3NpdGlvblxyXG4gICAgICAgIGlmICh3ZGlmZiA8IDApIHtcclxuICAgICAgICAgIGxlZnQgPSBsZWZ0ICsgd2RpZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Ryb3BFbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xyXG5cclxuICAgICAgICAvLyBPdmVyZmxvdyBib3R0b21cclxuICAgICAgICBjb25zdCBoID0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9XHJcbiAgICAgICAgICB0aGlzLl9zZWFyY2hJbnB1dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICtcclxuICAgICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCArXHJcbiAgICAgICAgICB0aGlzLl9kcm9wRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgaGRpZmYgPSBoIC0gYm90dG9tO1xyXG4gICAgICAgIGlmIChoZGlmZiA8IDApIHtcclxuICAgICAgICAgIC8vIFdlIGRpc3BsYXkgYWJvdmUgaW5wdXRcclxuICAgICAgICAgIHRoaXMuX2Ryb3BFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9XHJcbiAgICAgICAgICAgIFwidHJhbnNsYXRlWShjYWxjKC0xMDAlIC0gXCIgKyBzY3JvbGxiYXJPZmZzZXQgKyBcInB4KSlcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fZHJvcEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZWxlbWVudCBjcmVhdGUgd2l0aCBidWlsZFN1Z2dlc3Rpb25zXHJcbiAgICovXHJcbiAgX2hpZGVTdWdnZXN0aW9ucygpIHtcclxuICAgIHRoaXMuX2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgdGhpcy5faG9sZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaW52YWxpZFwiKTtcclxuICAgIHRoaXMucmVtb3ZlQWN0aXZlU2VsZWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqL1xyXG4gIF9nZXRCb290c3RyYXBWZXJzaW9uKCkge1xyXG4gICAgbGV0IHZlciA9IDU7XHJcbiAgICAvLyBJZiB3ZSBoYXZlIGpRdWVyeSBhbmQgdGhlIHRvb2x0aXAgcGx1Z2luIGZvciBCUzRcclxuICAgIGlmIChcclxuICAgICAgd2luZG93LmpRdWVyeSAmJlxyXG4gICAgICAkLmZuLnRvb2x0aXAgIT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICQuZm4udG9vbHRpcC5Db25zdHJ1Y3RvciAhPSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICB2ZXIgPSBwYXJzZUludCgkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IuVkVSU0lPTi5jaGFyQXQoMCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgaWYgbGFiZWwgaXMgYWxyZWFkeSBzZWxlY3RlZCAoYmFzZWQgb24gYXR0cmlidXRlKVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgX2lzU2VsZWN0ZWQodGV4dCkge1xyXG4gICAgY29uc3Qgb3B0ID0gQXJyYXkuZnJvbSh0aGlzLl9zZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIikpLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwudGV4dENvbnRlbnQgPT0gdGV4dFxyXG4gICAgKTtcclxuICAgIGlmIChvcHQgJiYgb3B0LmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIHZhbHVlIG1hdGNoZXMgYSBjb25maWd1cmVkIHJlZ2V4XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgX3ZhbGlkYXRlUmVnZXgodmFsdWUpIHtcclxuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCh0aGlzLnZhbGlkYXRpb25SZWdleC50cmltKCkpO1xyXG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxyXG4gICAqL1xyXG4gIGdldEFjdGl2ZVNlbGVjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9kcm9wRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiYS5cIiArIEFDVElWRV9DTEFTUyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBY3RpdmVTZWxlY3Rpb24oKSB7XHJcbiAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5nZXRBY3RpdmVTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24pIHtcclxuICAgICAgc2VsZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoLi4uQUNUSVZFX0NMQVNTRVMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQWxsKCkge1xyXG4gICAgbGV0IGl0ZW1zID0gdGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpO1xyXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLnJlbW92ZUl0ZW0oaXRlbSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2FkanVzdFdpZHRoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG5vRXZlbnRzXHJcbiAgICovXHJcbiAgcmVtb3ZlTGFzdEl0ZW0obm9FdmVudHMpIHtcclxuICAgIGxldCBpdGVtcyA9IHRoaXMuX2NvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNwYW5cIik7XHJcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgbGFzdEl0ZW0gPSBpdGVtc1tpdGVtcy5sZW5ndGggLSAxXTtcclxuICAgIHRoaXMucmVtb3ZlSXRlbShsYXN0SXRlbS5nZXRBdHRyaWJ1dGUoVkFMVUVfQVRUUklCVVRFKSwgbm9FdmVudHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNEaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuX3NlbGVjdEVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIikgfHxcclxuICAgICAgdGhpcy5fc2VsZWN0RWxlbWVudC5kaXNhYmxlZCB8fFxyXG4gICAgICB0aGlzLl9zZWxlY3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShcInJlYWRvbmx5XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNJbnZhbGlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtaW52YWxpZFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzU2luZ2xlKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9zZWxlY3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShcIm11bHRpcGxlXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBjYW5BZGQodGV4dCwgdmFsdWUgPSBudWxsKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIHZhbHVlID0gdGV4dDtcclxuICAgIH1cclxuICAgIC8vIENoZWNrIGludmFsaWQgaW5wdXRcclxuICAgIGlmICghdGV4dCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBDaGVjayBkaXNhYmxlZFxyXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZCgpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIENoZWNrIGFscmVhZHkgc2VsZWN0ZWQgaW5wdXQgKHNpbmdsZSB3aWxsIHJlcGxhY2UpXHJcbiAgICBpZiAoIXRoaXMuaXNTaW5nbGUoKSAmJiB0aGlzLl9pc1NlbGVjdGVkKHRleHQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIENoZWNrIGZvciBtYXhcclxuICAgIGlmICh0aGlzLm1heCAmJiB0aGlzLmdldFNlbGVjdGVkVmFsdWVzKCkubGVuZ3RoID49IHRoaXMubWF4KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIENoZWNrIGZvciByZWdleFxyXG4gICAgaWYgKHRoaXMudmFsaWRhdGlvblJlZ2V4ICYmICF0aGlzLl92YWxpZGF0ZVJlZ2V4KHRleHQpKSB7XHJcbiAgICAgIHRoaXMuX2hvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImlzLWludmFsaWRcIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWW91IG1pZ2h0IHdhbnQgdG8gdXNlIGNhbkFkZCBiZWZvcmUgdG8gZW5zdXJlIHRoZSBpdGVtIGlzIHZhbGlkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxyXG4gICAqL1xyXG4gIGFkZEl0ZW0odGV4dCwgdmFsdWUgPSBudWxsLCBkYXRhID0ge30pIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdmFsdWUgPSB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmdsZSBpdGVtcyByZW1vdmUgZmlyc3RcclxuICAgIGlmICh0aGlzLmlzU2luZ2xlKCkgJiYgdGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlbW92ZUxhc3RJdGVtKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ2ZXIgPSB0aGlzLl9nZXRCb290c3RyYXBWZXJzaW9uKCk7XHJcbiAgICBsZXQgb3B0ID0gdGhpcy5fc2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXSdcclxuICAgICk7XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgIGRhdGEgPSBvcHQuZGF0YXNldDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgc3BhblxyXG4gICAgbGV0IGh0bWwgPSB0ZXh0O1xyXG4gICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGxldCBjbGFzc2VzID0gW1wiYmFkZ2VcIl07XHJcbiAgICBsZXQgYmFkZ2VTdHlsZSA9IHRoaXMuYmFkZ2VTdHlsZTtcclxuICAgIGlmIChkYXRhLmJhZGdlU3R5bGUpIHtcclxuICAgICAgYmFkZ2VTdHlsZSA9IGRhdGEuYmFkZ2VTdHlsZTtcclxuICAgIH1cclxuICAgIGlmIChkYXRhLmJhZGdlQ2xhc3MpIHtcclxuICAgICAgY2xhc3Nlcy5wdXNoKC4uLmRhdGEuYmFkZ2VDbGFzcy5zcGxpdChcIiBcIikpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYmFzZUNsYXNzKSB7XHJcbiAgICAgIC8vIGN1c3RvbSBzdHlsZVxyXG4gICAgICBidmVyID09PSA1ID8gY2xhc3Nlcy5wdXNoKFwibWUtMlwiKSA6IGNsYXNzZXMucHVzaChcIm1yLTJcIik7XHJcbiAgICAgIGNsYXNzZXMucHVzaCguLi50aGlzLmJhc2VDbGFzcy5zcGxpdChcIiBcIikpO1xyXG4gICAgfSBlbHNlIGlmIChidmVyID09PSA1KSB7XHJcbiAgICAgIC8vaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4xL2NvbXBvbmVudHMvYmFkZ2UvXHJcbiAgICAgIGNsYXNzZXMgPSBbLi4uY2xhc3NlcywgLi4uW1wibWUtMlwiLCBcImJnLVwiICsgYmFkZ2VTdHlsZSwgXCJtdy0xMDBcIl1dO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNC42L2NvbXBvbmVudHMvYmFkZ2UvXHJcbiAgICAgIGNsYXNzZXMgPSBbLi4uY2xhc3NlcywgLi4uW1wibXItMlwiLCBcImJhZGdlLVwiICsgYmFkZ2VTdHlsZV1dO1xyXG4gICAgfVxyXG4gICAgc3Bhbi5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xyXG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoVkFMVUVfQVRUUklCVVRFLCB2YWx1ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuYWxsb3dDbGVhcikge1xyXG4gICAgICBjb25zdCBjbG9zZUNsYXNzID0gY2xhc3Nlcy5pbmNsdWRlcyhcInRleHQtZGFya1wiKVxyXG4gICAgICAgID8gXCJidG4tY2xvc2VcIlxyXG4gICAgICAgIDogXCJidG4tY2xvc2Utd2hpdGVcIjtcclxuICAgICAgbGV0IGJ0bk1hcmdpbjtcclxuICAgICAgbGV0IGJ0bkZsb2F0O1xyXG4gICAgICBpZiAodGhpcy5jbGVhckVuZCkge1xyXG4gICAgICAgIGJ0bk1hcmdpbiA9IGJ2ZXIgPT09IDUgPyBcIm1zLTJcIiA6IFwibWwtMlwiO1xyXG4gICAgICAgIGJ0bkZsb2F0ID0gYnZlciA9PT0gNSA/IFwiZmxvYXQtZW5kXCIgOiBcImZsb2F0OnJpZ2h0O1wiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bk1hcmdpbiA9IGJ2ZXIgPT09IDUgPyBcIm1lLTJcIiA6IFwibXItMlwiO1xyXG4gICAgICAgIGJ0bkZsb2F0ID0gYnZlciA9PT0gNSA/IFwiZmxvYXQtc3RhcnRcIiA6IFwiZmxvYXQ6bGVmdDtcIjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBidG4gPVxyXG4gICAgICAgIGJ2ZXIgPT09IDVcclxuICAgICAgICAgID8gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIHN0eWxlPVwiZm9udC1zaXplOjAuNjVlbVwiIGNsYXNzPVwiJyArXHJcbiAgICAgICAgICAgIGJ0bk1hcmdpbiArXHJcbiAgICAgICAgICAgIFwiIFwiICtcclxuICAgICAgICAgICAgYnRuRmxvYXQgK1xyXG4gICAgICAgICAgICBcIiBidG4tY2xvc2UgXCIgK1xyXG4gICAgICAgICAgICBjbG9zZUNsYXNzICtcclxuICAgICAgICAgICAgJ1wiIGFyaWEtbGFiZWw9XCInICtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckxhYmVsICtcclxuICAgICAgICAgICAgJ1wiPjwvYnV0dG9uPidcclxuICAgICAgICAgIDogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIHN0eWxlPVwiZm9udC1zaXplOjFlbTsnICtcclxuICAgICAgICAgICAgYnRuRmxvYXQgK1xyXG4gICAgICAgICAgICAndGV4dC1zaGFkb3c6bm9uZTtjb2xvcjpjdXJyZW50Q29sb3I7dHJhbnNmb3JtOnNjYWxlKDEuMilcIiBjbGFzcz1cIicgK1xyXG4gICAgICAgICAgICBidG5NYXJnaW4gK1xyXG4gICAgICAgICAgICAnIGNsb3NlXCIgYXJpYS1sYWJlbD1cIicgK1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyTGFiZWwgK1xyXG4gICAgICAgICAgICAnXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj4nO1xyXG4gICAgICBodG1sID0gYnRuICsgaHRtbDtcclxuICAgIH1cclxuXHJcbiAgICBzcGFuLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB0aGlzLl9jb250YWluZXJFbGVtZW50Lmluc2VydEJlZm9yZShzcGFuLCB0aGlzLl9zZWFyY2hJbnB1dCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYWxsb3dDbGVhcikge1xyXG4gICAgICBzcGFuLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKHZhbHVlKTtcclxuICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgICAgdGhpcy5fYWRqdXN0V2lkdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdlIG5lZWQgdG8gY3JlYXRlIGEgbmV3IG9wdGlvblxyXG4gICAgaWYgKCFvcHQpIHtcclxuICAgICAgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgb3B0LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIG9wdC50ZXh0Q29udGVudCA9IHRleHQ7IC8vIGlubmVyVGV4dCBpcyBub3Qgd2VsbCBzdXBwb3J0ZWQgYnkganNkb21cclxuICAgICAgLy8gUGFzcyBhbG9uZyBkYXRhIHByb3ZpZGVkXHJcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGRhdGEpKSB7XHJcbiAgICAgICAgb3B0LmRhdGFzZXRba2V5XSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3NlbGVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgc2VsZWN0LCB3ZSBuZWVkIHRvIHNldCBhdHRyaWJ1dGUgZm9yIG9wdGlvbltzZWxlY3RlZF1cclxuICAgIG9wdC5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcInNlbGVjdGVkXCIpO1xyXG4gICAgb3B0LnNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBGaXJlIGNoYW5nZSBldmVudFxyXG4gICAgaWYgKHRoaXMuX2ZpcmVFdmVudHMpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUl0ZW0odmFsdWUsIG5vRXZlbnRzID0gZmFsc2UpIHtcclxuICAgIGxldCBpdGVtID0gdGhpcy5fY29udGFpbmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcInNwYW5bXCIgKyBWQUxVRV9BVFRSSUJVVEUgKyAnPVwiJyArIHZhbHVlICsgJ1wiXSdcclxuICAgICk7XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaXRlbS5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgc2VsZWN0XHJcbiAgICBsZXQgb3B0ID0gdGhpcy5fc2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnb3B0aW9uW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXSdcclxuICAgICk7XHJcbiAgICBpZiAob3B0KSB7XHJcbiAgICAgIG9wdC5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgb3B0LnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBGaXJlIGNoYW5nZSBldmVudFxyXG4gICAgICBpZiAodGhpcy5fZmlyZUV2ZW50cyAmJiAhbm9FdmVudHMpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgICAgICBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgeyBidWJibGVzOiB0cnVlIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ha2UgaW5wdXQgdmlzaWJsZVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLl9zZWFyY2hJbnB1dC5zdHlsZS52aXNpYmlsaXR5ID09IFwiaGlkZGVuXCIgJiZcclxuICAgICAgdGhpcy5tYXggJiZcclxuICAgICAgdGhpcy5nZXRTZWxlY3RlZFZhbHVlcygpLmxlbmd0aCA8IHRoaXMubWF4XHJcbiAgICApIHtcclxuICAgICAgdGhpcy5fc2VhcmNoSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFncztcclxuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbi8vIGxldCBTaGVrZWwgPSAoKCkgPT4ge1xyXG4vLyAgIC8vIENvZGUgdGhhdCBydW5zIGluIHlvdXIgZnVuY3Rpb25cclxuLy8gICBVdGlsaXR5ID0ge1xyXG4vLyAgICAgaXNNb2JpbGU6ICgpID0+IHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2MHB4KVwiKS5tYXRjaGVzLFxyXG4vLyAgIH07XHJcbi8vIH0pKCk7XHJcblxyXG5sZXQgU2hla2VsID0gd2luZG93LlNoZWtlbCB8fCB7fTtcclxuKCgpID0+IHtcclxuICBTaGVrZWwuVXRpbGl0eSA9IFNoZWtlbC5VdGlsaXR5IHx8IHt9O1xyXG4gIFNoZWtlbC5VdGlsaXR5LmlzTW9iaWxlID0gKCkgPT5cclxuICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2MHB4KVwiKS5tYXRjaGVzO1xyXG5cclxuICBTaGVrZWwuVXRpbGl0eS5pc0xvY2FsU3RvcmFnZUF2YWlsYWJsZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRlc3QgPSBcInRlc3RcIjtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRlc3QsIHRlc3QpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBTaGVrZWwuVXRpbGl0eS5HdWlkID0gKCkgPT4gdXVpZHY0KCk7XHJcblxyXG4gIC8vIFNoZWtlbC5VaWxpdHkuZ2V0UHJldmlvdXNTaWJsaW5nID0gKGVsZW0sIGNhbGxiYWNrKSA9PiB7XHJcbiAgLy8gICAvLyBHZXQgdGhlIG5leHQgc2libGluZyBlbGVtZW50XHJcbiAgLy8gICBsZXQgc2libGluZyA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgLy8gICAvLyBJZiB0aGVyZSdzIG5vIGNhbGxiYWNrLCByZXR1cm4gdGhlIGZpcnN0IHNpYmxpbmdcclxuICAvLyAgIGlmICghY2FsbGJhY2sgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzaWJsaW5nO1xyXG5cclxuICAvLyAgIC8vIElmIHRoZSBzaWJsaW5nIG1hdGNoZXMgb3VyIHRlc3QgY29uZGl0aW9uLCB1c2UgaXRcclxuICAvLyAgIC8vIElmIG5vdCwganVtcCB0byB0aGUgbmV4dCBzaWJsaW5nIGFuZCBjb250aW51ZSB0aGUgbG9vcFxyXG4gIC8vICAgbGV0IGluZGV4ID0gMDtcclxuICAvLyAgIHdoaWxlIChzaWJsaW5nKSB7XHJcbiAgLy8gICAgIGlmIChjYWxsYmFjayhzaWJsaW5nLCBpbmRleCwgZWxlbSkpIHJldHVybiBzaWJsaW5nO1xyXG4gIC8vICAgICBpbmRleCsrO1xyXG4gIC8vICAgICBzaWJsaW5nID0gc2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gIC8vICAgfVxyXG4gIC8vIH07XHJcbn0pKCk7XHJcblxyXG53aW5kb3cuU2hla2VsID0gU2hla2VsO1xyXG5cclxuZnVuY3Rpb24gYmFza2V0SXRlbShcclxuICBpZCxcclxuICBicmFuZCxcclxuICBuYW1lLFxyXG4gIGltYWdlLFxyXG4gIHByaWNlMSxcclxuICBwcmljZTIsXHJcbiAgdmF0LFxyXG4gIHZhdHBlcmNlbnQsXHJcbiAgY29kZSxcclxuICBiYXJjb2RlLFxyXG4gIGNhbXBhaWduLFxyXG4gIHF1YW50aXR5XHJcbikge1xyXG4gIHRoaXMuaWQgPSBOdW1iZXIucGFyc2VJbnQoaWQsIDEwKTtcclxuICB0aGlzLmJyYW5kID0gYnJhbmQ7XHJcbiAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgdGhpcy5wcmljZTIgPSBwYXJzZUZsb2F0KHByaWNlMik7XHJcbiAgdGhpcy5wcmljZTEgPSBwYXJzZUZsb2F0KHByaWNlMSk7XHJcbiAgdGhpcy52YXQgPSBwYXJzZUZsb2F0KHZhdCk7XHJcbiAgdGhpcy52YXRwZXJjZW50ID0gcGFyc2VGbG9hdCh2YXRwZXJjZW50KTtcclxuICB0aGlzLmNvZGUgPSBjb2RlO1xyXG4gIHRoaXMuYmFyY29kZSA9IGJhcmNvZGU7XHJcbiAgdGhpcy5jYW1wYWlnbiA9IGNhbXBhaWduO1xyXG4gIHRoaXMucXVhbnRpdHkgPSBOdW1iZXIucGFyc2VJbnQocXVhbnRpdHksIDEwKTtcclxufVxyXG5cclxud2luZG93LmJhc2tldEl0ZW0gPSBiYXNrZXRJdGVtO1xyXG5cclxubGV0IEJhc2tldCA9IHtcclxuICBJbml0OiAoKSA9PiB3aW5kb3cuU2hla2VsQmFza2V0IHx8IEJhc2tldC5DcmVhdGVOZXcoKSxcclxuXHJcbiAgQ3JlYXRlTmV3OiAoKSA9PiB7XHJcbiAgICB3aW5kb3cuU2hla2VsQmFza2V0ID0ge1xyXG4gICAgICBndWlkOiB1dWlkdjQoKSxcclxuICAgICAgY3JlYXRlZERhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgIGxhc3RNb2RpZmllZERhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgIGJhc2tldEl0ZW1zOiBbXSxcclxuICAgICAgY3VzdG9tZXI6IFwiXCIsXHJcbiAgICAgIHRvdGFsSXRlbXM6IDAsXHJcbiAgICAgIHN1YlRvdGFsOiAwLFxyXG4gICAgICBkaXNjb3VudFRvdGFsOiAwLFxyXG4gICAgICB2YXRUb3RhbDogMCxcclxuICAgICAgZ3JhbmRUb3RhbDogMCxcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgLy9ncmVldDogZnVuY3Rpb24gKCkge1xyXG4gIEFkZEl0ZW06IChpdGVtKSA9PiB7XHJcbiAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueXRoaW5nIHRvIGFkZCwgZXhpdFxyXG4gICAgaWYgKCFpdGVtKSByZXR1cm47XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgcXVhbnRpdHkgaXMgYSBudW1iZXJcclxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIucGFyc2VJbnQoaXRlbS5xdWFudGl0eSkpKSByZXR1cm47XHJcbiAgICAvLyBjaGVjayBpZiBhbHJlYWR5IGluIGJhc2tldC4gSWYgc28gaW5jcmVtZW50IHF1YW50aXR5IGluc3RlYWQgb2YgY3JlYXRpbmcgYSBuZXcgb25lLlxyXG4gICAgY29uc3QgaW5kZXggPSBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXMuZmluZEluZGV4KFxyXG4gICAgICAob2JqKSA9PiBvYmouaWQgPT0gaXRlbS5pZFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXNbaW5kZXhdLnF1YW50aXR5ICs9IGl0ZW0ucXVhbnRpdHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhZGQgaXRlbSB0byBjYXJ0XHJcbiAgICAgIFNoZWtlbEJhc2tldC5iYXNrZXRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICBTaGVrZWxCYXNrZXQubGFzdE1vZGlmaWVkRGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAvL2NhbGN1bGF0ZSB0b3RhbHNcclxuICAgICAgQmFza2V0LmNhbGN1bGF0ZVRvdGFscygpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIFJlbW92ZUl0ZW06IChwcm9kdWN0SWQpID0+IHtcclxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIucGFyc2VJbnQocHJvZHVjdElkLCAxMCkpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXMuZmluZEluZGV4KFxyXG4gICAgICAoeCkgPT4geC5pZCA9PT0gTnVtYmVyLnBhcnNlSW50KHByb2R1Y3RJZCwgMTApXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgU2hla2VsQmFza2V0LmJhc2tldEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIFNoZWtlbEJhc2tldC5sYXN0TW9kaWZpZWREYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIC8vIGNhbGN1bGF0ZSB0b3RhbHNcclxuICAgICAgQmFza2V0LmNhbGN1bGF0ZVRvdGFscygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCJwcm9kdWN0IG5vdCBmb3VuZFwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBDbGVhcjogKCkgPT4ge1xyXG4gICAgU2hla2VsQmFza2V0LmJhc2tldEl0ZW1zID0gW107XHJcbiAgfSxcclxuXHJcbiAgZ2V0QmFza2V0SXRlbXM6ICgpID0+IFNoZWtlbEJhc2tldC5iYXNrZXRJdGVtcyxcclxuXHJcbiAgY2FsY3VsYXRlVG90YWxzOiAoKSA9PiB7XHJcbiAgICBpZiAoIVNoZWtlbEJhc2tldC50b3RhbEl0ZW1zLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMgKHN1bSBxdWFudGl0aWVzKVxyXG4gICAgU2hla2VsQmFza2V0LnRvdGFsSXRlbXMgPSBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXNcclxuICAgICAgLm1hcCgocXR5KSA9PiBxdHkucXVhbnRpdHkpXHJcbiAgICAgIC5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgKyBuZXh0KTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgc3VidG90YWxcclxuICAgIFNoZWtlbEJhc2tldC5zdWJUb3RhbCA9IFNoZWtlbEJhc2tldC5iYXNrZXRJdGVtc1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLnF1YW50aXR5ICogaXRlbS5wcmljZTEpXHJcbiAgICAgIC5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgKyBuZXh0KTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgZGlzY291bnRUb3RhbFxyXG4gICAgU2hla2VsQmFza2V0LmRpc2NvdW50VG90YWwgPSAwO1xyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSB2YXRcclxuICAgIFNoZWtlbEJhc2tldC52YXRUb3RhbCA9IFNoZWtlbEJhc2tldC5iYXNrZXRJdGVtc1xyXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLnZhdCAqIGl0ZW0ucXVhbnRpdHkpXHJcbiAgICAgIC5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHByZXYgKyBuZXh0KTtcclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgZ3JhbmQgdG90YWxcclxuICAgIFNoZWtlbEJhc2tldC5ncmFuZFRvdGFsID1cclxuICAgICAgU2hla2VsQmFza2V0LnN1YlRvdGFsIC1cclxuICAgICAgU2hla2VsQmFza2V0LmRpc2NvdW50VG90YWwgK1xyXG4gICAgICBTaGVrZWxCYXNrZXQudmF0VG90YWw7XHJcbiAgfSxcclxufTtcclxuXHJcbndpbmRvdy5CYXNrZXQgPSBCYXNrZXQ7XHJcbkJhc2tldC5Jbml0KCk7XHJcbiIsImltcG9ydCBUYWdzIGZyb20gXCIuL1RhZ3NcIjtcclxuaW1wb3J0IFwiLi9pbmRleC5qc1wiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgVGFncy5pbml0KFwiLnRvYmVUYWdnZWRcIik7XHJcblxyXG4gIC8vI3JlZ2lvbiAtIGdsb2JhbCB2YXJpYWJsZXNcclxuICAvLyB2YXJpYWJsZXMgZm9yIGVuYWJsaW5nIHVwL2Rvd24gYXJyb3cga2V5cyBmb3IgcHJvZHVjdCBzZWxlY3Rpb25cclxuICAvLyBpbiB0aGUgcHJvZHVjdCBzdWdnZXN0aW9ucyBkaXYgaW4gb3JkZXIgY3JlYXRlIG9mZmNhbnZhc1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBwcm9kdWN0c1NlYXJjaFRleHRCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNlYXJjaFByb2R1Y3RzXCIpO1xyXG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bFByb2R1Y3RTdWdnZXN0aW9uc1wiKTtcclxuICBjb25zdCBwcm9kdWN0UXVhbnRpdHlEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiZGlhbG9nUHJvZHVjdFF1YW50aXR5XCJcclxuICApO1xyXG4gIGNvbnN0IGRpdlByb2R1Y3RTZWFyY2hTdWdnZXN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJkaXZQcm9kdWN0U2VhcmNoU3VnZ2VzdGlvbnNcIlxyXG4gICk7XHJcbiAgY29uc3QgZGl2T3JkZXJQcm9kdWN0U2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcmRlclByb2R1Y3RTZWFyY2hcIik7XHJcblxyXG4gIGNvbnN0IHVsQmFza2V0SXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVsQmFza2V0SXRlbXNcIik7XHJcblxyXG4gIC8vIG9yZGVyIGNyZWF0ZSB2YXJpYWJsZXNcclxuICBjb25zdCBoZG5Qcm9kdWN0SWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhkblByb2R1Y3RJZFwiKTtcclxuICBjb25zdCBzcG5Qcm9kdWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZHVjdE5hbWVTcGFuXCIpO1xyXG4gIGNvbnN0IGRkbFByb2R1Y3RRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGRsUHJvZHVjdFF1YW50aXR5XCIpO1xyXG4gIGNvbnN0IGZybUFjY2VwdFByb2R1Y3RRdWFudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJmcm1BY2NlcHRQcm9kdWN0UXVhbnRpdHlcIlxyXG4gICk7XHJcbiAgY29uc3QgYnRuUXVhbnRpdHlEaWFsb2dBZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0blF1YW50aXR5RGlhbG9nQWRkXCIpO1xyXG4gIGNvbnN0IGJ0blF1YW50aXR5RGlhbG9nQ2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcImJ0blF1YW50aXR5RGlhbG9nQ2FuY2VsXCJcclxuICApO1xyXG4gIGNvbnN0IG9mZkNhbnZhc09yZGVyQ3JlYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvZmZDYW52YXNPcmRlckNyZWF0ZVwiKTtcclxuXHJcbiAgLy8gcHJpbnQgc3VtbWFyeSB0YWJsZVxyXG4gIGNvbnN0IHNwYW5TdWJUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BhblN1YlRvdGFsXCIpO1xyXG4gIGNvbnN0IHNwYW5EaXNjb3VudFRvdGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFuRGlzY291bnRUb3RhbFwiKTtcclxuICBjb25zdCBzcGFuVmF0VG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYW5WYXRUb3RhbFwiKTtcclxuICBjb25zdCBzcGFuR3JhbmRUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BhbkdyYW5kVG90YWxcIik7XHJcbiAgY29uc3Qgc2hvd0FmdGVyQmFza2V0SGFzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgXCIuc2hvd0FmdGVyQmFza2V0SGFzSXRlbVwiXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxXCIpO1xyXG4gIGNvbnN0IHNlYXJjaGRkbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGl2U2VhcmNoU3VnZ2VzdGlvbnNXcmFwcGVyXCIpO1xyXG4gIGNvbnN0IG9yZGVyc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3JkZXJzXCIpO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKiBPUkRFUiBDUkVBVEUgKioqKioqKioqKioqKioqKioqKlxyXG4gIGNvbnN0IGRkbEN1c3RvbWVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGRsQ3VzdG9tZXJzXCIpO1xyXG4gIGNvbnN0IGRkbEN1c3RvbWVyc1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwib3JkZXJDcmVhdGVTZWxlY3RDdXN0b21lclwiXHJcbiAgKTtcclxuXHJcbiAgbGV0IGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbjtcclxuICBsZXQgbGlQcm9kdWN0SW5kZXggPSAtMTtcclxuICBsZXQgbmV4dDtcclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vIGxvYWQgdGhpcyBmcm9tIHNlcnZlciBpbiBwcm9kdWN0aW9uXHJcbiAgbGV0IHByb2R1Y3RzO1xyXG4gIGNvbnN0IHByb2R1Y3RzUHJvbWlzZSA9IGZldGNoKFwiLi9Qcm9kdWN0cy5qc29uXCIpXHJcbiAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXHJcbiAgICAudGhlbigocmVzdWx0cykgPT4gKHByb2R1Y3RzID0gcmVzdWx0cykpO1xyXG5cclxuICAvLyBFTkQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLy8gbW92ZSB1cCBhbmQgZG93blxyXG4gIGNvbnN0IFByb2R1Y3RTZWxlY3Rpb25XaXRoS2V5Ym9hcmQgPSAoZXZlbnQpID0+IHtcclxuICAgIC8vIGlmIHN1Z2dlc3Rpb24gbGlzdCBpcyBub3Qgb3BlbiB0aGVyZSBpcyBubyBuZWVkIHRvIGxpc3RlbiBmb3IgdGhpcyBldmVudC4uLlxyXG4gICAgaWYgKHVsLmNsYXNzTGlzdC5jb250YWlucyhcImQtbm9uZVwiKSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIExJU1QgU0VMRUNUSU9OIEZPUiBQUk9EVUNUIFNVR0dFU1RJT05TIElOIE9SREVSIENSRUFURVxyXG4gICAgY29uc3QgbGVuID0gdWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKS5sZW5ndGggLSAxO1xyXG4gICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgbGlQcm9kdWN0SW5kZXgrKztcclxuICAgICAgLy9kb3duXHJcbiAgICAgIGlmIChsaVNlbGVjdGVkUHJvZHVjdFN1Z2dlc3Rpb24pIHtcclxuICAgICAgICBsaVNlbGVjdGVkUHJvZHVjdFN1Z2dlc3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImJnLWxpZ2h0XCIpO1xyXG4gICAgICAgIG5leHQgPSB1bC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpW2xpUHJvZHVjdEluZGV4XTtcclxuICAgICAgICBpZiAodHlwZW9mIG5leHQgIT09IHVuZGVmaW5lZCAmJiBsaVByb2R1Y3RJbmRleCA8PSBsZW4pIHtcclxuICAgICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbiA9IG5leHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxpUHJvZHVjdEluZGV4ID0gMDtcclxuICAgICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbiA9IHVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlcIilbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbi5jbGFzc0xpc3QuYWRkKFwiYmctbGlnaHRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGlQcm9kdWN0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICBsaVNlbGVjdGVkUHJvZHVjdFN1Z2dlc3Rpb24gPSB1bC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpWzBdO1xyXG4gICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbi5jbGFzc0xpc3QuYWRkKFwiYmctbGlnaHRcIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gXCJBcnJvd1VwXCIpIHtcclxuICAgICAgLy91cFxyXG4gICAgICBpZiAobGlTZWxlY3RlZFByb2R1Y3RTdWdnZXN0aW9uKSB7XHJcbiAgICAgICAgbGlTZWxlY3RlZFByb2R1Y3RTdWdnZXN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJiZy1saWdodFwiKTtcclxuICAgICAgICBsaVByb2R1Y3RJbmRleC0tO1xyXG4gICAgICAgIG5leHQgPSB1bC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpW2xpUHJvZHVjdEluZGV4XTtcclxuICAgICAgICBpZiAodHlwZW9mIG5leHQgIT09IHVuZGVmaW5lZCAmJiBsaVByb2R1Y3RJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICBsaVNlbGVjdGVkUHJvZHVjdFN1Z2dlc3Rpb24gPSBuZXh0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsaVByb2R1Y3RJbmRleCA9IGxlbjtcclxuICAgICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbiA9IHVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlcIilbbGVuXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlTZWxlY3RlZFByb2R1Y3RTdWdnZXN0aW9uLmNsYXNzTGlzdC5hZGQoXCJiZy1saWdodFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsaVByb2R1Y3RJbmRleCA9IDA7XHJcbiAgICAgICAgbGlTZWxlY3RlZFByb2R1Y3RTdWdnZXN0aW9uID0gdWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKVtsZW5dO1xyXG4gICAgICAgIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbi5jbGFzc0xpc3QuYWRkKFwiYmctbGlnaHRcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChsaVNlbGVjdGVkUHJvZHVjdFN1Z2dlc3Rpb24pIGxpU2VsZWN0ZWRQcm9kdWN0U3VnZ2VzdGlvbi5mb2N1cygpO1xyXG4gIH07XHJcbiAgLy8gZXZlbnQgaGFuZGxlciB0byBkZXRlY3Qga2V5ZG93biBvZiB1cCBhbmQgZG93biBhcnJvdyBrZXlzIHRvIGVuYWJsZVxyXG4gIC8vIHNlbGVjdGlvbiBvZiBhIHBhcnRpY3VsYXIgcHJvZHVjdCBpbiB0aGUgcHJvZHVjdCBzdWdnZXN0aW9ucyBkaXZcclxuICAvLyBpbiBvcmRlciBjcmVhdGUgb2ZmY2FudmFzXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgIFwia2V5dXBcIixcclxuICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vIGlmIHF1YW50aXR5IGRpYWxvZyBpcyBvcGVuLCB3ZSBkb24ndCBtZWFuIHRvIHNlbGVjdCBhIHByb2R1Y3QgYW5kIGl0IG1lYW5zXHJcbiAgICAgIC8vIHdlIGFyZSBwcmVzc2luZyB0aGUga2V5cyB0byBzZWxlY3QgcXVhbnRpdHkuIFNvIGRvIG5vdCBuYXZpZ2F0ZSB0aGUgcHJvZHVjdCBsaXN0XHJcbiAgICAgIC8vIGlmIHRoZSBwcm9kdWN0IHF1YW50aXR5IGRpYWxvZyBpcyBvcGVuLi5cclxuXHJcbiAgICAgIGlmICghcHJvZHVjdFF1YW50aXR5RGlhbG9nLm9wZW4pIHtcclxuICAgICAgICBQcm9kdWN0U2VsZWN0aW9uV2l0aEtleWJvYXJkKGUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmFsc2VcclxuICApO1xyXG5cclxuICAvLyBqdXN0IGFib3V0IHdoZW4gdGhlIE9yZGVyQ3JlYXRlIG9mZmNhbnZhcyBpcyBhYm91dCB0byBjbG9zZSwgY2hlY2sgaWYgcHJvZHVjdCBzdWdnZXN0aW9ucyBpcyBvcGVuLlxyXG4gIC8vIGlmIHByb2R1Y3Qgc3VnZ2VzdGlvbnMgZGl2IGlzIG9wZW4sIHRoZW4gd2UgcHJvYmFibHkgbWVhbiB0byBjbG9zZSB0aGF0LCBpbnN0ZWFkIG9mIHRoZSBvZmZjYW52YXMgd2hlbiB3ZVxyXG4gIC8vIGluaXRpYWxseSBwcmVzc2VkIHRoZSBFU0Mga2V5LlxyXG4gIG9mZkNhbnZhc09yZGVyQ3JlYXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJoaWRlLmJzLm9mZmNhbnZhc1wiLCAoZSkgPT4ge1xyXG4gICAgaWYgKCFkaXZQcm9kdWN0U2VhcmNoU3VnZ2VzdGlvbnMuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZC1ub25lXCIpKSB7XHJcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXMubGVuZ3RoID4gMCAmJlxyXG4gICAgICBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXMgIT0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgICAgY29uc29sZS5sb2coU2hla2VsQmFza2V0LmJhc2tldEl0ZW1zKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICFjb25maXJtKFxyXG4gICAgICAgICAgXCJZYXLEsW0ga2FsbcSxxZ8gYnUgc2lwYXJpxZ8gdGFtYW1lbiBzaWxpbmVjZWsuIE9uYXlsxLF5b3IgbXVzdW51ej9cIlxyXG4gICAgICAgIClcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjdXN0b21lckRlU2VsZWN0ZWQoKTtcclxuICAgICAgICByZXNldE9yZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIC8vIGlmIHF1YW50aXR5IGRpYWxvZyAob3JkZXIgY3JlYXRlKSBvcGVuLCBjbG9zZSBpdCBhbmQgZG8gbm90IHByb3BhZ2V0ZVxyXG4gICAgICBpZiAocHJvZHVjdFF1YW50aXR5RGlhbG9nLm9wZW4pIHtcclxuICAgICAgICBidG5RdWFudGl0eURpYWxvZ0NhbmNlbC5jbGljaygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBvciBpZiB0aGUgcHJvZHVjdCBzdWdnZXN0aW9ucyBkaXYgaXMgb3BlbiwgdGhlbiBjbG9zZSB0aGF0IG9uZS5cclxuICAgICAgfSBlbHNlIGlmICghZGl2UHJvZHVjdFNlYXJjaFN1Z2dlc3Rpb25zLmNsYXNzTGlzdC5jb250YWlucyhcImQtbm9uZVwiKSkge1xyXG4gICAgICAgIGRpdlByb2R1Y3RTZWFyY2hTdWdnZXN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmIChvZmZDYW52YXNPcmRlckNyZWF0ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpKSB7XHJcbiAgICAgICAgLy8gZmluZCBhIHdheSB0byBwcm9ncmFtYXRpY2FsbHkgaGlkZSBvZmZjYW52YXMuXHJcbiAgICAgICAgLy8gdW50aWwgdGhlbiwgd2UgdHJpZ2dlciBjbGljayBldmVudCBvZiB0aGUgY2xvc2UgYnV0dG9uLi4uXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5DbG9zZU9mZkNhbnZhc09yZGVyQ3JlYXRlXCIpLmNsaWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gd2Ugc3RvcCBwcm9wYWdhdGlvbiBmb3IgdGhlIGNsaWNrIGV2ZW50IG9mIHRoZSBiZWxvdyB0d28gYnV0dG9ucyBpbiBvcmRlclxyXG4gIC8vIHRvIHByZXZlbnQgb3BlbiBwcm9kdWN0IHN1Z2dlc3Rpb24gZGl2IGZyb20gY2xvc2luZyB3aGVuIHRoZXNlIGFyZSBjbGlja2VkLlxyXG4gIGJ0blF1YW50aXR5RGlhbG9nQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxuXHJcbiAgYnRuUXVhbnRpdHlEaWFsb2dBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkaXNwbGF5UXVhbnRpdHlNb2RhbCA9IChlbCkgPT4ge1xyXG4gICAgY29uc3QgaXRlbSA9IG5ldyBiYXNrZXRJdGVtKFxyXG4gICAgICBlbC5kYXRhc2V0LmlkLFxyXG4gICAgICBlbC5kYXRhc2V0LmJyYW5kLFxyXG4gICAgICBlbC5kYXRhc2V0Lm5hbWUsXHJcbiAgICAgIGVsLmRhdGFzZXQuaW1hZ2UsXHJcbiAgICAgIGVsLmRhdGFzZXQucHJpY2UxLFxyXG4gICAgICBlbC5kYXRhc2V0LnByaWNlMixcclxuICAgICAgZWwuZGF0YXNldC52YXQsXHJcbiAgICAgIGVsLmRhdGFzZXQudmF0cGVyY2VudCxcclxuICAgICAgZWwuZGF0YXNldC5jb2RlLFxyXG4gICAgICBlbC5kYXRhc2V0LmJhcmNvZGUsXHJcbiAgICAgIGVsLmRhdGFzZXQuY2FtcGFpZ25pZCxcclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGhkbkJhc2tldEl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhkbkJhc2tldEl0ZW1cIik7XHJcbiAgICBoZG5CYXNrZXRJdGVtLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XHJcblxyXG4gICAgaGRuUHJvZHVjdElkLnZhbHVlID0gaXRlbS5pZDtcclxuICAgIHNwblByb2R1Y3ROYW1lLnRleHRDb250ZW50ID0gaXRlbS5uYW1lO1xyXG5cclxuICAgIHByb2R1Y3RRdWFudGl0eURpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgIGRkbFByb2R1Y3RRdWFudGl0eS5mb2N1cygpO1xyXG4gIH07XHJcblxyXG4gIC8vIGRvY3VtZW50XHJcbiAgLy8gICAuZ2V0RWxlbWVudEJ5SWQoXCJidG5Db25maXJtUHJvZHVjdFF1YW50aXR5XCIpXHJcbiAgLy8gICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmcm1BY2NlcHRQcm9kdWN0UXVhbnRpdHlcIikuc3VibWl0KCk7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gZm9ybSB2YWx1ZXMgaW5zaWRlIG9mIHRoZSBkaWFsb2cgZWxlbWVudCBjYW4gYmUgcmVjZWl2ZWQgYnkgbm90XHJcbiAgLy8gbGlzdGVuaW5nIHRvIGZvcm0gc3VibWl0IGV2ZW50IGJ1dCBieSBsaXN0ZW5pbmcgdG8gZGlhbG9nIGNsb3NlIGV2ZW50LlxyXG4gIC8vIGh0dHBzOi8vYmxvZy5sb2dyb2NrZXQuY29tL3VzaW5nLXRoZS1kaWFsb2ctZWxlbWVudC9cclxuXHJcbiAgcHJvZHVjdFF1YW50aXR5RGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoZSkgPT4ge1xyXG4gICAgaWYgKHByb2R1Y3RRdWFudGl0eURpYWxvZy5yZXR1cm5WYWx1ZSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICBoZG5Qcm9kdWN0SWQudmFsdWUgPSBcIlwiO1xyXG4gICAgICBkZGxQcm9kdWN0UXVhbnRpdHkuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgIHNwblByb2R1Y3ROYW1lLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgcHJvZHVjdHNTZWFyY2hUZXh0Qm94LmZvY3VzKCk7XHJcbiAgICB9IGVsc2UgaWYgKHByb2R1Y3RRdWFudGl0eURpYWxvZy5yZXR1cm5WYWx1ZSA9PT0gXCJzZW5kXCIpIHtcclxuICAgICAgLy8gc3VibWl0IHRoZSBmb3JtXHJcbiAgICAgIGZybUFjY2VwdFByb2R1Y3RRdWFudGl0eS5zdWJtaXQoKTtcclxuXHJcbiAgICAgIC8vIGNvbnZlcnQgdGhlIGhpZGRlbiB0ZXh0Ym94IHZhbHVlIG9mIHRoZSBiYXNrZXQgb2JqZWN0IGludG8gYSB2YWxpZCBKU09OIG9iamVjdFxyXG4gICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShoZG5CYXNrZXRJdGVtLnZhbHVlKTtcclxuICAgICAgbGV0IG9yZGVyZWRJdGVtID0gbmV3IGJhc2tldEl0ZW0oXHJcbiAgICAgICAgTnVtYmVyLnBhcnNlSW50KGpzb24uaWQpLFxyXG4gICAgICAgIGpzb24uYnJhbmQsXHJcbiAgICAgICAganNvbi5uYW1lLFxyXG4gICAgICAgIGpzb24uaW1hZ2UsXHJcbiAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQoanNvbi5wcmljZTEpLFxyXG4gICAgICAgIE51bWJlci5wYXJzZUZsb2F0KGpzb24ucHJpY2UyKSxcclxuICAgICAgICBOdW1iZXIucGFyc2VGbG9hdChqc29uLnZhdCksXHJcbiAgICAgICAgTnVtYmVyLnBhcnNlRmxvYXQoanNvbi52YXRwZXJjZW50KSxcclxuICAgICAgICBqc29uLmNvZGUsXHJcbiAgICAgICAganNvbi5iYXJjb2RlLFxyXG4gICAgICAgIGpzb24uY2FtcGFpZ25cclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIGFzaWduIHRoZSBvcmRlciBxdWFudGl0eVxyXG4gICAgICBvcmRlcmVkSXRlbS5xdWFudGl0eSA9IE51bWJlci5wYXJzZUludChkZGxQcm9kdWN0UXVhbnRpdHkudmFsdWUpO1xyXG5cclxuICAgICAgLy8gcmVzZXQgZm9ybSB2YWx1ZXNcclxuICAgICAgaGRuUHJvZHVjdElkLnZhbHVlID0gXCJcIjtcclxuICAgICAgZGRsUHJvZHVjdFF1YW50aXR5LnZhbHVlID0gXCIxXCI7XHJcbiAgICAgIHNwblByb2R1Y3ROYW1lLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgaGRuQmFza2V0SXRlbS52YWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAvL2ZvY3VzIGJhY2sgaW4gdGhlIHByb2R1Y3Qgc2VhcmNoIHRleHRib3hcclxuICAgICAgcHJvZHVjdHNTZWFyY2hUZXh0Qm94LmZvY3VzKCk7XHJcblxyXG4gICAgICAvLyB1cGRhdGUgdGhlIHVzZXIgYmFza2V0XHJcbiAgICAgIEJhc2tldC5BZGRJdGVtKG9yZGVyZWRJdGVtKTtcclxuXHJcbiAgICAgIC8vIHNhdmUgc2hla2VsYmFza2V0IHRvIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgaWYgKFNoZWtlbC5VdGlsaXR5LmlzTG9jYWxTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTaGVrZWxCYXNrZXRcIiwgSlNPTi5zdHJpbmdpZnkoU2hla2VsQmFza2V0KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGluamVjdCBhIHByb2R1Y3Qgcm93IGludG8gdGhlIGRvbVxyXG4gICAgICBkcmF3UHJvZHVjdFJvd3MoKTtcclxuXHJcbiAgICAgIC8vIGRpc3BsYXkgYSBjb25maXJtYXRpb24gdG9hc3QgZm9yIHRoZSBhZGRlZCBwcm9kdWN0XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIudG9hc3QtYm9keVwiXHJcbiAgICAgICkudGV4dENvbnRlbnQgPSBgJHtvcmRlcmVkSXRlbS5xdWFudGl0eX0gYWRldCAke29yZGVyZWRJdGVtLm5hbWV9IHNlcGV0ZSBla2xlbmRpLmA7XHJcbiAgICAgIGNvbnN0IHRvYXN0ID0gbmV3IGJvb3RzdHJhcC5Ub2FzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvYXN0XCIpLCB7XHJcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBkZWxheTogMzAwMCxcclxuICAgICAgfSk7XHJcbiAgICAgIHRvYXN0LnNob3coKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gZHJhd1Byb2R1Y3RSb3dzKCkge1xyXG4gICAgdWxCYXNrZXRJdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1zID0gU2hla2VsQmFza2V0LmJhc2tldEl0ZW1zO1xyXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB1bEJhc2tldEl0ZW1zLmlubmVySFRNTCArPSBhZGRQcm9kdWN0Um93KGl0ZW0sIFwicHJvZHVjdFJvd1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcclxuICAgICAgc2hvd0FmdGVyQmFza2V0SGFzSXRlbXMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hvd0FmdGVyQmFza2V0SGFzSXRlbXMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYW5TdWJUb3RhbC5pbm5lclRleHQgPSBTaGVrZWxCYXNrZXQuc3ViVG90YWw7XHJcbiAgICBzcGFuRGlzY291bnRUb3RhbC5pbm5lclRleHQgPSBTaGVrZWxCYXNrZXQuZGlzY291bnRUb3RhbDtcclxuICAgIHNwYW5WYXRUb3RhbC5pbm5lclRleHQgPSBTaGVrZWxCYXNrZXQudmF0VG90YWw7XHJcbiAgICBzcGFuR3JhbmRUb3RhbC5pbm5lclRleHQgPSBTaGVrZWxCYXNrZXQuZ3JhbmRUb3RhbDtcclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqIEVOVEVSIEtFWVBSRVNTIEVWRU5UICoqKioqKioqKioqKioqKiogKi9cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcclxuICAgIGlmIChlLmNvZGUgPT09IFwiRW50ZXJcIiB8fCBlLmNvZGUgPT09IFwiTnVtcGFkRW50ZXJcIikge1xyXG4gICAgICAvLyBlbnRlciBrZXlwcmVzcyBldmVudCBmb3IgUFJPRFVDVCBTVUdHRVNUSU9OIFNFTEVDVElPTlxyXG4gICAgICBpZiAoIXVsLmNsYXNzTGlzdC5jb250YWlucyhcImQtbm9uZVwiKSAmJiAhcHJvZHVjdFF1YW50aXR5RGlhbG9nLm9wZW4pIHtcclxuICAgICAgICAvLyBvbmx5IHJ1biB0aGlzIGV2ZW50IGlmIHVsIGlzIHZpc2libGUgYW5kIGlmIG1vZGFsIGlzIG5vdCBhbHJlYWR5IG9wZW5cclxuICAgICAgICBkaXNwbGF5UXVhbnRpdHlNb2RhbChlLnRhcmdldCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB0aGUgZGlhbG9nIGlzIG9wZW4sIHRoZW4gaXQgbWVhbnMgd2UgYXJlIGVudGVyaW5nIGEgcXVhbnRpdHlcclxuICAgICAgaWYgKHByb2R1Y3RRdWFudGl0eURpYWxvZy5vcGVuKSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRkbFByb2R1Y3RRdWFudGl0eSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5BZGRRdWFudGl0eVwiKS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRU5EIC0gTElTVCBTRUxFQ1RJT04gRk9SIFBST0RVQ1RTIElOIE9SREVSIENSRVJBVEVcclxuICBmdW5jdGlvbiBnZXRQcmV2aW91c1NpYmxpbmcoZWxlbSwgY2FsbGJhY2spIHtcclxuICAgIC8vIEdldCB0aGUgbmV4dCBzaWJsaW5nIGVsZW1lbnRcclxuICAgIGxldCBzaWJsaW5nID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgIC8vIElmIHRoZXJlJ3Mgbm8gY2FsbGJhY2ssIHJldHVybiB0aGUgZmlyc3Qgc2libGluZ1xyXG4gICAgaWYgKCFjYWxsYmFjayB8fCB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHNpYmxpbmc7XHJcblxyXG4gICAgLy8gSWYgdGhlIHNpYmxpbmcgbWF0Y2hlcyBvdXIgdGVzdCBjb25kaXRpb24sIHVzZSBpdFxyXG4gICAgLy8gSWYgbm90LCBqdW1wIHRvIHRoZSBuZXh0IHNpYmxpbmcgYW5kIGNvbnRpbnVlIHRoZSBsb29wXHJcbiAgICBsZXQgbGlQcm9kdWN0SW5kZXggPSAwO1xyXG4gICAgd2hpbGUgKHNpYmxpbmcpIHtcclxuICAgICAgaWYgKGNhbGxiYWNrKHNpYmxpbmcsIGxpUHJvZHVjdEluZGV4LCBlbGVtKSkgcmV0dXJuIHNpYmxpbmc7XHJcbiAgICAgIGxpUHJvZHVjdEluZGV4Kys7XHJcbiAgICAgIHNpYmxpbmcgPSBzaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBsaXN0ZW4gZm9yIHRoZSBrZXlkb3duIGV2ZW50IG9uIFByb2R1Y3QgU2VhcmNoIHRleHRib3ggKHByb2R1Y3RzU2VhcmNoVGV4dEJveClcclxuICBwcm9kdWN0c1NlYXJjaFRleHRCb3guYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IHByb2R1Y3RzU2VhcmNoVGV4dEJveC52YWx1ZTtcclxuICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA8IDMpIHJldHVybjtcclxuXHJcbiAgICAvLyBkaXNwbGF5IHByb2R1Y3Qgc3VnZ2VzdGlvbnMgZGl2XHJcbiAgICBkaXZQcm9kdWN0U2VhcmNoU3VnZ2VzdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dFRvcCA9IHByb2R1Y3RzU2VhcmNoVGV4dEJveC5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBpbnB1dEhlaWdodCA9IHByb2R1Y3RzU2VhcmNoVGV4dEJveC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBkaXZQcm9kdWN0U2VhcmNoU3VnZ2VzdGlvbnMuc3R5bGUudG9wID0gaW5wdXRUb3AgKyBpbnB1dEhlaWdodDtcclxuXHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xyXG4gICAgbGV0IGh0bWwgPSBcIlwiO1xyXG4gICAgdWwuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHJlc3VsdHMgPSBwcm9kdWN0cy5maWx0ZXIoKHApID0+XHJcbiAgICAgIHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSlcclxuICAgICk7XHJcblxyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChwKSA9PiB7XHJcbiAgICAgIGh0bWwgKz0gYWRkUHJvZHVjdFJvdyhwLCBcInNlYXJjaFwiKTtcclxuICAgICAgdWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAvLyB3ZSBhcmUgYWRkaW5nIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb250YWluZXIgZGl2IGFuZCB1c2UgZXZlbnQgYnViYmxpbmcgdG9cclxuICAvLyBsaXN0ZW4gZm9yIHRoZSBjbGljayBldmVudCBvZiB0aGUgLS0tZHluYW1pY2FsbHkgY3JlYXRlZCBidXR0b25zLS0tXHJcbiAgLy8gYmVjYXVzZSB0aGUgZXZlbnQgaGFuZGxlciB3aWxsIG5vdCBiZSBhdmFpbGFibGUgb24gdGhlIGJ1dHRvbiBpdHNlbGZcclxuICB1bC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGlmIChcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuQWRkVG9CYXNrZXRcIikgfHxcclxuICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG5BZGRUb0Jhc2tldFwiKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGVsID0gZS50YXJnZXQuY2xvc2VzdChcImxpXCIpO1xyXG4gICAgICBkaXNwbGF5UXVhbnRpdHlNb2RhbChlbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBvcmRlcnMgZGl2IGJ5IGNhbGN1bGF0aW5nIGhlaWdodCBvbiB0aGUgb3RoZXIgZWxlbWVudHMgb24gdG9wIG9mIHRoaXMgZGl2IGFuZCB0aGVuIGNvdmVyaW5nIHRoZSBjb21wbGV0ZSB2aXNpYmxlIHNwYWNlIG9mIHRoZSByZW1haW5pbmcgdmlld2FibGUgYXJlYS5cclxuICBjb25zdCBjYWxjdWxhdGVPcmRlcnNIZWlnaHQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkaXN0YW5jZUZyb21PcmRlcnNUb1RvcCA9XHJcbiAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCArIG9yZGVyc0Rpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICBvcmRlcnNEaXYuc2V0QXR0cmlidXRlKFxyXG4gICAgICBcInN0eWxlXCIsXHJcbiAgICAgIFwiaGVpZ2h0OlwiICtcclxuICAgICAgICAod2luZG93LmlubmVySGVpZ2h0IC0gZGlzdGFuY2VGcm9tT3JkZXJzVG9Ub3ApICtcclxuICAgICAgICBcInB4OyBvdmVyZmxvdy15OiBhdXRvOyBvdmVyZmxvdy14OmhpZGRlbjtcIlxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICBjYWxjdWxhdGVPcmRlcnNIZWlnaHQoKTsgLy8gcmVzaXplIG9yZGVycyBhcyBzb29uIGFzIGRvY3VtZW50IGxvYWRzXHJcblxyXG4gIC8vIGFsc28gcmVzaXplIHdoZW4gd2luZG93IGlzIHJlc2l6ZWQuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGUpID0+IGNhbGN1bGF0ZU9yZGVyc0hlaWdodCgpKTtcclxuXHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHdoZW4gc2VhcmNoIGlucHV0IGhhcyBmb2N1cyBhbmQgaXQgZGlzcGxheXMgdGhlIHN1Z2dlc3Rpb25zIGRpdi5cclxuICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpdlNlYXJjaFwiKS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGNvbnN0IGlucHV0VG9wID0gc2VhcmNoLm9mZnNldFRvcCAtIDU7XHJcbiAgICBjb25zdCBpbnB1dEhlaWdodCA9IHNlYXJjaC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBzZWFyY2hkZGwuc3R5bGUudG9wID0gaW5wdXRUb3AgKyBpbnB1dEhlaWdodDtcclxuICAgIHNlYXJjaGRkbC5jbGFzc0xpc3QudG9nZ2xlKFwiZC1ub25lXCIpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBhZGRzIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gZWxlbWVudHMgb3V0c2lkZSBvZiB0aGUgc2VhcmNoIHN1Z2dlc3Rpb25zIGRpdiBhbmQgY2xvc2VzIGl0IGlmIHRoZSBjbGlja2VkIGFyZWEgaXMgb3V0c2lkZS5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09IFwicVwiIHx8IHByb2R1Y3RRdWFudGl0eURpYWxvZy5vcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgd2l0aGluQm91bmRhcmllcyA9IGUuY29tcG9zZWRQYXRoKCkuaW5jbHVkZXMoc2VhcmNoZGRsKTtcclxuXHJcbiAgICBpZiAoIXdpdGhpbkJvdW5kYXJpZXMgJiYgIXNlYXJjaGRkbC5jbGFzc0xpc3QuY29udGFpbnMoXCJkLW5vbmVcIikpIHtcclxuICAgICAgc2VhcmNoZGRsLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGl2U2VhcmNoXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBpc0NsaWNrT3V0c2lkZU9mID0gKGVsKSA9PiB7fTsgLy8gZG8gdGhpcyBmdW5jdGlvbiBsYXRlclxyXG5cclxuICAvLyBtYWtlIEFyxZ9pdmRlIEFyYSBvcHRpb24gdmlzaWJsZSBvbmx5IGlmIFllbmkgQXJhbWEgWWFwIHJhZGlvIGlzIHNlbGVjdGVkXHJcbiAgY29uc3Qgc2VhcmNoVHlwZVJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAnaW5wdXRbbmFtZT1cInNlYXJjaFR5cGVcIl0nXHJcbiAgKTtcclxuXHJcbiAgc2VhcmNoVHlwZVJhZGlvQnV0dG9ucy5mb3JFYWNoKChyZCkgPT4ge1xyXG4gICAgcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoa1NlYXJjaEFyY2hpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgICBcImRpdkFyY2hpdmVTZWFyY2hDaGVja2JveFwiXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZC5pZCA9PT0gXCJzZWFyY2hOZXdcIlxyXG4gICAgICAgID8gY2hrU2VhcmNoQXJjaGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpXHJcbiAgICAgICAgOiBjaGtTZWFyY2hBcmNoaXZlLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyBTSEFSRSBPUkRFUiAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5TaGFyZU9yZGVyXCIpO1xyXG4gICAgY29uc3QgcmVzdWx0UGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXJyb3JOb3RpZmljYXRpb25zXCIpO1xyXG5cclxuICAgIC8vIFNoYXJlIG11c3QgYmUgdHJpZ2dlcmVkIGJ5IFwidXNlciBhY3RpdmF0aW9uXCJcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHNoYXJlRGF0YSA9IHtcclxuICAgICAgICAgIHRpdGxlOiBcIk1ETlwiLFxyXG4gICAgICAgICAgdGV4dDogXCJMZWFybiB3ZWIgZGV2ZWxvcG1lbnQgb24gTUROIVwiLFxyXG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnXCIsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYXdhaXQgbmF2aWdhdG9yLnNoYXJlKHNoYXJlRGF0YSk7XHJcbiAgICAgICAgcmVzdWx0UGFyYS50ZXh0Q29udGVudCA9IFwiTUROIHNoYXJlZCBzdWNjZXNzZnVsbHlcIjtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzdWx0UGFyYS50ZXh0Q29udGVudCA9IGBFcnJvcjogJHtlcnJ9YDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHJlbW92aW5nIGEgcHJvZHVjdCBjb21wbGV0ZWx5IGZyb20gYmFza2V0XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXZCYXNrZXRJdGVtc1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGlmIChcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuUmVtb3ZlRnJvbUJhc2tldFwiKSB8fFxyXG4gICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImJ0blJlbW92ZUZyb21CYXNrZXRcIilcclxuICAgICkge1xyXG4gICAgICBjb25zdCBwcm9kdWN0SWQgPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuY2xvc2VzdChcImxpXCIpLmRhdGFzZXQuaWQpO1xyXG5cclxuICAgICAgQmFza2V0LlJlbW92ZUl0ZW0ocHJvZHVjdElkKTtcclxuICAgICAgZHJhd1Byb2R1Y3RSb3dzKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIE9SREVSIERFVEFJTFNcclxuXHJcbiAgY29uc3QgYWRkUHJvZHVjdFJvdyA9IChwcm9kdWN0LCByZXR1cm5UeXBlKSA9PiB7XHJcbiAgICBsZXQgYWN0aW9uSHRtbCA9XHJcbiAgICAgIHJldHVyblR5cGUgPT09IFwic2VhcmNoXCJcclxuICAgICAgICA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuQWRkVG9CYXNrZXQgYnRuIGJ0bi1jaXJjbGUgYnRuLXdoaXRlIG1zLWF1dG9cIj48aSBjbGFzcz1cImZhIGZhLXBsdXNcIiA+PC9pPjwvYnV0dG9uPmBcclxuICAgICAgICA6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XHJcbiAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS1wcm9kdWN0aWQ9XCIke3Byb2R1Y3QuaWR9XCIgY2xhc3M9XCJidG5SZW1vdmVGcm9tQmFza2V0IGJ0biBidG4tY2lyY2xlIGJ0bi13aGl0ZSBiZy1zb2Z0LWRhbmdlclwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+XHJcbiAgICAgIDwvYT5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCIgdmFsdWU9XCIke3Byb2R1Y3QucXVhbnRpdHl9XCIvPlxyXG4gICAgPC9kaXY+YDtcclxuXHJcbiAgICByZXR1cm4gYDxsaSB0YWJJbmRleD1cIi0xXCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gbWItMiBib3JkZXItYm90dG9tIHBiLTJcIiBkYXRhLWlkPVwiJHtwcm9kdWN0LmlkfVwiIGRhdGEtYnJhbmQ9XCIke3Byb2R1Y3QuYnJhbmR9XCIgZGF0YS1uYW1lPVwiJHtwcm9kdWN0Lm5hbWV9XCIgZGF0YS1wcmljZTE9XCIke3Byb2R1Y3QucHJpY2UxfVwiIFxyXG4gICAgICAgICAgZGF0YS1wcmljZTI9XCIke3Byb2R1Y3QucHJpY2UyfVwiIFxyXG4gICAgICAgICAgZGF0YS12YXQ9XCIke3Byb2R1Y3QudmF0fVwiIFxyXG4gICAgICAgICAgZGF0YS12YXQtcGVyY2VudD1cIiR7cHJvZHVjdC52YXRwZXJjZW50fVwiIFxyXG4gICAgICAgICAgZGF0YS1jb2RlPVwiJHtwcm9kdWN0LmNvZGV9XCIgXHJcbiAgICAgICAgICBkYXRhLWltYWdlPVwiJHtwcm9kdWN0LmltYWdlfVwiXHJcbiAgICAgICAgICBkYXRhLWJhcmNvZGU9XCI0NjQ1NjQ2NDY1NDY0XCIgZGF0YS1jYW1wYWlnbmlkPVwiMlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LXN0YXJ0XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi8ke3Byb2R1Y3QuaW1hZ2V9XCIgZGF0YS1zcmM9XCIuLyR7cHJvZHVjdC5pbWFnZX1cIiBjbGFzcz1cIm1lLTJcIiB3aWR0aD1cIjYwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMVwiPlxyXG4gICAgICAgICAgICAgIDxzbWFsbCBjbGFzcz1cImJyYW5kXCI+JHtwcm9kdWN0LmJyYW5kfTwvc21hbGw+IDxzbWFsbCBjbGFzcz1cInByb2R1Y3Rjb2RlXCI+JHtwcm9kdWN0LmNvZGV9PC9zbWFsbD48YnIvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdG5hbWVcIj48c3Ryb25nPiR7cHJvZHVjdC5uYW1lfTwvc3Ryb25nPjwvc3Bhbj4gPGJyLz48c3BhbiBjbGFzcz1cInByaWNlXCI+VG9wdGFuOiAke3Byb2R1Y3QucHJpY2UxfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwcmljZVwiPlBTRjogJHtwcm9kdWN0LnByaWNlMn08L3NwYW4+IDxzcGFuIGNsYXNzPVwicHJpY2VcIj5LRFY6ICR7cHJvZHVjdC52YXR9ICglJHtwcm9kdWN0LnZhdHBlcmNlbnR9KTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICR7YWN0aW9uSHRtbH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L2xpPmA7XHJcbiAgfTtcclxuXHJcbiAgLy8gYWRkcyBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIGVsZW1lbnRzIG91dHNpZGUgb2YgdGhlIHNlYXJjaCBzdWdnZXN0aW9ucyBkaXYgYW5kIGNsb3NlcyBpdCBpZiB0aGUgY2xpY2tlZCBhcmVhIGlzIG91dHNpZGUuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBpZiAoZS50YXJnZXQgPT09IHByb2R1Y3RRdWFudGl0eURpYWxvZykgcmV0dXJuO1xyXG4gICAgaWYgKGUudGFyZ2V0LmlkID09PSBcInByb2R1Y3RzU2VhcmNoVGV4dEJveFwiKSByZXR1cm47XHJcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGRsUHJvZHVjdFF1YW50aXR5XCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB3aXRoaW5Cb3VuZGFyaWVzID0gZVxyXG4gICAgICAuY29tcG9zZWRQYXRoKClcclxuICAgICAgLmluY2x1ZGVzKGRpdlByb2R1Y3RTZWFyY2hTdWdnZXN0aW9ucyk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhd2l0aGluQm91bmRhcmllcyAmJlxyXG4gICAgICAhZGl2UHJvZHVjdFNlYXJjaFN1Z2dlc3Rpb25zLmNsYXNzTGlzdC5jb250YWlucyhcImQtbm9uZVwiKVxyXG4gICAgKSB7XHJcbiAgICAgIGRpdlByb2R1Y3RTZWFyY2hTdWdnZXN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGl2U2VhcmNoXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyB3aGVuIGEgY3VzdG9tZXIgaXMgc2VsZWN0ZWQsIHRoZSB0YWdzIGlucHV0IGRpc2FwcGVhcnMgYW5kXHJcbiAgLy8gY3VzdG9tZXIgbmFtZSBzcGFuIHdpdGggYSBjbG9zZSBidXR0b24gYXBwZWFycy5cclxuICBkZGxDdXN0b21lcnMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICBpZiAoU2hla2VsQmFza2V0LmJhc2tldEl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKGNvbmZpcm0oXCJCdSBzaXBhcmnFnyBpcHRhbCBlZGlsZWNla3Rpci4gT25heWzEsXlvciBtdXN1bnV6P1wiKSkge1xyXG4gICAgICAgIGlmIChkZGxDdXN0b21lcnMub3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgIGN1c3RvbWVyRGVTZWxlY3RlZCgpO1xyXG4gICAgICAgICAgcmVzZXRPcmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGN1c3RvbWVyU2VsZWN0ZWQoKTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gY3VzdG9tZXJTZWxlY3RlZCgpIHtcclxuICAgIGNvbnN0IGN1c3RJZCA9IGRkbEN1c3RvbWVycy52YWx1ZTtcclxuXHJcbiAgICBjb25zdCBjdXN0TmFtZSA9IGRkbEN1c3RvbWVycy50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG4gICAgY29uc3QgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcmRlckNyZWF0ZURkbEN1c3RvbWVyc1dyYXBwZXJcIik7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21lck5hbWVXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwib3JkZXJDcmVhdGVDdXN0b21lck5hbWVUaXRsZVwiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGg1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xyXG4gICAgaDUuY2xhc3NMaXN0LmFkZChcIm0tMFwiLCBcImN1c3RvbWVySGVhZGVyUmVsYXRlZFwiKTtcclxuICAgIGg1LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG4gICAgaDUudGV4dENvbnRlbnQgPSBjdXN0TmFtZTtcclxuXHJcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICBhLmhyZWYgPSBcIiNcIjtcclxuICAgIGEuY2xhc3NMaXN0LmFkZChcclxuICAgICAgXCJidG5cIixcclxuICAgICAgXCJidG4tY2lyY2xlXCIsXHJcbiAgICAgIFwiYnRuLXdoaXRlXCIsXHJcbiAgICAgIFwibXMtMlwiLFxyXG4gICAgICBcImN1c3RvbWVySGVhZGVyUmVsYXRlZFwiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGkuY2xhc3NMaXN0LmFkZChcImZhXCIsIFwiZmEtdGltZXNcIiwgXCJjdXN0b21lckhlYWRlclJlbGF0ZWRcIik7XHJcbiAgICBhLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICAgIGN1c3RvbWVyTmFtZVdyYXBwZXIuYXBwZW5kKGg1LCBhKTtcclxuXHJcbiAgICAvLyByZXNldCB0aGUgdGV4dGJveCB0byBpdHMgZGVmYXVsdCB2YWx1ZSBhZnRlciBhIGN1c3RvbWVyIGlzIGRlLXNlbGVjdGVkIGJ5IGNsaWNraW5nIG9uIHRoZSB4IGljb24gYWZ0ZXIgaXQncyBuYW1lXHJcbiAgICBhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGN1c3RvbWVyRGVTZWxlY3RlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZGlzcGxheSBvcmRlclByb2R1Y3RTZWFyY2ggZGl2XHJcbiAgICBkaXZPcmRlclByb2R1Y3RTZWFyY2guY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGN1c3RvbWVyRGVTZWxlY3RlZCgpIHtcclxuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3JkZXJDcmVhdGVEZGxDdXN0b21lcnNXcmFwcGVyXCIpO1xyXG5cclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG5cclxuICAgIGNvbnN0IGN1c3RvbWVyTmFtZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgXCJvcmRlckNyZWF0ZUN1c3RvbWVyTmFtZVRpdGxlXCJcclxuICAgICk7XHJcblxyXG4gICAgY3VzdG9tZXJOYW1lV3JhcHBlci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgY3VzdG9tZXJOYW1lV3JhcHBlci50ZXh0Q29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgZGl2T3JkZXJQcm9kdWN0U2VhcmNoLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcblxyXG4gICAgbGV0IGluc3QgPSBUYWdzLmdldEluc3RhbmNlKGRkbEN1c3RvbWVycyk7XHJcbiAgICBpbnN0LnJlbW92ZUFsbCgpO1xyXG4gICAgZGRsQ3VzdG9tZXJzLmxlbmd0aCA9IDA7XHJcbiAgICBjb25zb2xlLmxvZyhcImkgYW0gdHJ5aW5nIHRvIHJlLWluaXRpYWxpemVcIik7XHJcbiAgICBUYWdzLmluaXQoXCIudG9iZVRhZ2dlZFwiKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaW5pdCBjb21wbGV0ZWRcIik7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzZWxlY3RpbmcgbmV4dCBzaWJsaW5nIG9mIGRkbEN1c3RvbWVyc1wiKTtcclxuICAgIGRkbEN1c3RvbWVycy5uZXh0U2libGluZy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0T3JkZXIoKSB7XHJcbiAgICAvLyBjbGVhciBwcm9kdWN0IHJvd3NcclxuICAgIHVsQmFza2V0SXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAvLyBjbGVhciB0ZXh0IG9mIHN1bW1hcnkgdGFibGUgJiBzZXQgY2xhc3NlcyB0byBkLW5vbmUgZm9yIHRob3NlIHdobyBzaG91bGQgbm90IGJlIHZpc2libGVcclxuICAgIHNwYW5TdWJUb3RhbC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgc3BhbkRpc2NvdW50VG90YWwuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIHNwYW5WYXRUb3RhbC5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgc3BhbkdyYW5kVG90YWwuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIHNob3dBZnRlckJhc2tldEhhc0l0ZW1zLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpKTtcclxuXHJcbiAgICAvLyBjbGVhciBsb2NhbFN0b3JhZ2VcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG5cclxuICAgIC8vIGNsZWFyIFNoZWtlbEJhc2tldFxyXG4gICAgQmFza2V0LkNsZWFyID0gW107XHJcbiAgICBTaGVrZWxCYXNrZXQuYmFza2V0SXRlbXMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8vIGNvbnN0IHNob3dQcm9kdWN0UGhvdG9zID0gKCkgPT4ge1xyXG4gIC8vICAgY29uc3Qgc3VnZ2VzdGlvbnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAvLyAgICAgXCJkaXZQcm9kdWN0U2VhcmNoU3VnZ2VzdGlvbnNcIlxyXG4gIC8vICAgKTtcclxuXHJcbiAgLy8gICBjb25zdCBpbWFnZXMgPSBzdWdnZXN0aW9uc0Rpdi5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpO1xyXG5cclxuICAvLyAgIGlmICghU2hla2VsLlV0aWxpdHkuaXNNb2JpbGUoKSkge1xyXG4gIC8vICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcclxuICAvLyAgICAgICBjb25zdCBzcmMgPSBpbWFnZS5kYXRhc2V0LnNyYztcclxuICAvLyAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH07XHJcblxyXG4gIC8vIGFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGV2ZW50KSA9PiB7XHJcbiAgLy8gICBzaG93UHJvZHVjdFBob3RvcygpO1xyXG4gIC8vIH0pO1xyXG5cclxuICAvLyBzaG93UHJvZHVjdFBob3RvcygpO1xyXG5cclxuICAvLyAjIyMjIyBkZXZlbG9wbWVudCBtb2NrdXAgZGF0YSAtLSBkZWxldGUgbGF0ZXIuXHJcbiAgY29uc3Qgb3JkZXIgPSBgPGRpdiBjbGFzcz1cInJvdyBvcmRlclwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9yZGVyIHAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY2hlY2sgZm9ybS1jaGVjay1pbmxpbmUgb3JkZXItbm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJvcmRlci0yMjM0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICBpZD1cIm9yZGVyLTIyMzRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwib3JkZXItMjIzNFwiPiMyMjM0PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlci1jdXN0b21lci1zcGFuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIlwiPll1c3VmIFRhbmRvxJ9hbiBHaXJuZSBFY3phbmVzaSAoR2lybmUpPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlci1kYXRldGltZSBkLWlubGluZSBkLW1kLW5vbmVcIj48dGltZSBkYXRldGltZT1cIjIwMjItMDgtMDZUMTA6MzJcIj4yOC4wOCBAIDEwOjMyPC90aW1lPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkLW5vbmUgZC1tZC1pbmxpbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgID4gLS0gIFRvcGxhbSA8c3Ryb25nPjQ8L3N0cm9uZz4ga2FsZW08c3Ryb25nPjMyPC9zdHJvbmc+IHBhcsOnYVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHZlPHN0cm9uZz4g4oK6MTIzLjQ1PC9zdHJvbmc+PC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwhLS0gLS0ga2FuYWwgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJiYWRnZSBiZy1zb2Z0LXNlY29uZGFyeSBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU2lwYXJpxZ8gS2FuYWzEsVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgPiNQT1M8L3NwYW5cclxuICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICA8IS0tIC0tIHNpcGFyaXNpIGFsYW4gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJiYWRnZSBiZy1zb2Z0LWluZm9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU2lwYXJpxZ9pIEFsYW5cIlxyXG4gICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJhZGdlLWxpbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPjxpIGNsYXNzPVwiYnggYnhzLXVzZXJcIj48L2k+IMSwcmZhbiBEZW1pcmvEsXJhbjwvYVxyXG4gICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICA8IS0tIC0tIGR1cnVtIGJpbGdpc2kgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmctc29mdC1zZWNvbmRhcnkgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJhZGdlLWxpbmsgXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgID48aSBjbGFzcz1cImZhIGZhLWNpcmNsZS1zbWFsbFwiPjwvaT4gQWzEsW5kxLEgLSDEsMWfbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBHw7ZybWVkaTwvYVxyXG4gICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICA8IS0tIC0tIG9kZW1lIGJpbGdpc2kgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJiYWRnZSBiZy1zb2Z0LXNlY29uZGFyeSBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiw5ZkZW1lIEJpbGdpc2lcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgID5rcmVkaSBrYXJ0xLEgLSDDtmRlbmRpPC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0yIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3JkZXItZGF0ZXRpbWUgbWUtNCBkLW5vbmUgZC1tZC1pbmxpbmVcIj48dGltZSBkYXRldGltZT1cIjIwMjItMDgtMDZUMTA6MzJcIj4yOCBBZ3U8L3RpbWU+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4tY2lyY2xlIGJ0bi13aGl0ZSBidG5PcmRlckRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgPC9kaXY+PGhyLz5gO1xyXG5cclxuICBmb3IgKHZhciBpID0gMTsgaSA8PSA1MDsgaSsrKSB7XHJcbiAgICBvcmRlcnNEaXYuaW5uZXJIVE1MICs9IG9yZGVyO1xyXG4gIH1cclxuXHJcbiAgLy8gIyMjIyMgT1JERVIgSVRFTVxyXG4gIGNvbnN0IG9yZGVySXRlbSA9IGA8dHI+XHJcbiAgPHRkIGNsYXNzPVwiZC1ub25lIGQtbWQtdGFibGUtY2VsbFwiPjxpbWcgc3JjPVwiXCIgZGF0YS1zcmM9XCJ7e2ltYWdlfX1cIj48L3RkPlxyXG4gIDx0ZCBjbGFzcz1cImQtbm9uZSBkLW1kLXRhYmxlLWNlbGxcIj57e2JyYW5kYWJicnZ9fTwvdGQ+XHJcbiAgPHRkPnt7bmFtZX19PC90ZD5cclxuICA8dGQ+e3twcmljZTF9fTwvdGQ+XHJcbiAgPHRkPnt7dmF0fX08L3RkPlxyXG4gIDx0ZD57e3ByaWNlMn19PC90ZD5cclxuICA8dGQ+e3tjYW1wYWlnbn19PC90ZD5cclxuICA8dGQ+XHJcbiAgICA8ZGl2IGNsYXNzPVwicXVhbnRpdHlXcmFwcGVyIGZsb2F0LWVuZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYi0wIHAtMCBtLTAgYm9yZGVyIGQtZmxleFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWRhbmdlciBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIHAtMlwiPnt7c3RvY2t9fTwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gcXR5Q2hhbmdlIGRlY3JlbWVudFwiIHR5cGU9XCJidXR0b25cIj4tPC9idXR0b24+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgcXR5XCIgdmFsdWU9XCJ7e3F1YW50aXR5fX1cIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHF0eUNoYW5nZSBpbmNyZW1lbnRcIiB0eXBlPVwiYnV0dG9uXCI+KzwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYWRkdG9jYXJ0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtaWQ9XCJ7e2lkfX1cIiA+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYXJ0LXBsdXNcIj48L2k+PC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC90ZD5cclxuPC90cj5gO1xyXG59KTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvaW5kZXguanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9vcmRlcnMtbGlzdC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==