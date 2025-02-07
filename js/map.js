// eslint-disable-next-line no-redeclare
/* global L:readonly */
import { abledPage } from './page-status.js';

//координаты центра токио
const CENTER_TOKYO = {
  lat: 35.6895000,
  lng: 139.6917100,
};

//функция преобразования координат в строку
/**
 * Преобразовывает объект с координатами в строку
 * @param {object} latLng Объект, содержащий информацию о широте и долготе
 * @returns
 */
const latLngObjToString = (latLng) => {
  let lat = latLng.lat ? latLng.lat
    : latLng.latitude ? latLng.latitude : null;
  lat = (latLng.lat).toFixed(5);

  let lng = latLng.lng ? latLng.lng
    : latLng.longitude ? latLng.longitude : null;
  lng = (latLng.lng).toFixed(5);

  return `${lat}, ${lng}`;
}

//создаем карту
const map = L.map('map-canvas')
  .on('load', () => {
    abledPage();
    document.querySelector('#address').value = latLngObjToString(CENTER_TOKYO);
  })
  .setView(CENTER_TOKYO, 10);


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
//добавляем маркер на карту и назначаем ему события
mainPinMarker
  .addTo(map)
  .on('moveend', (evt) => {
    let marker = evt.target.getLatLng();
    document.querySelector('#address').value = latLngObjToString(marker);
  } )
