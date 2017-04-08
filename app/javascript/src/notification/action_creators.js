function addNotification(payload) {
  return {type: 'notification/ADD', payload};
}

function removeNotification(payload) {
  return {type: 'notification/REMOVE', payload};
}

export {addNotification, removeNotification};
