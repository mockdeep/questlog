let idCount = 0;

function nextId(): number {
  idCount += 1;
  return idCount;
}

export {nextId};
