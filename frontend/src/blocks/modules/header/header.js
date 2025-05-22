// padding-top для main
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const main = document.querySelector('main');

  if (!header || !main) {
    return;
  }

  function setMainPadding() {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight}px`;
  }

  // Инициализация
  setMainPadding();

  // Отслеживание изменений размеров через ResizeObserver
  const resizeObserver = new ResizeObserver(setMainPadding);
  resizeObserver.observe(header);

  // Отслеживание изменений в DOM (если header динамически меняется)
  const mutationObserver = new MutationObserver(setMainPadding);
  mutationObserver.observe(header, {
    childList: true,       // отслеживание добавления/удаления дочерних элементов
    subtree: true,         // отслеживание изменений во всём поддереве
    attributes: true,      // отслеживание изменений атрибутов
    characterData: true    // отслеживание текстовых изменений
  });

  // Очистка при размонтировании
  window.addEventListener('unload', () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');

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
