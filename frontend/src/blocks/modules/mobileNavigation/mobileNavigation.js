// Открытие mobile-navigation
document.addEventListener('DOMContentLoaded', function() {
  const menuOpenBtn = document.getElementById('menuNavigationOpenBtn');
  const menuCloseBtn = document.getElementById('menuNavigationCloseBtn');
  const mobileNavigation = document.getElementById('mobileNavigation');
  const body = document.body;

  if (menuOpenBtn && menuCloseBtn && mobileNavigation && body) {
    menuOpenBtn.addEventListener('click', function() {
      mobileNavigation.classList.add('active');
      body.classList.add('stop');
    });

    menuCloseBtn.addEventListener('click', function() {
      mobileNavigation.classList.remove('active');
      body.classList.remove('stop');
    });
  }
});

// Подменю в mobile-navigation
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('mobileNavigation')) {
      return;
    }

    // Автоматически добавляет класс has-submenu для пунктов с подменю
    document.querySelectorAll('.navigation__list-item').forEach(item => {
      if (item.querySelector('.submenu')) {
        item.classList.add('has-submenu');

        // Если пункт уже имеет класс active, разворачиваем его подменю
        if (item.classList.contains('active')) {
          const submenu = item.querySelector('.submenu');
          openSubmenu(item, submenu);
        }
      }
    });

    // Обработчик клика по всем ссылкам в меню
    document.querySelectorAll('.navigation__list-item > a').forEach(link => {
      link.addEventListener('click', function(e) {
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');

        // Если у родителя есть подменю, блокируем переход
        if (submenu) {
          e.preventDefault();
          e.stopPropagation();

          // Закрываем все подменю того же уровня
          const siblings = Array.from(parentItem.parentElement.children).filter(
            child => child !== parentItem
          );

          siblings.forEach(sibling => {
              const siblingSubmenu = sibling.querySelector('.submenu');
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

      setTimeout(() => {
        submenu.style.maxHeight = 'none';
      }, 500);
    }

    // Функция закрытия подменю
    function closeSubmenu(item, submenu) {
      item.classList.remove('active');
      submenu.style.maxHeight = submenu.scrollHeight + 'px';

      setTimeout(() => {
        submenu.style.maxHeight = '0';
      }, 10);

      // Закрываем все дочерние подменю
      item.querySelectorAll('.submenu').forEach(sm => {
        sm.style.maxHeight = '0';
        sm.parentElement.classList.remove('active');
      });
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
      document.querySelectorAll('.navigation__list-item.active > .submenu').forEach(submenu => {
        if (submenu.style.maxHeight !== '0') {
          submenu.style.maxHeight = '1000px';
          setTimeout(() => {
            submenu.style.maxHeight = 'none';
          }, 300);
        }
      });
    });
});
