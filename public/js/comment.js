//create a function that takes in values of comment area inputs and posts them to comments data, displays them on the title link, and redirects you to the title link page

const newComment = async (event) => {
  event.preventDefault();
  const title = document.querySelector('.blogHeader').textContent
  const comment = document.querySelector('#comment-input').value.trim();
  const blog_id = document.querySelector('.Id').textContent;
  const comment_date = new Date();
  if(blog_id && comment && comment_date){
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({blog_id, comment, comment_date}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/${title}`);
    } else {
      const errorMessage = await response.json();
      console.error('Failed to add comment:', errorMessage.message);
    }
  }
  else{
    alert('improper comment credentials, please fill out name and comment sections to add you comment.')
  }
}
  
  document.querySelector('#addComment').addEventListener('click', newComment);