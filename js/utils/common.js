export function setTextParent(parent, selector, text) {
  if (!parent) return;

  const element = parent.querySelector(selector);

  if (element) element.textContent = text;
}

export function setThumnailParent(parent, selector, img) {
  if (!parent) return;

  const element = parent.querySelector(selector);

  if (element) {
    element.src = img;

    element.addEventListener('error', () => {
      element.src = 'https://via.placeholder.com/1368x400?text=thumbnails';
    });
  }
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1)}…`;
}
