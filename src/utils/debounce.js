function debounce(cb, timeout) {
  let isCooldown = false;

  return function (args) {
    if (isCooldown) return;

    cb.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, timeout);
  }
}

export default debounce;
