'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const toggle = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <>
      <div className="video-page">
        <video
          ref={videoRef}
          src="/landing_Animation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <button className="mute-btn" onClick={toggle} aria-label={muted ? 'Unmute' : 'Mute'}>
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
        {muted ? 'UNMUTE' : 'MUTE'}
      </button>
    </>
  )
}
