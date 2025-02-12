let postIdCounter = 1; // To generate unique post IDs
let posts = []; // Array to store all posts

// Function to handle new post creation
function postUpdate() {
  const postContent = document.getElementById('post-content').value.trim();
  if (postContent) {
    // Create a new post object
    const newPost = {
      id: postIdCounter++,
      content: postContent,
      likes: 0,
      shares: 0,
      comments: []
    };
    
    posts.push(newPost); // Add the new post to the posts array
    renderPosts(); // Re-render the feed to show the new post
    document.getElementById('post-content').value = ''; // Clear the input field
  }
}

// Function to render posts
function renderPosts() {
  const feed = document.getElementById('feed');
  feed.innerHTML = ''; // Clear the feed before re-rendering

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.id = `post-${post.id}`;
    
    // Generate the post HTML
    postElement.innerHTML = `
      <p>${post.content}</p>
      <div class="actions">
        <button onclick="likePost(${post.id})">Like (${post.likes})</button>
        <button onclick="sharePost(${post.id})">Share (${post.shares})</button>
        <input type="text" placeholder="Add a comment" onkeypress="addComment(event, ${post.id})">
      </div>
      <div class="comments">
        ${post.comments.map(comment => `<p  style="color: black;">${comment}</p>`).join('')}
      </div>
    `;
    
    // Append the post to the feed
    feed.appendChild(postElement);
  });
}

// Function to handle "Like" button click
function likePost(postId) {
  const post = posts.find(post => post.id === postId);
  post.likes++; // Increase the like count
  renderPosts(); // Re-render the feed to update the like count
}

// Function to handle "Share" button click
function sharePost(postId) {
  const post = posts.find(post => post.id === postId);
  post.shares++; // Increase the share count
  renderPosts(); // Re-render the feed to update the share count
}

// Function to handle adding a comment
function addComment(event, postId) {
  if (event.key === 'Enter') {
    const commentText = event.target.value.trim();
    if (commentText) {
      const post = posts.find(post => post.id === postId);
      post.comments.push(commentText); // Add the comment to the post
      event.target.value = ''; // Clear the input field
      renderPosts(); // Re-render the feed to display the new comment
    }
  }
}
