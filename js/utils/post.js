import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextParent, truncateText } from './common';
import dayjs from 'dayjs';

// to use fromNow function
dayjs.extend(relativeTime);

export function createPostElement(post) {
  if (!post) return;
  // find template
  const postTemplate = document.getElementById('postItemTemplate');
  if (!postTemplate) return;

  // clone template
  const liElement = postTemplate.content.firstElementChild.cloneNode(true);

  if (!liElement) return;

  //update title, decscription, author, timeSpan, thumbnail

  setTextParent(liElement, '[data-id = "title"]', post.title);

  setTextParent(liElement, '[data-id = "author"]', post.author);

  setTextParent(liElement, '[data-id = "description"]', truncateText(post.description, 100));

  //calculate timespan
  setTextParent(liElement, '[data-id = "timeSpan"]', ` - ${dayjs(post.updateAt).fromNow()}`);

  const thumbnailElement = liElement.querySelector('[data-id = "thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;
    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnails';
    });
  }

  //attach event
  //go to post detail when click on div.post-item
  const divElement = liElement.firstElementChild;
  if (divElement) {
    divElement.addEventListener('click', () => {
      window.location.assign(`post-detail.html?id=${post.id}`);
    });
  }

  return liElement;
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  //clear current post list
  ulElement.textContent = '';

  // loop postList
  postList.forEach((post, index) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
