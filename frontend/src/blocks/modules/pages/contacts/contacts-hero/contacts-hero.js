// Map

document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('map');

  // Если блока с картой нет или не указан API-ключ — выходим
  if (!mapContainer || !mapContainer.dataset.apiKey) {
    return;
  }

  const apiKey = mapContainer.dataset.apiKey;

  if (window.ymaps) {
    initYandexMap();
    return;
  }

  // Динамически загружаем API Яндекс.Карт
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
  script.onload = initYandexMap;
  script.onerror = () => console.error('Yandex.Map: Не удалось загрузить API.');
  document.head.appendChild(script);

  // Инициализация карты и меток
  function initYandexMap() {
    ymaps.ready(() => {
      const map = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 11,
        controls: ['zoomControl', 'typeSelector']
      });

      // Собираем все метки из HTML
      const markers = mapContainer.querySelectorAll('.map-marker');
      if (markers.length === 0) return;

      const placemarks = [];

      markers.forEach(marker => {
        const lat = parseFloat(marker.dataset.lat);
        const lng = parseFloat(marker.dataset.lng);
        const title = marker.dataset.title || '';
        const desc = marker.dataset.description || '';

        placemarks.push(
          new ymaps.Placemark(
            [lat, lng],
            {
              balloonContent: `<strong>${title}</strong><br>${desc}`,
              hintContent: title
            },
            {
              preset: marker.dataset.icon || 'islands#redDotIcon'
            }
          )
        );
      });

      // Добавляем метки на карту
      const clusterer = new ymaps.Clusterer();
      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      // Автоматически подгоняем карту под метки
      map.setBounds(clusterer.getBounds(), { checkZoomRange: true });
    });
  }
});
