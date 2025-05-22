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

  // Инициализация
  setMainPadding();

  // Отслеживание изменений размеров через ResizeObserver
  var resizeObserver = new ResizeObserver(setMainPadding);
  resizeObserver.observe(header);

  // Отслеживание изменений в DOM (если header динамически меняется)
  var mutationObserver = new MutationObserver(setMainPadding);
  mutationObserver.observe(header, {
    childList: true,
    // отслеживание добавления/удаления дочерних элементов
    subtree: true,
    // отслеживание изменений во всём поддереве
    attributes: true,
    // отслеживание изменений атрибутов
    characterData: true // отслеживание текстовых изменений
  });

  // Очистка при размонтировании
  window.addEventListener('unload', function () {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  });
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

/***/ "./src/blocks/modules/pages/contacts/contacts-hero/contacts-hero.js":
/*!**************************************************************************!*\
  !*** ./src/blocks/modules/pages/contacts/contacts-hero/contacts-hero.js ***!
  \**************************************************************************/
/***/ (function() {

// Map

document.addEventListener('DOMContentLoaded', function () {
  var mapContainer = document.getElementById('map');

  // Если блока с картой нет или не указан API-ключ — выходим
  if (!mapContainer || !mapContainer.dataset.apiKey) {
    return;
  }
  var apiKey = mapContainer.dataset.apiKey;
  if (window.ymaps) {
    initYandexMap();
    return;
  }

  // Динамически загружаем API Яндекс.Карт
  var script = document.createElement('script');
  script.src = "https://api-maps.yandex.ru/2.1/?apikey=".concat(apiKey, "&lang=ru_RU");
  script.onload = initYandexMap;
  script.onerror = function () {
    return console.error('Yandex.Map: Не удалось загрузить API.');
  };
  document.head.appendChild(script);

  // Инициализация карты и меток
  function initYandexMap() {
    ymaps.ready(function () {
      var map = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 11,
        controls: ['zoomControl', 'typeSelector']
      });

      // Собираем все метки из HTML
      var markers = mapContainer.querySelectorAll('.map-marker');
      if (markers.length === 0) return;
      var placemarks = [];
      markers.forEach(function (marker) {
        var lat = parseFloat(marker.dataset.lat);
        var lng = parseFloat(marker.dataset.lng);
        var title = marker.dataset.title || '';
        var desc = marker.dataset.description || '';
        placemarks.push(new ymaps.Placemark([lat, lng], {
          balloonContent: "<strong>".concat(title, "</strong><br>").concat(desc),
          hintContent: title
        }, {
          preset: marker.dataset.icon || 'islands#redDotIcon'
        }));
      });

      // Добавляем метки на карту
      var clusterer = new ymaps.Clusterer();
      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      // Автоматически подгоняем карту под метки
      map.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
      });
    });
  }
});

/***/ }),

/***/ "./src/blocks/modules/pages/documents/documents-hero/documents-hero.js":
/*!*****************************************************************************!*\
  !*** ./src/blocks/modules/pages/documents/documents-hero/documents-hero.js ***!
  \*****************************************************************************/
/***/ (function() {

// documents - открывающийся список
document.addEventListener('DOMContentLoaded', function () {
  var downloadItems = document.querySelectorAll('.download__list-item');
  if (downloadItems.length === 0) return;

  // Функция для обновления высоты элемента
  function updateItemHeight(item) {
    var itemTop = item.querySelector('.download__list-item__top');
    var itemBottom = item.querySelector('.download__list-item__bottom');
    if (!itemTop) return;
    if (item.classList.contains('active') && itemBottom) {
      item.style.height = "".concat(itemTop.offsetHeight + itemBottom.offsetHeight, "px");
    } else {
      item.style.height = "".concat(itemTop.offsetHeight, "px");
    }
  }
  function initDownloadItems() {
    downloadItems.forEach(function (item) {
      updateItemHeight(item);

      // Наблюдаем за изменениями в содержимом
      var observer = new MutationObserver(function () {
        return updateItemHeight(item);
      });
      observer.observe(item, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });

      // Наблюдаем за изменениями размеров
      var resizeObserver = new ResizeObserver(function () {
        return updateItemHeight(item);
      });
      resizeObserver.observe(item);
      if (item.querySelector('.download__list-item__bottom')) {
        resizeObserver.observe(item.querySelector('.download__list-item__bottom'));
      }
    });
  }

  // Обработчики кликов
  function setupFaqClickHandlers() {
    downloadItems.forEach(function (item) {
      var itemTop = item.querySelector('.download__list-item__top');
      if (!itemTop) return;
      itemTop.addEventListener('click', function () {
        item.classList.toggle('active');
        updateItemHeight(item);
      });
    });
  }
  initDownloadItems();
  setupFaqClickHandlers();

  // Обработчик ресайза окна (на всякий случай)
  window.addEventListener('resize', function () {
    downloadItems.forEach(function (item) {
      return updateItemHeight(item);
    });
  });
});

/***/ }),

