import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }){
  return (
    <div>
      <nav className="navbar">
        <div className="nav-container container">
          <div className="nav-logo"><span className="logo-icon">&lt;/&gt;</span><span className="logo-text">REETHU.DEV</span></div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">HOME</a></li>
            <li><a href="#about" className="nav-link">ABOUT</a></li>
            <li><a href="#projects" className="nav-link">PROJECTS</a></li>
            <li><a href="#contact" className="nav-link">CONTACT</a></li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  )
}
