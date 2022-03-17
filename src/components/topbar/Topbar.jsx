import React from 'react'
import './topbar.css'
import { Search } from "@material-ui/icons"

export default function Topbar() {
  return (
    <div className='topbar-container'>
        <div className='topbar-left'>
          <span className="logo">Food Square</span>
        </div>
        <div className="topbar-center">
          <div className="search-bar">
            <Search className="search-icon"/>
            <input type="text" className="search-input" placeholder='Search'/>
          </div>
        </div>
        <div className="topbar-right">
          <div className="profile-picture-container">
            <img src="/resources/OkayChamp.png" alt="Profile picture" className="profile-picture" />      
          </div>
        </div>
    </div>
  )
}
