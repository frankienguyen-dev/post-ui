import postApi from './api/postAPI';
import { initPagination, initSearch, renderPagination, renderPostList } from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    //update query params
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    //reset page if needed
    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url);

    //fetch API
    //re-render post list

    const { data, pagination } = await postApi.getAll(url.searchParams);

    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('failed to fetch post list', error);
  }
}

(async () => {
  try {
    const url = new URL(window.location);

    //update search params if neeeded
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);

    //set default pagination (_page, _limit) on URL
    const queryParams = url.searchParams;

    //attach click event for links
    initPagination({
      elementId: 'pagination',
      defaultPrams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    //set default query params if not existed
    const { data, pagination } = await postApi.getAll(queryParams);

    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('get all error failed: ', error);
  }
})();
