export class Post {}
export class User {}

// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = VIEWER_ID;
const usersById = {
  [VIEWER_ID]: viewer,
};

// Mock post data
const postsById = {};
const postIdsByUser = {
  [VIEWER_ID]: [],
};
let nextPostId = 0;
addPost(
  'New JavaScript framework',
  '',
  'Petya Petin',
  'New JavaScript framework description',
  true
);
addPost(
  'New JavaScript library',
  '',
  'Petya Petin',
  'New JavaScript library description',
  true
);

export function addPost(
  title,
  img_url,
  author,
  description,
  complete
) {
  const post = new Post();
  post.complete = !!complete;
  post.id = `${nextPostId++}`;
  post.title = title;
  post.img_url = title;
  post.author = title;
  post.description = title;
  postsById[post.id] = post;
  postIdsByUser[VIEWER_ID].push(post.id);
  return post.id;
}

export function changePostStatus(id, complete) {
  const post = getPost(id);
  post.complete = complete;
}

export function getPost(id) {
  return postsById[id];
}

export function getPosts(status = 'any') {
  const posts = postIdsByUser[VIEWER_ID].map(id => postsById[id]);
  if (status === 'any') {
    return posts;
  }
  return posts.filter(post => post.complete === (status === 'completed'));
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER_ID);
}

export function removePost(id) {
  const postIndex = postIdsByUser[VIEWER_ID].indexOf(id);
  if (postIndex !== -1) {
    postIdsByUser[VIEWER_ID].splice(postIndex, 1);
  }
  delete postsById[id];
}

export function renamePost(id, text) {
  const post = getPost(id);
  post.title = text;
}
