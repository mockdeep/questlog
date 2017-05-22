function setTags(payload) {
  return {type: 'tag/SET', payload};
}

function updateTag(payload) {
  return {type: 'tag/UPDATE', payload};
}

export {setTags, updateTag};
