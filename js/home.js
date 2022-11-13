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

function renderPagination(pagination) {
  const ulPagination = document.getElementById('pagination');
  console.log('testtttt', ulPagination);
  if (!pagination || !ulPagination) return;

  //calc total pages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  //save page and totalPages to ulPagination
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  //check if enable/disable prev/ next links
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled');
  else ulPagination.firstElementChild?.classList.remove('disabled');

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled');
  else ulPagination.lastElementChild?.classList.remove('disabled');
}

function handlePrevClick(event) {
  event.preventDefault();
  console.log('prev click');
}

function handleNextClick(event) {
  event.preventDefault();
  console.log('next click');
}

function handleFilterChange(filterName, filterValue) {
  //update query params
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  //fetch API

  //re-render post list
}

function initPagination() {
  //bind click event for prev/next link
  const ulPagination = document.getElementById('pagination');
  if (!ulPagination) return;

  //add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick);
  }

  //add click event for next link
  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick);
  }
}

function initURL() {
  const url = new URL(window.location);

  //update search params if neeeded
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

  history.pushState({}, '', url);
}

(async () => {
  try {
    initPagination();
    initURL();

    const queryParams = new URLSearchParams(window.location.search);

    //set default query params if not existed
    console.log(queryParams.toString());

    const { data, pagination } = await postApi.getAll(queryParams);

    renderPostList(data);
    renderPagination(pagination);
  } catch (error) {
    console.log('get all error failed: ', error);
  }
})();
