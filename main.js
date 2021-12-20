const fetchBtn = document.getElementById("fetch_btn");
const postsContainer = document.getElementById("posts_container");

fetchBtn.addEventListener("click", async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await response.json();

  postsContainer.innerHTML = posts.map(cardTemplate).join("");
});

function cardTemplate(post) {
  return `
      <div class="card">
        <div class="card-title">
          ${post.title}
        </div>
        <div class="card-body">
          ${post.body}
        </div>
      </div>
    `;
}
