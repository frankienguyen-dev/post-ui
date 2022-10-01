import axiosClient from './api/axiosClient';
import postApi from './api/postAPI';
import { setTextParent, setThumnailParent, truncateText } from './utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// to use fromNow function
dayjs.extend(relativeTime);

function createPostElement(post) {
  if (!post) return;
  // find template
  const postTemplate = document.getElementById('postItemTemplate');
  if (!postTemplate) return;

  // clone template
  const liElement = postTemplate.content.firstElementChild.cloneNode(true);

  if (!liElement) return;

  //update title, decscription, author, timeSpan, thumbnail
  // const titleElement = liElement.querySelector('[data-id = "title"]');
  // if (titleElement) titleElement.textContent = post.title;
  setTextParent(liElement, '[data-id = "title"]', post.title);

  // const authorElement = liElement.querySelector('[data-id = "author"]');
  // if (authorElement) authorElement.textContent = post.author;
  setTextParent(liElement, '[data-id = "author"]', post.author);

  // const decsElement = liElement.querySelector('[data-id = "description"]');
  // if (decsElement) decsElement.textContent = post.decscription;
  setTextParent(liElement, '[data-id = "description"]', truncateText(post.description, 100));

  //calculate timespan
  setTextParent(liElement, '[data-id = "timeSpan"]', ` - ${dayjs(post.updateAt).fromNow()}`);

  // const thumbnailElement = liElement.querySelector('[data-id = "thumbnail"]');
  // if (thumbnailElement) thumbnailElement.src = post.imageUrl;
  setThumnailParent(liElement, '[data-id = "thumbnail"]', post.imageUrl);

  //attach event

  return liElement;
}

function renderPostList(postList) {
  console.log('postlist: ', postList);
  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById('postList');
  if (!ulElement) return;

  // loop postList
  postList.forEach((post, index) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

(async () => {
  try {
    const queryParams = {
      _pages: 1,
      _limit: 6,
    };
    const { data, panigation } = await postApi.getAll(queryParams);
    renderPostList(data);
  } catch (error) {
    console.log('get all error failed: ', error);
  }
})();
