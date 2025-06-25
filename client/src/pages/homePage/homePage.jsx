import { Link } from 'react-router-dom'
import './homePage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'
function HomePage () {
    const [typingStatus,setTypingStatus]=useState('human1')
  return (
    <div className='homepage'>
        <img src='/orbital.png' alt='img' className='orbital'></img>
        <div className="left">
            <h1>SKSM GPT</h1>
            <h2>Supercharge your creativity and productivity</h2>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus at nihil, eveniet, cupiditate facilis neque mollitia, est in possimus sequi dolor eum doloribus nobis sit quam cum ipsum quis maxime?</h3>
            <a href='/sign-in'>Get Started</a>
        </div>
        <div className="right">
            <div className="imgContainer">
                <div className="bgContainer">
                  <div className="bg"></div>
                </div>
            <img src='/bot.png'alt='bot' className='bot'/>
            <div className="chat">
               <img
                src={typingStatus==='human1'?'/human1.jpeg':typingStatus==='human2'?'/human2.jpeg':'/bot.png'}
                 alt="bot" /> 
                <TypeAnimation
                    sequence={[
                        "Human:We produce food for mice",
                        1000,()=>{
                            setTypingStatus('bot')
                        },
                        "Bot:We produce food for hamsters",
                        1000,()=>{
                            setTypingStatus('human2')
                        },
                        "Human2:We produce food for mice",
                        1000,()=>{
                            setTypingStatus('bot')
                        },
                        "Bot:We produce food for hamsters",
                        1000,()=>{
                            setTypingStatus('human1')
                        },
                    ]}
                    wrapper='span'
                    cursor={true}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                />
            </div>
            </div>
        </div>
        <div className='terms'>
          <img src='/logo.png' alt='logo'></img>
          <div className="links">
            <Link to='/'>Terms of Service</Link>
            <Link to='/'>Privacy Policy</Link>
          </div>
        </div>
    </div>
  )
}
export default HomePage