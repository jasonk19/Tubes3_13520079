const isValid = (text) => {
  if (text.match(/[a-z]/) || text.match(/[^ACGT]/)) {
    return false;
  } else {
    return true;
  }
}

export {
  isValid,
}