'use strict';

module.exports = function authenticityToken() {
  const tokenTag = document.getElementsByName('csrf-token')[0];

  return tokenTag && tokenTag.content;
};
