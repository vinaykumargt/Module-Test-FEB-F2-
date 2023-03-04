const createBlogBtn = document.getElementById('create-blog-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const titleInput = document.getElementById('blog-title');
const descriptionInput = document.getElementById('blog-description');
const blogPostsContainer = document.getElementById('blog-posts');
let blogPosts = [];

// Open modal when Create a Blog button is clicked
createBlogBtn.addEventListener('click', openModal);

// Close modal when X button is clicked
closeBtn.addEventListener('click', closeModal);

// Close modal when cancel button is clicked
cancelBtn.addEventListener('click', closeModal);

// Save blog post and display it on the page
saveBtn.addEventListener('click', saveBlogPost);

// Delete blog post when Delete button is clicked
blogPostsContainer.addEventListener('click', deleteBlogPost);

// Edit blog post when Edit button is clicked
blogPostsContainer.addEventListener('click', editBlogPost);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clearForm() {
  titleInput.value = '';
  descriptionInput.value = '';
}

function saveBlogPost(event) {
  event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  if (title.trim() === '' || description.trim() === '') {
    alert('Please fill in all fields');
    return;
  }
  const dateTime = new Date();
  const blogPost = { title, description, dateTime };
  blogPosts.push(blogPost);
  displayBlogPosts();
  closeModal();
  clearForm();
}

function displayBlogPosts() {
  blogPostsContainer.innerHTML = '';
  blogPosts.forEach((blogPost, index) => {
    const blogPostElement = document.createElement('div');
    blogPostElement.classList.add('blog-post');
    const titleElement = document.createElement('h3');
    titleElement.textContent = blogPost.title;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = blogPost.description;
    const dateTimeElement = document.createElement('p');
    const dateTimeString = blogPost.dateTime.toLocaleString();
    dateTimeElement.textContent = `Posted on ${dateTimeString}`;
    dateTimeElement.classList.add('dateTime');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.index = index;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.index = index;
    blogPostElement.appendChild(titleElement);
    blogPostElement.appendChild(descriptionElement);
    blogPostElement.appendChild(editBtn);
    blogPostElement.appendChild(deleteBtn);
    blogPostElement.appendChild(dateTimeElement);
    blogPostsContainer.appendChild(blogPostElement);
  });
}

function deleteBlogPost(event) {
  if (event.target.tagName.toLowerCase() === 'button' && event.target.textContent === 'Delete') {
    const index = event.target.dataset.index;
    blogPosts.splice(index, 1);
    displayBlogPosts();
  }
}

function editBlogPost(event) {
  if (event.target.tagName.toLowerCase() === 'button' && event.target.textContent === 'Edit') {
    const index = event.target.dataset.index;
    const blogPost = blogPosts[index];
    titleInput.value = blogPost.title;
    descriptionInput.value = blogPost.description;
    blogPosts.splice(index, 1);
    displayBlogPosts();
    openModal();
  }
}
