import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({ $id ,  title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl text-wrap p-4'>
            <div className='w-full justify-center mb-4'>

                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                 className='rounded-xl flex flex-wrap w-full' />

            </div>
            <h2
            className='text-xl font-bol overflow-hidden text-ellipsis '
            >{title} </h2>
        </div>
    </Link>
  )
}


export default PostCard