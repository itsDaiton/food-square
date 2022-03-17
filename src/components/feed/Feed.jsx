import React from 'react'
import CreatePost from '../createpost/CreatePost'
import Post from '../post/Post'
import './feed.css'

export default function Feed() {
  return (
    <div className='feed'>
      <div className="feed-wrapper">
        <CreatePost/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  )
}

