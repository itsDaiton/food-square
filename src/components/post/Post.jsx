import React from 'react'
import './post.css'
import { MoreVert, FavoriteBorder, CommentOutlined, AddComment, ChatBubbleOutline } from "@material-ui/icons"

export default function Post() {
  return (
    <div className='post'>
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <img src="/resources/OkayChamp.png" alt="Profile picture" className="post-image" />
            <span className="post-fullname">David Poslušný</span>
            <span className="post-username">@itsDaiton</span>
            <span className="post-date">1 hour ago</span>
          </div>
          <div className="post-top-right">
            <MoreVert className='post-more-icon'/>
          </div>    
        </div>
        <div className="post-center">
          //TODO post content
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <FavoriteBorder className="post-bottom-icon" />
            <span className='post-like-count'>15</span>
            <CommentOutlined className="post-bottom-icon"/>
            <span className='post-comments-count'>20</span>
          </div>
          <div className="post-bottom-right">
            <ChatBubbleOutline className="post-bottom-icon"/>
          </div>
        </div>
      </div>
    </div>
  )
}
