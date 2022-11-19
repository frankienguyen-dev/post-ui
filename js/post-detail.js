import dayjs from 'dayjs';
import postApi from './api/postAPI';
import { registerLightbox, setTextParent } from './utils';

//id="goToEditPageLink"
//id="postHeroImage"
//id="postDetailTitle"
//id="postDetailAuthor"
//id="postDetailTimeSpan"
//id="postDetailDescription"

//author: 'Freddie Zieme';
//createdAt: 1662885819124;
//description: 'dolor fuga animi dolore voluptatum aliquam qui doloremque quibusdam similique et officiis sit alias rerum et dolorem necessitatibus rerum quisquam iusto nostrum ut officiis inventore velit voluptates possimus laudantium rerum dolores aut sint velit nisi odio laborum ut tempora nisi hic omnis consequatur et atque voluptas possimus officia voluptatum animi';
//id: 'lea2aa9l7x3a5tg';
//imageUrl: 'https://picsum.photos/id/624/1368/400';
//title: 'Iure aperiam unde';
//updatedAt: 1662885819124;

function renderPostDetail(post) {
  if (!post) return;
  // render title
  setTextParent(document, '#postDetailTitle', post.title);

  // render description
  setTextParent(document, '#postDetailDescription', post.description);

  // render author
  setTextParent(document, '#postDetailAuthor', post.author);

  // render updatedAt
  setTextParent(document, '#postDetailTimeSpan', dayjs(post.updatedAt).format(` - DD/MM/YYYY HH:mm`));

  // render hero image (URL image)
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url('${post.imageUrl}')`;

    //if error load image
    heroImage.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnails';
    });
  }

  // edit pages links
  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`;
    editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit post';
  }
}

(async () => {
  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });

  try {
    // get post id from URL
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    if (!postId) return;

    // fetch post details API
    const post = await postApi.getById(postId);

    // render post detail
    renderPostDetail(post);
  } catch (error) {
    console.log(error);
  }
})();
