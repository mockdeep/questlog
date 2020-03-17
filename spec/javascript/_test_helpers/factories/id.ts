let idCount = 0;

function nextId() {
  idCount += 1;
  return idCount;
}

export {nextId};
