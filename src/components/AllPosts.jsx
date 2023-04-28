import React, {useEffect, useState} from 'react'
import sanityClient from '../client';
import {Link} from "react-router-dom"


function AllPosts() {
const [allPostsData, setAllPostsData] = useState(null)

useEffect(() => {
  sanityClient.fetch(`*[_type == "post"]{
    title, 
    slug, 
    mainImage{
      asset->{
        _id,
        url
      }
    }
  }`)
  .then((data) => setAllPostsData(data))
  .catch(console.error)

}, [])

  return ( 
    <div className='bg-emerald-100 min-h-screen p-12'>
    <div className='container mx-auto'>
      <h2 className='text-5xl flex justify-center mb-5'>Welcome to my learning journey!</h2>
      <h3 className='text-lg text-gray-600 flex justify-center mb-12'>Below you'll find my small and not so small projects I've been creating following Scrimba front-end development course!</h3>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {allPostsData && 
        allPostsData.map((post, index) => (
          <Link to={"/" + post.slug.current} key = {post.slug.current}>

            <span className='bg-white block h-64 relative rounded-lg shadow leading-snug border-l-8 border-green-800' key={index}>
              <img className='w-full h-full rounded-lg object-cover absolute border-4 border-white'
              src={post.mainImage.asset.url} 
              alt="main hero image for a blog post" />
              <span className='block relative h-full flex justify-end items-end pr-4 pb-4'>
                <h2 className='text-gray-800 text-lg font-bold px-3 py-4 bg-red-700
                 hover:bg-red-300 text-red-100 hover:text-red-900 active:bg-red-900 active:text-red-50
                 bg-opacity-75 rounded'
                >{post.title}</h2>
              </span>
              </span>
          </Link>
        ))}
      </div>
    </div>
    </div>
    );
}

export default AllPosts;