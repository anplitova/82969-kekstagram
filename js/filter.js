'use strict';

window.filter = (function () {
  var filterControls = document.querySelector('.upload-filter-controls');

  return {
    /**
     * Валидация фильтров изображения
     * @return {boolean}
     */
    isValidity: function () {
      var filter = document.querySelector('[name="upload-filter"]:checked');

      if (filter) {
        window.utils.removeError(filterControls);
        return true;
      } else {
        window.utils.addError(filterControls);
        return false;
      }
    },
    /**
     * Событие изменения фильтра
     * @param {Function} callback
     */
    addFilterListener: function (callback) {
      /**
       * Изменение фильтра
       * @param {Event} evt
       */
      filterControls.addEventListener('change', function (evt) {
        if (typeof callback === 'function') {
          callback(evt.target.value);
        }
      });
    }
  };
})();
