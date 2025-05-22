import "./import/modules";
import "./import/components";

// Подменю в block-menu
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('blockMenu')) {
      return;
    }

    // Автоматически добавляет класс has-submenu для пунктов с подменю
    document.querySelectorAll('.menu__list-item').forEach(item => {
      if (item.querySelector('.submenu')) {
        item.classList.add('has-submenu');

        // Если пункт уже имеет класс active, разворачиваем его подменю
        if (item.classList.contains('active')) {
          const submenu = item.querySelector('.submenu');
          openSubmenu(item, submenu);
        }
      }
    });

    // Обработчик клика по пунктам меню
    document.querySelectorAll('.menu__list-item.has-submenu > a').forEach(item => {
      item.addEventListener('click', function(e) {
        const parentItem = this.parentElement;
        const submenu = parentItem.querySelector('.submenu');

        if (submenu) {
          e.preventDefault();

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
      });
    });

    // Функция открытия подменю
    function openSubmenu(item, submenu) {
      item.classList.add('active');
      // Устанавливаем достаточно большое значение для max-height
      submenu.style.maxHeight = '500px';

      // После завершения анимации устанавливаем auto для корректного отображения
      setTimeout(() => {
        submenu.style.maxHeight = 'none';
      }, 500);
    }

    // Функция закрытия подменю
    function closeSubmenu(item, submenu) {
      item.classList.remove('active');

      // Перед закрытием фиксируем текущую высоту
      submenu.style.maxHeight = submenu.scrollHeight + 'px';

      // Даем время для применения стиля
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
      document.querySelectorAll('.menu__list-item.active > .submenu').forEach(submenu => {
        if (submenu.style.maxHeight !== '0') {
          submenu.style.maxHeight = '1000px';
          setTimeout(() => {
            submenu.style.maxHeight = 'none';
          }, 300);
        }
      });
    });
});
