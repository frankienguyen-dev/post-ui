import axiosClient from './api/axiosClient';
import postApi from './api/postAPI';
import { setTextParent, setThumnailParent } from './utils';

function createPostElement(post) {
  if (!post) return;
  try {
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
    setTextParent(liElement, '[data-id = "description"]', post.decscription);

    // const thumbnailElement = liElement.querySelector('[data-id = "thumbnail"]');
    // if (thumbnailElement) thumbnailElement.src = post.imageUrl;
    setThumnailParent(liElement, '[data-id = "thumbnail"]', post.imageUrl);

    //attach event

    return liElement;
  } catch (error) {
    console.log('failed to create post item', error);
  }
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
