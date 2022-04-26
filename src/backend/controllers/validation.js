const isValid = (text) => {
  if (text.match(/^[ACGT]{1,}$/)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isValid
}