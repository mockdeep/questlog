'use strict';

module.exports = {
  updateUser(payload) {
    return {type: 'user/UPDATE', payload};
  }
};
