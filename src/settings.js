export const api = {
  url: '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':8000/api' : '/api'),
  imageUrl: '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':8000/' : '/'),
  posts: 'posts',
};
