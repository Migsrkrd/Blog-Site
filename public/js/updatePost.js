//create a function that fetchs a specific blogpost, enters it into the textareas in the update page, and allows you to update to the data
const updateBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#updatedTitle').value.trim();
    const content = document.querySelector('#updatedContent').value.trim();
    const id = document.querySelector('.Id').textContent;
    if(title && content && id){
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title, content}),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        const errorMessage = await response.json();
        console.error('Failed to update Blog Post:', errorMessage.message);
      }
    }
  }
    
    document.querySelector('#updatePostBtn').addEventListener('click', updateBlog);