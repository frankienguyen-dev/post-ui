import axiosClient from './api/axiosClient';
import postApi from './api/postAPI';

console.log('hello there!!');

async function main() {
  const queryParams = {
    _pages: 1,
    _limit: 10,
  };
  const response = await postApi.getAll(queryParams);
  console.log(response);
}

main();
