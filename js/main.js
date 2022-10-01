import axiosClient from './api/axiosClient';
import postApi from './api/postAPI';


console.log('hello there!!');

async function main() {
  try {
    const queryParams = {
      _pages: 1,
      _limit: 10,
    };
    const data = await postApi.getAll(queryParams);
    console.log('main.js data', data);
  } catch (error) {
    console.log('get all error failed: ', error);
  }

  // await postApi.update({
  //   id: 'sktwi1cgkkuif36dj',
  //   title: 'Dicta molestiae aut 222',
  // });
}

main();
