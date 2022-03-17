import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import './mainpage.css'

export default function Mainpage() {
  return (
    <>
        <Topbar/>
        <div className="mainpage-container">
          <Leftbar/>
          <Feed/>
          <Rightbar/>
        </div>
    </>
  )
}
