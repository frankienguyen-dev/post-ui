import axiosClient from './api/axiosClient';

console.log('hello there!!');

async function main() {
  const response = await axiosClient.get('/posts');
  console.log(response);
}

main();