/***/ "./src/blocks/modules/pages/partners/partners-hero/partners-hero.js":
/*!**************************************************************************!*\
  !*** ./src/blocks/modules/pages/partners/partners-hero/partners-hero.js ***!
  \**************************************************************************/
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
  var downloadItems = document.querySelectorAll('.partenrs__list-item');
  if (downloadItems.length === 0) return;

  // Функция для обновления высоты элемента
  function updateItemHeight(item) {
    var itemTop = item.querySelector('.partenrs__list-item__top');
    var itemBottom = item.querySelector('.partenrs__list-item__bottom');
    if (!itemTop) return;
    if (item.classList.contains('active') && itemBottom) {
      item.style.height = "".concat(itemTop.offsetHeight + itemBottom.offsetHeight, "px");
    } else {
      item.style.height = "".concat(itemTop.offsetHeight, "px");
    }
  }
  function initDownloadItems() {
    downloadItems.forEach(function (item) {
      updateItemHeight(item);

      // Наблюдаем за изменениями в содержимом
      var observer = new MutationObserver(function () {
        return updateItemHeight(item);
      });
      observer.observe(item, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });

      // Наблюдаем за изменениями размеров
      var resizeObserver = new ResizeObserver(function () {
        return updateItemHeight(item);
      });
      resizeObserver.observe(item);
      if (item.querySelector('.partenrs__list-item__bottom')) {
        resizeObserver.observe(item.querySelector('.partenrs__list-item__bottom'));
      }
    });
  }

  // Обработчики кликов
  function setupFaqClickHandlers() {
    downloadItems.forEach(function (item) {
      var itemTop = item.querySelector('.partenrs__list-item__top');
      if (!itemTop) return;
      itemTop.addEventListener('click', function () {
        item.classList.toggle('active');
        updateItemHeight(item);
      });
    });
  }
  initDownloadItems();
  setupFaqClickHandlers();

  // Обработчик ресайза окна (на всякий случай)
  window.addEventListener('resize', function () {
    downloadItems.forEach(function (item) {
      return updateItemHeight(item);
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
/* harmony import */ var _modules_pages_documents_documents_hero_documents_hero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/pages/documents/documents-hero/documents-hero */ "./src/blocks/modules/pages/documents/documents-hero/documents-hero.js");
/* harmony import */ var _modules_pages_documents_documents_hero_documents_hero__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_pages_documents_documents_hero_documents_hero__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_pages_partners_partners_hero_partners_hero__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! %modules%/pages/partners/partners-hero/partners-hero */ "./src/blocks/modules/pages/partners/partners-hero/partners-hero.js");
/* harmony import */ var _modules_pages_partners_partners_hero_partners_hero__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_pages_partners_partners_hero_partners_hero__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_pages_contacts_contacts_hero_contacts_hero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! %modules%/pages/contacts/contacts-hero/contacts-hero */ "./src/blocks/modules/pages/contacts/contacts-hero/contacts-hero.js");
/* harmony import */ var _modules_pages_contacts_contacts_hero_contacts_hero__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_pages_contacts_contacts_hero_contacts_hero__WEBPACK_IMPORTED_MODULE_5__);







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



// Подменю в block-menu
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('blockMenu')) {
    return;
  }

  // Автоматически добавляет класс has-submenu для пунктов с подменю
  document.querySelectorAll('.menu__list-item').forEach(function (item) {
    if (item.querySelector('.submenu')) {
      item.classList.add('has-submenu');

      // Если пункт уже имеет класс active, разворачиваем его подменю
      if (item.classList.contains('active')) {
        var submenu = item.querySelector('.submenu');
        openSubmenu(item, submenu);
      }
    }
  });

  // Обработчик клика по пунктам меню
  document.querySelectorAll('.menu__list-item.has-submenu > a').forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentItem = this.parentElement;
      var submenu = parentItem.querySelector('.submenu');
      if (submenu) {
        e.preventDefault();

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
    });
  });

  // Функция открытия подменю
  function openSubmenu(item, submenu) {
    item.classList.add('active');
    // Устанавливаем достаточно большое значение для max-height
    submenu.style.maxHeight = '500px';

    // После завершения анимации устанавливаем auto для корректного отображения
    setTimeout(function () {
      submenu.style.maxHeight = 'none';
    }, 500);
  }

  // Функция закрытия подменю
  function closeSubmenu(item, submenu) {
    item.classList.remove('active');

    // Перед закрытием фиксируем текущую высоту
    submenu.style.maxHeight = submenu.scrollHeight + 'px';

    // Даем время для применения стиля
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
    document.querySelectorAll('.menu__list-item.active > .submenu').forEach(function (submenu) {
      if (submenu.style.maxHeight !== '0') {
        submenu.style.maxHeight = '1000px';
        setTimeout(function () {
          submenu.style.maxHeight = 'none';
        }, 300);
      }
    });
  });
});
}();
/******/ })()
;
//# sourceMappingURL=main.js.map