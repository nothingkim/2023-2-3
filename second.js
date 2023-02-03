const { resolve } = require("path");

const users = [
  { id: 1, name: '홍길동' },
  { id: 2, name: '임꺽정' },
];

const posts = [
  { id: 1, userId: 2, title: 'Post 1' },
  { id: 1, userId: 2, title: 'Post 2' },
  { id: 1, userId: 1, title: 'Post 3' },
  { id: 1, userId: 1, title: 'Post 4' },
];

const todos = [
  { id: 1, userId: 1, title: 'Todo 1' },
  { id: 1, userId: 2, title: 'Todo 2' },
  { id: 1, userId: 2, title: 'Todo 3' },
  { id: 1, userId: 1, title: 'Todo 4' },
];

function getUserData(id) {
  console.log(`1) REQUEST USER ${id}`);
  return new Promise((resolve, reject ) => {
  setTimeout(() => {
    const user = users.find((u) => u.id === id);
    console.log(`1) RESPONSE USER ${id}`);
    resolve(user);
  }, Math.random() * 100);
})
}

function getPostList(userId) {
  console.log(`2) REQUEST USER ${userId} POST`);
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    const postList = posts.filter((p) => p.userId === userId);
    console.log(`2) RESPONSE USER ${userId} POST`);
    resolve(postList);
  }, Math.random() * 100);
  })
}


function getTodoList(userId) {
  console.log(`3) REQUEST USER ${userId} TODO`);
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`3) RESPONSE USER ${userId} TODO`);
    const todoList = todos.filter((t) => t.userId === userId);
    resolve(todoList);
  });
  })}

// function task(userId, cb) {
//   // {user: 이름, posts: [title...], todos: [title...]}
//   const result = {};
//   getUserData(userId, (user) => {
//     result.user = user.name;
//     getPostList(userId, (posts) => {
//       result.posts = posts.map(i => i.title);
//       getTodoList(userId, (todos) => {
//         result.todos = todos.map(i => i.title);
//         cb(result);
//       })
//     });
//   });
// }

function task(userId) {
    const result = {};
    return getUserData(userId)
    .then (user=> {result.user = user.name;
        return getPostList(userId);
    })
    .then (posts=> {result.posts = posts.map(i=> i.title);
        return getTodoList(userId);
})
    .then (todos => {result.todos = todos.map(i=>i.title);
    return result;
    })
}

task(1).then(result => console.log(result));
        


// task(1, (result) => {
//   console.log(result);
// });
