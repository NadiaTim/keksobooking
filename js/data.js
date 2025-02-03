//получаем необходимые функции из справочника функций
import {
  getRundomSrtingArray,
  getRandomElements,
  getRandomArrayElement,
  getRundomOfLimits
} from './util.js';



//Необходимое количество объявлений
const ADVERTS_COUNT = 10;

//Значения ограничений для случайных значений
const Limits = {
  author: {
    min: 1,
    max: 8,
  },
  xLocation: {
    min: 35.65000,
    max: 35.70000,
    digitCount: 5,
  },
  yLocation: {
    min: 139.70000,
    max: 139.80000,
    digitCount: 5,
  },
  room: {
    min: 1,
    max: 5,
  },
  price: {
    min: 500,
    max: 100000,
  },
  guests: {
    min: 1,
    max: 3,
  },
  photo: {
    min: 1,//минимальный идентификатор фотографии
    max: 3,//максимальный идентификатор фотографии
    //count: 3,//максимальное количество в итоговой подборке
  },
};

//объект-словарь типов мест
// const offerCatalog_ = {
//   'palace': 'замок',
//   'flat': 'квартира',
//   'house': 'дом',
//   'hotel': 'отель',
//   'bungalow': 'бунгало',
// };
const offerCatalog = {
  palace: {
    inRussian: 'дворец',
    minPrice: 10000,
  },
  flat: {
    inRussian: 'квартира',
    minPrice: 1000,
  },
  house: {
    inRussian: 'дом',
    minPrice: 5000,
  },
  hotel: {
    inRussian: 'отель',
    minPrice: 3000,
  },
  bungalow: {
    inRussian: 'бунгало',
    minPrice: 0,
  },
};


//массив-словарь вариантов времени заезда/выезда
const timesCatalog = [
  '12:00',
  '13:00',
  '14:00',
];

//объект-словарь предоставляемых услуг
const featuresCatalog = {
  'wifi':'wifi',
  'dishwasher':'посудомоечная машина',
  'parking':'парковка',
  'washer':'стиральная машина',
  'elevator':'лифт',
  'conditioner':'кондиционер',
};




//функция создания объекта - автора
const createAuthor = () => {
  let userImgId = getRundomOfLimits('author', Limits);
  userImgId = (userImgId < 10)?('0' + userImgId):userImgId;
  return {
    avatar: 'img/avatars/user' + userImgId + '.png',
  };
};

//функция создания объекта - координат
const createLocation = () => {
  return {
    x: getRundomOfLimits('xLocation', Limits),
    y: getRundomOfLimits('yLocation', Limits),
  }
};

//функция создания объекта - информации об объявлении
const createOffer = function () {
  const offer = {
    address: '',
    rooms: getRundomOfLimits('room', Limits),
    checkin: getRandomArrayElement(timesCatalog),
    checkout: getRandomArrayElement(timesCatalog),
    price: getRundomOfLimits('price', Limits),
    type: getRandomArrayElement(offerCatalog),
    features: getRandomElements(featuresCatalog),
    photos: getRundomSrtingArray('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', Limits.photo.max, Limits.photo.min, Limits.photo.count),
  };

  let offerType = offerCatalog[offer.type].inRussian;
  offer.guests = offer.rooms * getRundomOfLimits('guests', Limits);
  offer.title = offerType + ' c ' + offer.rooms + ' комнатами для ' + offer.guests +' гостей';
  offer.description = 'Выгодное предложение. Рассчитано для семей, пар или компаний до '
    + offer.guests + ' человек. В ' + offerType
    + ' имеется ' + offer.rooms + ' комфортных комнаты.'
    + ' Дополнительно для гостей предлагаются: '
    + offer.features.map((feature) => featuresCatalog[feature]).join(', ');
  return offer;
};


//функция создания общего объекта объявления
const createAdvert = () => {
  const advert = {
    author: createAuthor(),
    offer: createOffer(),
    location: createLocation(),
  };
  advert.offer.address = Object.values(advert.location).join(', ');
  return advert
};

//Определяем пустой массив объектов-объявлений с количеством элементов заявенных в константе ADVERTS_COUNT
// заполняем массив нулями
//перезаписываем в каждый элемент объявление, создаваемое функцией createAdvert
const adverts = new Array(ADVERTS_COUNT)
  .fill(null)
  .map(() => createAdvert());

//передаем на выход из скрипта полученный массив объектов-объявлений
export { adverts, offerCatalog };
