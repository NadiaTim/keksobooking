//описываем предпросмотр аватара
const FILE_SUBTYPES = ['gif', 'jpg', 'jpeg', 'png'];

const previewAvatar = document.querySelector('.ad-form-header__preview img');
const inputAvatar = document.querySelector('.ad-form-header__input')
const homePhotoBlock = document.querySelector('.ad-form__photo-container');
const inputHomePhoto = document.querySelector('.ad-form__input');

const checkFileFormat = (file, type, allowedFormats) => {
  const fileMIMEType = file.type.split('/');
  const fileType = fileMIMEType[0];
  const fileSubtype = fileMIMEType[1].toLowerCase();

  let matches = false;

  if (fileType === type) {
    matches = true;

    if(allowedFormats.length > 0 ) {
      matches = allowedFormats.some(() => {
        return fileSubtype;
      });
    }
  }

  return matches;
}


inputAvatar.addEventListener('change', () => {
  const file = inputAvatar.files[0];

  const matches = checkFileFormat(file, 'image', FILE_SUBTYPES);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
})



//описываем предпросмотр изображения предложния
inputHomePhoto.addEventListener('change', () => {
  const file = inputHomePhoto.files[0];

  const matches = checkFileFormat(file, 'image', FILE_SUBTYPES);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {

      const previewBlock = document.createElement('div');
      previewBlock.classList.add('ad-form__photo');
      previewBlock.text
      const previewImg = document.createElement('img');
      previewImg.width = 70;
      previewImg.src = reader.result;

      previewBlock.appendChild(previewImg);
      homePhotoBlock.appendChild(previewBlock);
    });

    reader.readAsDataURL(file);
  }
})
