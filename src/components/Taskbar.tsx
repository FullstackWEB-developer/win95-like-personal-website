import React, { useEffect, useState, useRef } from 'react'
import './Taskbar.css'
import StartIcon from '../media/win95icon.png'
import Somebody from '../media/cia.png'
import WorkIcon from '../media/work.png'
import { useStore, useDispatch } from '../context'
import { ENABLE_SOUND, SHOW_DIALUP, SHOW_ABOUT, SHOW_WORK } from '../constants'
import ModemDial from '../media/modem-dial.gif'
import DialingDone from '../media/dialing-done.png'
import SoundOn from '../media/sound-on.png'
import SoundOff from '../media/sound-off.png'
import Windows95Vertical from '../media/windowsvertical.png'
import Linkedin from '../media/linkedin.png'
import Github from '../media/github.png'
import DialupWindowIcon from '../media/dialup-window-icon.png'
import PreviewIcon from '../media/preview.png'

function Taskbar (): JSX.Element {
  const time = new Date()
  const usTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const dispatch = useDispatch()
  const { showDialup, enableSound, showAbout, showWork } = useStore()
  const [showStartPanel, setShowStartPanel] = useState(false)
  const startRef = useRef<HTMLDivElement>(null)
  const startButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.onclick = (event: MouseEvent) => {
      if ((startButtonRef.current?.contains(event.target as Node)) === true) {
        setShowStartPanel(true)
      } else {
        setShowStartPanel(false)
      }
    }
  })

  const StartContent = (): JSX.Element => {
    useEffect(() => {
      window.onclick = (event: MouseEvent) => {
        if ((startRef.current?.contains(event.target as Node)) === true) {
          setShowStartPanel(true)
        } else {
          setShowStartPanel(false)
        }
      }
    })

    return (<div ref={startRef} className='start-content'>
            <div className='start-windows-label'>
            <img src={Windows95Vertical} alt='Connecting'/>
            </div>
            <div className='start-content-items'>
                <div onClick={() => { dispatch({ type: SHOW_ABOUT, payload: true }) }} className='single-item'>
                    <img src={Somebody} alt='Connecting' width='25' />
                    <span>About Me</span>
                </div>
                <a href='https://github.com/musliamar' target='_blank' rel="noreferrer">
                <div className='single-item'>
                <img src={Github} alt='Github icon' width='25' />
                    <span>My GitHub</span>
                </div>
                    </a>
                    <a href='https://www.linkedin.com/in/musliamar/' target='_blank' rel="noreferrer">
                    <div className='single-item'>
                <img src={Linkedin} alt='Linkedin icon' width='25' />
                    <span>My LinkedIn</span>
                </div>
                    </a>
                <div onClick={() => { dispatch({ type: SHOW_WORK, payload: true }) }} className='single-item'>
                <img src={WorkIcon} alt='Connecting' width='25' />
                    <span>My Work</span>
                </div>
                <div onClick={() => { dispatch({ type: SHOW_DIALUP, payload: true }) }} className='single-item'>
                <img src={DialupWindowIcon} alt='Connecting' width='25' />
                    <span>Dial-up Connection</span>
                </div>
            </div>
        </div>)
  }

  return (
    <div className='taskbar-container'>
    <div className='credits'>
        <span>BETA VERSION 1.3.3.7</span>
        <button onClick={() => { dispatch({ type: ENABLE_SOUND, payload: !enableSound }) }}>{enableSound ? 'Disable sound' : 'Enable sound'}</button>
        <span>W95FA font by <a href='https://sava.io/' target='_blank' rel="noreferrer">Alina Sava <img src={PreviewIcon} alt='Preview icon' width='20' /></a></span>
        <span>Windows 95 icons by <a href='https://github.com/trapd00r/win95-winxp_icons' target='_blank' rel="noreferrer">trapd00r <img src={PreviewIcon} alt='Preview icon' width='20' /></a></span>
    </div>
    {showStartPanel && <StartContent />}
    <div className='taskbar'>
        <div className='taskbar-items'>
            <div className='start-and-windows'>
                <div ref={startButtonRef} className={showStartPanel ? 'start-button active' : 'start-button'}>
                    <img src={StartIcon} alt='Start button' width='30' />
                    <span className='start-label'>Start</span>
                </div>
                <div className='windows'>
                    {showDialup && <div className='window-button'>
                        <img src={DialupWindowIcon} alt='Connecting' width='20' />
                        {window.innerWidth > 600 && <span>Dialing status</span>}
                    </div>}
                    {showAbout && <div className='window-button'>
                        <img src={Somebody} alt='Me' width='20' />
                        {window.innerWidth > 600 && <span>About me</span>}
                    </div>}
                    {showWork && <div className='window-button'>
                        <img src={WorkIcon} alt='Me' width='20' />
                        {window.innerWidth > 600 && <span>My work</span>}
                    </div>}
                </div>
            </div>
            <div className='clock-and-icons'>
                {enableSound
                  ? <img onClick={() => { dispatch({ type: ENABLE_SOUND, payload: false }) }} className='icon-in-taskbar' src={SoundOn} alt='Sound on' width='20' />
                  : <img onClick={() => { dispatch({ type: ENABLE_SOUND, payload: true }) }} className='icon-in-taskbar' src={SoundOff} alt='Sound off' width='20' /> }
                {showDialup
                  ? <img src={ModemDial} alt='Dialing' width='23' />
                  : <img onClick={() => { dispatch({ type: SHOW_DIALUP, payload: true }) }} className='icon-in-taskbar' src={DialingDone} alt='Connected' width='23' /> }
                {usTime}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Taskbar
