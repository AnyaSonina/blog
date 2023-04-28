import React, {useEffect, useState} from 'react'
import sanityClient from "../client"
import {useParams} from "react-router-dom"
import imageURLBuiler from "@sanity/image-url"
import BlockContent from "@sanity/block-content-to-react"

const builder = imageURLBuiler(sanityClient)
function urlFor(source) {
  return builder.image(source)
}

function OnePost() {

  const [postData, setPostData] = useState(null)

  const {slug} = useParams()

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == $slug]{
      title, 
      slug, 
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author->name,
      "authorImage": author->image
    }`,
    {slug})
    .then((data) => setPostData(data[0]))
    .catch(console.error)
  }, [slug]) 

  if(!postData) return <div>Loading...</div>
  
  const lowerCaseSlug = postData.slug.current.toLowerCase()

  return ( 
    <div className='bg-gray-200 min-h-screen p-12'>
      <div className='container shadow-lg mx-auto bg-emerald-100 rounded-lg bg-blend-darken'>
        <div className='relative'>
        <div className='absolute h-full w-full flex items-center justify-center p-8'>
        <div className='bg-white bg-opacity-90 shadow-[0px_22px_70px_-4px_#000000ad] rounded p-12 z-10'>
        <h2 className='text-3xl lg:text-6xl mb-4'>{postData.title}</h2>
        <div className='flex justify-center text-gray-800'>
          <img 
          className='w-10 h-10 rounded-full'
          src={urlFor(postData.authorImage).width(100).url()} 
          alt="Author is Anna" />
          <h4 className='flex items-center pl-2 text-2xl'>{postData.name}</h4>
          </div>
          </div>
          </div>
          
          <img 
          className='w-full object-cover rounded-t -z-1'
          style= {{height: "400px"}}
          src={urlFor(postData.mainImage).auto("format").url()} 
          alt="main post image" />
          </div>
          
          <div className='post px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full'>
            <div className="btn_group flex gap-2 mb-6">
              <a
               className="inline-block w-20 text-center bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-600 rounded"
              href={`https://github.com/AnyaSonina/${postData.slug.current}`}>Repo</a>
              
              <a
              className="inline-block w-20 text-center bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-600 rounded"
              href={`https://${postData.slug.current.toLowerCase()}.netlify.app/`}>Live</a>
            </div>
            <BlockContent
            blocks = {postData.body}
            projectId = {sanityClient.clientConfig.projectId}
            dataset = {sanityClient.clientConfig.dataset}
            
            />
          </div>
      </div> 
  </div>);
}

export default OnePost;