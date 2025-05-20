/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/***/ (function() {



/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/***/ (function() {

// padding-top для main
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  var main = document.querySelector('main');
  if (!header || !main) {
    return;
  }
  function setMainPadding() {
    var headerHeight = header.offsetHeight;
    main.style.paddingTop = "".concat(headerHeight, "px");
  }
  setMainPadding();
  window.addEventListener('resize', setMainPadding);
});
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  if (!header) {
    return;
  }
  function handleScroll() {
    if (window.scrollY > 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

/***/ }),

/***/ "./src/blocks/modules/mobileNavigation/mobileNavigation.js":
/*!*****************************************************************!*\
  !*** ./src/blocks/modules/mobileNavigation/mobileNavigation.js ***!
  \*****************************************************************/
/***/ (function() {

// Открытие mobile-navigation
document.addEventListener('DOMContentLoaded', function () {
  var menuOpenBtn = document.getElementById('menuNavigationOpenBtn');
  var menuCloseBtn = document.getElementById('menuNavigationCloseBtn');
  var mobileNavigation = document.getElementById('mobileNavigation');
  var body = document.body;
  if (menuOpenBtn && menuCloseBtn && mobileNavigation && body) {
    menuOpenBtn.addEventListener('click', function () {
      mobileNavigation.classList.add('active');
      body.classList.add('stop');
    });
    menuCloseBtn.addEventListener('click', function () {
      mobileNavigation.classList.remove('active');
      body.classList.remove('stop');
    });
  }
});

// Подменю в mobile-navigation
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('mobileNavigation')) {
    return;
  }

  // Автоматически добавляет класс has-submenu для пунктов с подменю
  document.querySelectorAll('.navigation__list-item').forEach(function (item) {
    if (item.querySelector('.submenu')) {
      item.classList.add('has-submenu');

      // Если пункт уже имеет класс active, разворачиваем его подменю
      if (item.classList.contains('active')) {
        var submenu = item.querySelector('.submenu');
        openSubmenu(item, submenu);
      }
    }
  });

  // Обработчик клика по всем ссылкам в меню
  document.querySelectorAll('.navigation__list-item > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var parentItem = this.parentElement;
      var submenu = parentItem.querySelector('.submenu');

      // Если у родителя есть подменю, блокируем переход
      if (submenu) {
        e.preventDefault();
        e.stopPropagation();

        // Закрываем все подменю того же уровня
        var siblings = Array.from(parentItem.parentElement.children).filter(function (child) {
          return child !== parentItem;
        });
        siblings.forEach(function (sibling) {
          var siblingSubmenu = sibling.querySelector('.submenu');
          if (siblingSubmenu) {
            closeSubmenu(sibling, siblingSubmenu);
          }
        });

        // Открываем/закрываем текущее подменю
        if (parentItem.classList.contains('active')) {
          closeSubmenu(parentItem, submenu);
        } else {
          openSubmenu(parentItem, submenu);
        }
      }
      // Если подменю нет - ссылка работает как обычно
    });
  });

  // Функция открытия подменю
  function openSubmenu(item, submenu) {
    item.classList.add('active');
    submenu.style.maxHeight = '500px';
    setTimeout(function () {
      submenu.style.maxHeight = 'none';
    }, 500);
  }

  // Функция закрытия подменю
  function closeSubmenu(item, submenu) {
    item.classList.remove('active');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    setTimeout(function () {
      submenu.style.maxHeight = '0';
    }, 10);

    // Закрываем все дочерние подменю
    item.querySelectorAll('.submenu').forEach(function (sm) {
      sm.style.maxHeight = '0';
      sm.parentElement.classList.remove('active');
    });
  }

  // Обработчик изменения размера окна
  window.addEventListener('resize', function () {
    document.querySelectorAll('.navigation__list-item.active > .submenu').forEach(function (submenu) {
      if (submenu.style.maxHeight !== '0') {
        submenu.style.maxHeight = '1000px';
        setTimeout(function () {
          submenu.style.maxHeight = 'none';
        }, 300);
      }
    });
  });
});

/***/ }),

/***/ "./src/js/import/components.js":
/*!*************************************!*\
  !*** ./src/js/import/components.js ***!
  \*************************************/
/***/ (function() {



/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_mobileNavigation_mobileNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/mobileNavigation/mobileNavigation */ "./src/blocks/modules/mobileNavigation/mobileNavigation.js");
/* harmony import */ var _modules_mobileNavigation_mobileNavigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_mobileNavigation_mobileNavigation__WEBPACK_IMPORTED_MODULE_2__);




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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import/components */ "./src/js/import/components.js");
/* harmony import */ var _import_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_import_components__WEBPACK_IMPORTED_MODULE_1__);


}();
/******/ })()
;
//# sourceMappingURL=main.js.map