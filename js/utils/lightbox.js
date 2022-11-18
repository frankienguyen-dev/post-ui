function showModal(modalElement) {
  const myModal = new window.bootstrap.Modal(modalElement);
  if (myModal) myModal.show();
}

export function registerLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  const imageElement = document.querySelector(imgSelector);
  const prevButton = document.querySelector(prevSelector);
  const nextButton = document.querySelector(nextSelector);

  if (!imageElement || !prevButton || !nextButton) return;

  // light box var
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  // handle click for all imgs => event delegations
  document.addEventListener('click', (event) => {
    if (event.target.tagName != 'IMG' || !event.target.dataset.album) return;

    //img with data album
    imgList = document.querySelectorAll(`img[data-album="${event.target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((x) => x === event.target);
    console.log('album', event.target, imgList, currentIndex);

    // show image at index
    showImageAtIndex(currentIndex);

    // show modal
    showModal(modalElement);
  });
  // img click => find all imgs with the same albums

  // determine index of selected img
  // show modals with selected img
  // handle pre/next click
  prevButton.addEventListener('click', () => {
    // show prev image of current album
  });

  nextButton.addEventListener('click', () => {
    // show next image of current album
  });
}
