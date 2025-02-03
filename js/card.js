
//модуль отчечающий за генерацию разметки похожих элементов
import { adverts, offerCatalog } from './data.js';

//выбираем отображаемое объявление из созданного массива объявлений
//const advert = adverts[1];
//const offer = advert.offer;


//шаблон карточки
const advertTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


/**
 * Заполнение шаблона доступных удобств в объявлении
 * @param {Array} features массив доступных удобств
 * @returns фрагмент кода
 */
const renderFeatures = (features) => {
  const featuresList = document.createDocumentFragment();
  features.forEach (feature => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${feature}`);
    featuresList.appendChild(featureElement);
  });
  return featuresList;
}

/**
 * Заполнение шаблона фотографий объекта объявления
 * @param {*} photos массив ссылок на фотографии
 * @returns фрагмент кода
 */
const renderPhotos = (photos) => {
  const imgList = document.createDocumentFragment();
  photos.forEach (photo => {
    const imgElement = document.createElement('img');
    imgElement.classList.add('popup__photo');
    imgElement.src = photo;
    imgElement.width = 45;
    imgElement.height = 40;
    imgElement.alt = 'Фотография жилья';
    imgList.appendChild(imgElement);
  });
  return imgList;
}

/**
 * Отрисовка карточки объявления
 * @param {object} advert полный объект-объявление
 * @returns заполненный шаблон
 */
const renderCard = (advert) => {
  const offer = advert.offer;

  //создаем элемент по шаблону
  const card = advertTemplate.cloneNode(true);

  // заголовок объявления
  let offerTitle = card.querySelector('.popup__title')
  offer.title
    ? (offerTitle.textContent = offer.title)
    : offerTitle.remove();

  // адрес объявления
  let offerAddress = card.querySelector('.popup__text--address');
  offer.address
    ? (offerAddress.textContent = offer.address)
    : offerAddress.remove();

  // цена объявления
  let offerPrice = card.querySelector('.popup__text--price');
  offer.price
    ? (offerPrice.textContent = `${offer.price}  ₽/ночь`)
    : offerPrice.remove();

  // тип жилья
  let offerRoomType = card.querySelector('.popup__type');
  offer.type
    ? (offerRoomType.textContent = offerCatalog[offer.type].inRussian)
    : offerRoomType.remove();

  // гости и комнаты
  let offerGuestsRooms = card.querySelector('.popup__text--capacity');
  if ( offer.rooms || offer.guests ) {
    if (offer.rooms) {
      offerRoomType.textContent = `${offer.rooms} комнаты`;
    }
    if (offer.guests) {
      offerRoomType.textContent += ` для ${offer.guests} гостей`;
    }
  } else {
    offerGuestsRooms.remove();
  }

  // Время заезда и выезда
  let checkTime = card.querySelector('.popup__text--time');
  if ( offer.checkin || offer.checkout ) {
    if (offer.checkin) {
      checkTime.textContent = `Заезд после ${offer.checkin}, `;
    }
    if (offer.checkout) {
      checkTime.textContent += `выезд до  ${offer.checkout}`;
    }
  } else {
    checkTime.remove();
  }

  // описание объекта
  card.querySelector('.popup__description').textContent = offer.description;
  let offerDiscription = card.querySelector('.popup__description');
  offer.description
    ? (offerDiscription.textContent = offer.description)
    : offerDiscription.remove();

  // аватарка пользователя
  let userAvatar = card.querySelector('.popup__avatar');
  advert.author.avatar
    ? (userAvatar.src = advert.author.avatar)
    : userAvatar.remove();

  //Доступные удобства объявления
  const features = card.querySelector('.popup__features');
  features.innerHTML=''
  offer.features
    ? features.appendChild(renderFeatures(offer.features))
    : features.remove();

  //фотографии объявления
  const photos = card.querySelector('.popup__photos');
  photos.innerHTML='',
  offer.photos
    ? photos.appendChild(renderPhotos(offer.photos, photos))
    : features.remove();
  return card;
};


//находим блок вставки
const advertBlock = document.querySelector('#map-canvas');
//создаем карточку
let card = renderCard(adverts[1]);

//отрисовать элемент в блок #map-canvas
advertBlock.appendChild(card);
