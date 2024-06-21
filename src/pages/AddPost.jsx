import React from 'react'
import { Container, PostForm } from '../components'
import { useState } from 'react'; 

function AddPost() {

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (postData) => {
    setIsLoading(true);
    try {
      // Your post submission logic here
      // For example:
      // await appwriteService.createPost(postData);
      // After successful submission, you might want t  o redirect or show a success message
    } catch (error) {
      console.error('Error submitting post:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-8 bg-slate-900 text-white min-h-screen'>
    <Container>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <PostForm onSubmit={handleSubmit} />
      )}
    </Container>
  </div>
  )
}

export default AddPost