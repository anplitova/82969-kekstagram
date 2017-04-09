'use strict';

/**
 * Получить случайное число из диапазона [min, max]
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomNumber = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);

  return random;
};

/**
 * Получить элемент массива по индексу, удалить элемент из массива по индексу (чтобы избежать дублирования данных)
 * @param {Array} array - массив
 * @param {boolean} deleteElement - удалить элемент из массива
 * @return {*} - элемент массива
 */
var getElement = function (array, deleteElement) {
  var index = getRandomNumber(0, array.length - 1);
  var element = array[index];
  if (deleteElement) {
    array.splice(index, 1);
  }

  return element;
};

/**
 * Сгенерировать массив url-изображений
 * @param {number} countUrls - количество изображений
 * @return {Array} - массив url
 */
var generateUrls = function (countUrls) {
  var urls = [];

  for (var i = 0; i < countUrls; i++) {
    urls[i] = i + 1;
  }

  return urls;
};

/**
 * Сгенерировать массив комментариев
 * @param {Array} array - массив
 * @return {Array} - массив комментариев
 */
var generateComments = function (array) {
  var comments = [];
  var countComments = getRandomNumber(1, 2);

  for (var i = 0; i < countComments; i++) {
    var index = getRandomNumber(0, array.length - 1);
    comments[i] = array[index];
  }

  return comments;
};

/**
 * Сгенерировать объект фотографии
 * @param {Array} urls - массив url изображений
 * @param {Array} comments - массив комментариев
 * @return {Object} - фотография
 */
var generatePhoto = function (urls, comments) {
  var photo = {
    url: 'photos/' + getElement(urls, true) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: generateComments(comments)
  };

  return photo;
};

/**
 * Сгенерировать массив фотографий по заданному количеству и параметрам
 * @param {Number} countPhotos - количество генерируемых изображений
 * @param {Array} urls - массив url фотографий
 * @param {Array} comments - массив комментариев
 * @return {Array} - массив фотографий
 */
var generatePhotos = function (countPhotos, urls, comments) {
  var photoArray = [];

  for (var i = 0; i < countPhotos; i++) {
    photoArray[i] = generatePhoto(urls, comments);
  }

  return photoArray;
};

/**
 * Создать HTML-блок с фотографией
 * @param {Object} picture - фотография
 * @return {DocumentFragment} - HTML-блок с фотографией
 */
var createPictureItem = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var pictureImg = pictureElement.querySelector('img');
  var pictureLikes = pictureElement.querySelector('.picture-likes');
  var pictureComments = pictureElement.querySelector('.picture-comments');

  pictureImg.setAttribute('src', picture.url);
  pictureLikes.textContent = picture.likes;
  pictureComments.textContent = picture.comments.length;

  return pictureElement;
};

/**
 * Сгенерировать фрагмент фотографий
 * @param {Array} photos - массив фотографий
 * @return {DocumentFragment} - фрагмент фотографий
 */
var generateFragmentPhotos = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPictureItem(photos[i]));
  }

  return fragment;
};

/**
 * Получить склонение слова по заданному числу
 * @param {Number} number - число
 * @param {Array} words - массив слов
 * @return {string} - вариант слова
 */
var getWordByNumber = function (number, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

/**
 * Отрисовать шаблон комментария
 * @param {number} countComments
 * @return {string} - шаблон
 */
var renderComment = function (countComments) {
  return '<span class="comments-count">' + countComments + '</span> ' + getWordByNumber(countComments, ['комментарий', 'комментария', 'комментариев']);
};

/**
 * Отрисовать элемент галереи
 * @param {Object} picture - изображение
 */
var renderGalleryOverlay = function (picture) {
  var imageGallery = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.gallery-overlay-controls-comments');

  imageGallery.setAttribute('src', picture.url);
  likesCount.textContent = picture.likes;
  commentsCount.innerHTML = renderComment(picture.comments.length);
};

/**
 * Показать элемент
 * @param {Element} el - элемент, который нужно показать
 */
var showElement = function (el) {
  el.classList.remove('invisible');
};

/**
 * Скрыть элемент
 * @param {Element} el - элемент, который нужно скрыть
 */
var hideElement = function (el) {
  el.classList.add('invisible');
};

var PHOTOS_COUNT = 25;
var photoComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'];
var photos = generatePhotos(PHOTOS_COUNT, generateUrls(PHOTOS_COUNT), photoComments);
var pictureTemplate = document.querySelector('#picture-template').content;
var pictureList = document.querySelector('.pictures');
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');

// Сгенерировать изображения и отрисовать их в DOM
pictureList.appendChild(generateFragmentPhotos(photos));
// Скрыть форму кадрирования изображения
hideElement(uploadOverlay);
// Отрисовать первое изображение в галерее
renderGalleryOverlay(photos[0]);
// Показать галерею
showElement(galleryOverlay);