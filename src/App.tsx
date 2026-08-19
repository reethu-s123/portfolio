import React from 'react'
import Layout from './components/Layout'
import ThreeScene from './components/ThreeScene'
import { bio, projects } from './data/content'

export default function App(){
  return (
    <Layout>
      <header className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <div className="hero-tag">[ WELCOME TO THE FUTURE ]</div>
            <h1 className="hero-title"><span className="title-word">REETHU</span> <span className="title-word neon-cyan">S</span></h1>
            <h2 className="hero-subtitle">SERVICENOW DEVELOPER & AI ARCHITECT</h2>
            <p className="hero-description">{bio.summary}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-neon-primary">EXPLORE WORK</a>
              <a href="#contact" className="btn btn-neon-secondary">GET IN TOUCH</a>
            </div>
            <div className="hero-social">
              <a className="social-link neon-link" href="#">GitHub</a>
            </div>
          </div>
          <div className="hero-visual">
            <ThreeScene />
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="about container">
          <div className="section-header">
            <h2 className="section-title">[ ABOUT ME ]</h2>
            <div className="glitch-line"></div>
          </div>
          <div className="about-grid">
            <div className="about-card neon-border-cyan">
              <h3>Professional Summary</h3>
              <p>{bio.summary}</p>
            </div>
            <div className="about-card neon-border-magenta">
              <h3>Core Skills</h3>
              <ul>
                {bio.skills.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="about-card neon-border-green">
              <h3>Education</h3>
              <p>{bio.education}</p>
            </div>
          </div>
        </section>

        <section id="projects" className="projects container">
          <div className="section-header">
            <h2 className="section-title">[ PROJECTS & INNOVATIONS ]</h2>
            <div className="glitch-line"></div>
          </div>
          <div className="projects-grid">
            {projects.map(p => (
              <article className="project-card neon-border-cyan" key={p.title}>
                <div className="project-header">
                  <h3>{p.title}</h3>
                </div>
                <p className="project-description">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span className="tech-tag neon-cyan" key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact container">
          <div className="section-header">
            <h2 className="section-title">[ INITIATE CONTACT ]</h2>
            <div className="glitch-line"></div>
          </div>
          <div className="contact-grid">
            <div className="contact-card neon-border-cyan">
              <h3>EMAIL</h3>
              <p>reethushivkumarth@gmail.com</p>
              <a href="mailto:reethushivkumarth@gmail.com" className="contact-btn neon-cyan">SEND MESSAGE</a>
            </div>
            <div className="contact-card neon-border-magenta">
              <h3>RESUME</h3>
              <p>Download My CV</p>
              <a href="#" download className="contact-btn neon-magenta">DOWNLOAD CV</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">© 2026 REETHU.DEV | CRAFTED WITH CODE & INNOVATION</p>
        </div>
      </footer>
    </Layout>
  )
}
