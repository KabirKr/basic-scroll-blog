"use strict";

const postContainer = document.querySelector("#js-post-container");
const loader = document.querySelector(".loader");
const search = document.querySelector("#js-search");

let limit = 10;
let page = 1;

const url = "https://jsonplaceholder.typicode.com/posts";

// Load posts from API
const loadPost = async () => {
  const response = await fetch(`${url}?_limit=${limit}&_page=${page}`);
  const posts = await response.json();

  return posts;
};

// Show posts in UI
const showPosts = async () => {
  const posts = await loadPost();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");

    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
    `;

    postContainer.appendChild(postEl);
  });
};

// Show loader and fetch more posts
const showLoading = () => {
  loader.classList.add("show");

  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

// Search posts
const searchPost = (e) => {
  const keyword = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toLowerCase();
    const body = post.querySelector(".post-body").innerText.toLowerCase();

    // Check wheater keyword is found in title or body
    if (title.indexOf(keyword) > -1 || body.indexOf(keyword) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// Load more post at the end
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// Show initial posts
showPosts();

// Search
search.addEventListener("input", searchPost);
