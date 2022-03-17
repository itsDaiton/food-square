import React from 'react'
import './leftbar.css'
import { Home, Group, RssFeed, PeopleAlt, Restaurant, AccountBox } from "@material-ui/icons"

export default function Leftbar() {
  return (
    <div className='leftbar'>    
      <div className="leftbar-wrapper" sx={{boxShadow: 1}}>
        <ul className='leftbar-list'>
          <li className="leftbar-list-item">
            <Home className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Home</span>
          </li>
          <li className="leftbar-list-item">
            <RssFeed className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Discover</span>
          </li>
          <li className="leftbar-list-item">
            <PeopleAlt className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Following</span>
          </li> 
          <li className="leftbar-list-item">
            <Group className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Followers</span>
          </li>
          <li className="leftbar-list-item">
            <Restaurant className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Recipes</span>
          </li>
          <li className="leftbar-list-item">
            <AccountBox className='leftbar-icon'/>
            <span className="leftbar-list-item-text">Profile</span>
          </li>        
        </ul>
      </div>
    </div>
  )
}
