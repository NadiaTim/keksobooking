//описываем предпросмотр аватара
const FILE_SUBTYPES = ['gif', 'jpg', 'jpeg', 'png'];

const prewiewAvatar = document.querySelector('.ad-form-header__preview img');
const inputAvatar = document.querySelector('.ad-form-header__input')

inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const fileMIMEType = file.type.split('/');
  const fileType = fileMIMEType[0];
  //const fileSubtype = fileMIMEType[1];

  const matches = FILE_SUBTYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (fileType === 'image' && matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      prewiewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})

//описываем предпросмотр изображения предложния





//возможность добавления нескольких изображений
