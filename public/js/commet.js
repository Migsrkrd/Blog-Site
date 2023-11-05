const comment = async () => {
    const response = await fetch('/title/comment');
  };
  
  document.querySelector('#commentbtn').addEventListener('click', comment);