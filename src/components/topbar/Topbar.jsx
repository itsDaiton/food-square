import React from 'react'
import './topbar.css'
import { Search } from "@material-ui/icons"

export default function Topbar() {
  return (
    <div className='topbarContainer'>
        <div className='topbarLeft'>
          <span className="logo">Food Square</span>
        </div>
        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchIcon"/>
            <input type="text" className="searchInput" placeholder='Search...'/>
          </div>
        </div>
        <div className="topbarRight">
          <div className="profilePictureContainer">
            <img src="/resources/OkayChamp.png" alt="Profile picture" className="profilePicture" />      
          </div>
        </div>
    </div>
  )
}
