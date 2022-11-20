import postApi from './api/postAPI';

(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    let defaultValues = {
      title: '',
      description: '',
      author: '',
      imageUrl: '',
    };

    if (postId) {
      defaultValues = await postApi.getById(postId);
    }
    console.log('id: ', postId);
    console.log('mode: ', postId ? 'edit' : 'add');
    console.log('defaultValues: ', defaultValues);
  } catch (error) {
    console.log(error);
  }
})();
