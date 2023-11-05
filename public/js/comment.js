// const helper = require('../../utils/helpers');

const newComment = async (event) => {
  event.preventDefault();
  const title = document.querySelector('.blogHeader').textContent
  const comment = document.querySelector('#comment-input').value.trim();
  const user_name = document.querySelector('#username-input').value.trim();
  const blog_id = document.querySelector('.Id').textContent;
  const comment_date = new Date();
  if(blog_id && user_name && comment && comment_date){
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({blog_id, user_name, comment, comment_date}),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace(`/${title}`);
    } else {
      const errorMessage = await response.json();
      console.error('Failed to add comment:', errorMessage.message);
    }
  };
  console.log(comment, user_name, blog_id, comment_date)
}
  
  document.querySelector('#addComment').addEventListener('click', newComment);