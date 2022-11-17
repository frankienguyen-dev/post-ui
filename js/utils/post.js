import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextParent, setThumnailParent, truncateText } from './common';

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

  setThumnailParent(liElement, '[data-id = "thumbnail"]', post.imageUrl);

  //attach event

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
