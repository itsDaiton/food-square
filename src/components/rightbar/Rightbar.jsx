import React from 'react'
import './rightbar.css'

export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="rightbar-wrapper">
        <div className="rightbar-following">
          <h1 className='rightbar-following-header'>Following</h1>
          <ul className="rightbar-list">
            <li className="rightbar-list-item">
                <img src="/resources/EZ.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">Adam Smith</span>
                <span className="post-username">@smith874</span>
            </li>
            <li className="rightbar-list-item">
                <img src="/resources/ICANT.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">Boris Small</span>
                <span className="post-username">@therealboris</span>
            </li>
            <li className="rightbar-list-item">
                <img src="/resources/KEKW.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">Susan Sad</span>
                <span className="post-username">@itssusansad</span>
            </li>
            <li className="rightbar-list-item">
                <img src="/resources/monkaW.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">David Hardy</span>
                <span className="post-username">@davidhardy1</span>
            </li>
            <li className="rightbar-list-item">
                <img src="/resources/PogU.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">Volodymyr Zelenskyj</span>
                <span className="post-username">@zelensbot</span>
            </li>
            <li className="rightbar-list-item">
                <img src="/resources/YEP.png" alt="Profile picture" className="rightbar-image" />
                <span className="post-fullname">Peter Pan</span>
                <span className="post-username">@pp123</span>
            </li> 
          </ul>    
        </div>
      </div>
    </div>
  )
}
