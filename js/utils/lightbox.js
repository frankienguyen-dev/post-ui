export function registerLightbox() {
  // handle click for all imgs => event delegations
  document.addEventListener('click', (event) => {
    if (event.target.tagName != 'IMG' || !event.target.dataset.album) return;

    //img with data album
    let imgList = document.querySelectorAll(`img[data-album="${event.target.dataset.album}"]`);
    const index = [...imgList].findIndex((x) => x === event.target);
    console.log('album', event.target, imgList, index);
  });
  // img click => find all imgs with the same albums

  // determine index of selected img
  // show modals with selected img
  // handle pre/next click
}
