
const onFilterChange = (callBackFunction) => {
  const filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('change', () => callBackFunction());
};


const compareAdverts = (advert) => {
  let suitableAdvert = true;

  const typeElement = document.querySelector('#housing-type');
  const typeValue = typeElement.value;

  if (
    typeValue === advert.offer.type
    || typeValue === 'any'
  ) {
    suitableAdvert = true;
  } else {
    return false;
  }

  const priceElement = document.querySelector('#housing-price');
  const priceValue = priceElement.value;
  if (
    priceValue === 'low' && advert.offer.price < 10000
    || priceValue === 'middle' && advert.offer.price >= 10000 && advert.offer.price <= 50000
    || priceValue === 'high' && advert.offer.price > 50000
    || priceValue === 'any'
  ) {
    suitableAdvert = true;
  } else {
    return false;
  }

  const roomsElement = document.querySelector('#housing-rooms');
  const roomsValue = roomsElement.value;
  if (
    roomsValue === 'any'
    || Number(roomsValue) === advert.offer.rooms
  ) {
    suitableAdvert = true;
  } else {
    return false;
  }

  const guestsElement = document.querySelector('#housing-guests');
  const guestsValue = guestsElement.value;
  if (
    guestsValue === 'any'
    || Number(guestsValue) === advert.offer.guests
    || Number(guestsValue) === 0 && advert.offer.guests > 4
  ) {
    suitableAdvert = true;
  } else {
    return false;
  }

  const featuresElements = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
  const featuresServer = advert.offer.features;
  if (featuresServer) {
    suitableAdvert = featuresElements.every((feature) => featuresServer.includes(feature.value));
  } else if (!featuresServer && featuresElements.length) {
    suitableAdvert = false;
  }
  return suitableAdvert;
}

export { compareAdverts, onFilterChange };
