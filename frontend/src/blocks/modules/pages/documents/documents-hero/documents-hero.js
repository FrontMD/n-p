// documents - открывающийся список
document.addEventListener('DOMContentLoaded', function() {
  const downloadItems = document.querySelectorAll('.download__list-item');
  if (downloadItems.length === 0) return;

  // Функция для обновления высоты элемента
  function updateItemHeight(item) {
    const itemTop = item.querySelector('.download__list-item__top');
    const itemBottom = item.querySelector('.download__list-item__bottom');

    if (!itemTop) return;

    if (item.classList.contains('active') && itemBottom) {
      item.style.height = `${itemTop.offsetHeight + itemBottom.offsetHeight}px`;
    } else {
      item.style.height = `${itemTop.offsetHeight}px`;
    }
  }

  function initDownloadItems() {
    downloadItems.forEach(item => {
      updateItemHeight(item);

      // Наблюдаем за изменениями в содержимом
      const observer = new MutationObserver(() => updateItemHeight(item));
      observer.observe(item, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });

      // Наблюдаем за изменениями размеров
      const resizeObserver = new ResizeObserver(() => updateItemHeight(item));
      resizeObserver.observe(item);
      if (item.querySelector('.download__list-item__bottom')) {
        resizeObserver.observe(item.querySelector('.download__list-item__bottom'));
      }
    });
  }

  // Обработчики кликов
  function setupFaqClickHandlers() {
    downloadItems.forEach(item => {
      const itemTop = item.querySelector('.download__list-item__top');
      if (!itemTop) return;

      itemTop.addEventListener('click', function() {
        item.classList.toggle('active');
        updateItemHeight(item);
      });
    });
  }

  initDownloadItems();
  setupFaqClickHandlers();

  // Обработчик ресайза окна (на всякий случай)
  window.addEventListener('resize', function() {
    downloadItems.forEach(item => updateItemHeight(item));
  });
});
