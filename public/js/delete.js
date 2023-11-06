const deleteBlogPost = async (event) => {
    event.preventDefault();
    const id = document.querySelector('.Id').textContent;

    if(id){
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE'});
      if (response.ok) {
        document.location.replace(`/dashboard`);
      }
    }
  }
    
    document.querySelector('#deletebtn').addEventListener('click', deleteBlogPost);