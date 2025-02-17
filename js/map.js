// eslint-disable-next-line no-redeclare
/* global L:readonly */
import { abledFilterForm, abledAddForm } from './page-status.js';
import { renderCard } from './card.js';
import { getData } from './fetch.js';
import { showAlertError } from './util-element.js';
import { compareAdverts, onFilterChange } from './filter-form.js';
import { debounce } from './util.js';


const MAX_ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;

//координаты центра токио
const CENTER_TOKYO = {
  lat: 35.68365,
  lng: 139.75073,
};

/**
 * Преобразовывает объект с координатами в строку
 * @param {object} latLng Объект, содержащий информацию о широте и долготе
 * @returns
 */
const latLngObjToString = (latLng) => {
  let lat = latLng.lat ? latLng.lat
    : latLng.latitude ? latLng.latitude
      : latLng.x ? latLng.x : null;
  lat = (latLng.lat).toFixed(5);

  let lng = latLng.lng ? latLng.lng
    : latLng.longitude ? latLng.longitude
      : latLng.y ? latLng.y : null;
  lng = (latLng.lng).toFixed(5);

  return `${lat}, ${lng}`;
}

//создаем карту
const map = L.map('map-canvas')
  .on('load', () => {
    abledAddForm();
    document.querySelector('#address').value = latLngObjToString(CENTER_TOKYO);
  })
  .setView(CENTER_TOKYO, 13);


//подключаем слой карт openstreetmap в карту
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//задаем вид главного маркера
const mainPinIcon = L.icon({
  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//создаем элемент главного маркера
const mainPinMarker = L.marker(
  CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
//добавляем главный маркер на карту и назначаем ему события
mainPinMarker
  .addTo(map)
  .on('moveend', (evt) => {
    let marker = evt.target.getLatLng();
    document.querySelector('#address').value = latLngObjToString(marker);
  } );


//элемент маркера объявлений



const markers =[];
const addPinMarker = (adverts) => {
  adverts
    .slice()
    .filter(compareAdverts)//заменить на удаление лишних значений
    .slice(0, MAX_ADVERTS_COUNT)
    .forEach((advert) => {
      //задаем вид маркера похожего объявления
      const pinIcon = L.icon({
        iconUrl: '../leaflet/img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      //создаем элемент маркера похожего объявления
      const pinMarker = L.marker(
        advert.location,
        {
          draggable: false,
          icon: pinIcon,
        },
      );
      //добавляем маркер на карту и создаем его окружение
      pinMarker
        .addTo(map)
        .bindPopup(
          renderCard(advert),
          {
            keepInView: true,
          });
      markers.push(pinMarker);
    });
};

const removePinMarker = () => {
  markers.forEach(marker => marker.remove());
};


getData((adverts) => {
  addPinMarker(adverts),
  abledFilterForm(),
  onFilterChange(debounce(() => {
    removePinMarker();
    addPinMarker(adverts)
  }, RERENDER_DELAY))
}, showAlertError)


export {
  CENTER_TOKYO,
  map,
  mainPinMarker,
  latLngObjToString
};
