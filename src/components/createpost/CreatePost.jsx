import React, { useState } from 'react'
import './createpost.css'
import Thread from '../post/type/thread/Thread'
import Review from '../post/type/review/Review'
import Recipe from '../post/type/recipe/Recipe'
import { RateReview, Comment, Fastfood } from "@material-ui/icons"

export default function CreatePost() {

  const RADIO_BUTTONS = "post-type";
  const [postType, setPostType] = useState('');

  return (
    <div className='create-post'>
        <div className="create-post-wrapper">
            <div className='create-post-switch'>
                <input id="recipe" type="radio" value="recipe" name={RADIO_BUTTONS} onChange={(e) => {setPostType(e.target.value)}} ></input>
                <label for="recipe">
                  <Fastfood className='create-post-switch-icon'/>
                  <p className='create-post-switch-text'>Recipe</p>
                </label>
                <input id="review" type="radio" value="review" name={RADIO_BUTTONS} onChange={(e) => {setPostType(e.target.value)}} ></input>
                <label for="review">
                  <RateReview className='create-post-switch-icon'/>
                  <p className='create-post-switch-text'>Review</p>
                </label>
                <input id="thread" type="radio" value="thread" name={RADIO_BUTTONS} onChange={(e) => {setPostType(e.target.value)}} ></input>
                <label for="thread">
                  <Comment className='create-post-switch-icon'/>
                  <p className='create-post-switch-text'>Thread</p>
                </label>
            </div>
            <div className='create-post-form-body'>
                {postType === 'recipe' && <Recipe/> }
                {postType === 'review' && <Review/> }
                {postType === 'thread' && <Thread/> }   
            </div>
        </div>

    </div>
  )
}
