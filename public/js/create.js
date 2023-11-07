//create a function that takes in the input data from the create page and add to the blogposts data, then redirects to the dashboard
const newBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#newTitle').value.trim();
    const content = document.querySelector('#newContent').value.trim();
    const blog_date = new Date();
    if(title && content && blog_date){
      const response = await fetch('/api/blogposts', {
        method: 'POST',
        body: JSON.stringify({title, content, blog_date}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        const errorMessage = await response.json();
        console.error('Failed to add new Blog Post:', errorMessage.message);
      }
    }
    else{
      alert('improper Posting credentials, please fill out Title and content sections to add you new Post.')
    }
  }
    
    document.querySelector('#submitNewPost').addEventListener('click', newBlog);