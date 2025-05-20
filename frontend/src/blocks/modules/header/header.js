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

  setMainPadding();

  window.addEventListener('resize', setMainPadding);
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
