export function setTextParent(parent, selector, text) {
  if (!parent) return;

  const element = parent.querySelector(selector);

  if (element) element.textContent = text;
}

export function setThumnailParent(parent, selector, img) {
  if (!parent) return;

  const element = parent.querySelector(selector);

  if (element) element.src = img;
}
