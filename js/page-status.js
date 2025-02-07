//переменные формы фильтров карты
const formFilter = document.querySelector('.map__filters');
const formFilterSelects = formFilter.querySelectorAll('select');
const formFilterFieldsets = formFilter.querySelectorAll('fieldset');
//const formFilterInterectives = formFilterSelects.union(formFilterFieldsets);
const formFilterInterectives = [...formFilterSelects, ...formFilterFieldsets];

//переменные формы заполнения информации об объявлении
const formAdd = document.querySelector('.ad-form');
const formAddSelects = formAdd.querySelectorAll('select');
const formAddFieldsets = formAdd.querySelectorAll('fieldset');
//const formAddInterectives = formAddSelects.union(formAddFieldsets);
const formAddInterectives = [...formAddSelects, ...formAddFieldsets];


//функция придания странице неактивного состояния
const disabledPage = () => {
  //на месте карты отображается серый прямоугольник
  //document.querySelector('#map-canvas').innerHTML='';

  //форма с фильтрами заблокирована
  formFilter.classList.add('map__filters--disabled');
  //ее интеракивные элементы заблокированы с помощью атрибута disabled
  formFilterInterectives.forEach(element => {
    element.disabled = true;
  })

  //форма заполнения информации об объявлении заблокирована
  formAdd.classList.add('ad-form--disabled');
  //ее интеракивные элементы заблокированы с помощью атрибута disabled (на них или на fieldset)
  formAddInterectives.forEach(element => {
    element.disabled = true;
  })
};

disabledPage();


//функция придания странице активного состояния
const abledPage = () => {

  //форма с фильтрами разблокирована
  formFilter.classList.remove('map__filters--disabled');
  //ее интеракивные элементы разблокированы
  formFilterInterectives.forEach(element => {
    element.disabled = false;
  });

  //форма заполнения информации об объявлении разблокирована
  formAdd.classList.remove('ad-form--disabled');
  //ее интеракивные элементы разблокированы
  formAddInterectives.forEach(element => {
    element.disabled = false;
  });
};

//abledPage();

export { disabledPage, abledPage };
