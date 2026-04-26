'use client'

import { useState, useRef, useEffect } from 'react'

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function pad3(n: number) {
  return String(n).padStart(3, '0')
}

function verseUrl(s: number, v: number) {
  return `https://everyayah.com/data/Alafasy_128kbps/${pad3(s)}${pad3(v)}.mp3`
}

type State = 'idle' | 'loading' | 'playing'
export type VerseRef = { s: number; v: number }

/* ─── Shared icons ────────────────────────────────────────────────────── */

function PlayIcon() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
      <polygon points="1,0.5 8.5,5 1,9.5" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor">
      <rect x="0.5" y="0.5" width="3" height="9" rx="0.8" />
      <rect x="5.5" y="0.5" width="3" height="9" rx="0.8" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ animation: 'islamSpin 0.8s linear infinite' }}
    >
      <circle cx="5" cy="5" r="3.5" strokeOpacity="0.25" />
      <path d="M5 1.5 A3.5 3.5 0 0 1 8.5 5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── VerseAudioButton — single verse ────────────────────────────────── */

export function VerseAudioButton({
  surahId,
  verseId,
}: {
  surahId: number
  verseId: number
}) {
  const [state, setState] = useState<State>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const toggle = () => {
    if (state === 'playing' || state === 'loading') {
      audioRef.current?.pause()
      if (audioRef.current) audioRef.current.currentTime = 0
      setState('idle')
      return
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(verseUrl(surahId, verseId))
      audioRef.current.onplaying = () => setState('playing')
      audioRef.current.onended = () => setState('idle')
      audioRef.current.onerror = () => setState('idle')
    }

    setState('loading')
    audioRef.current.play().catch(() => setState('idle'))
  }

  const isActive = state !== 'idle'

  return (
    <button
      onClick={toggle}
      title={isActive ? 'Arrêter' : 'Écouter ce verset'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.6rem',
        height: '1.6rem',
        borderRadius: '50%',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.3)'}`,
        background: isActive ? 'rgba(201,168,76,0.15)' : 'transparent',
        cursor: 'pointer',
        color: '#C9A84C',
        flexShrink: 0,
        transition: 'all 0.2s',
        padding: 0,
      }}
    >
      {state === 'loading' ? <Spinner /> : state === 'playing' ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}

/* ─── PassageAudioButton — sequential playback ────────────────────────── */

export function PassageAudioButton({ verses, label = 'Écouter le passage' }: { verses: VerseRef[]; label?: string }) {
  const [state, setState] = useState<State>('idle')
  const [currentIdx, setCurrentIdx] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const idxRef = useRef(0)
  const activeRef = useRef(false)

  useEffect(() => {
    return () => {
      activeRef.current = false
      audioRef.current?.pause()
    }
  }, [])

  const stop = () => {
    activeRef.current = false
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    audioRef.current = null
    setState('idle')
    setCurrentIdx(0)
    idxRef.current = 0
  }

  const playFrom = (idx: number) => {
    if (!activeRef.current || idx >= verses.length) {
      setState('idle')
      setCurrentIdx(0)
      idxRef.current = 0
      return
    }

    const { s, v } = verses[idx]
    audioRef.current?.pause()
    const audio = new Audio(verseUrl(s, v))
    audioRef.current = audio

    audio.onplaying = () => {
      if (activeRef.current) setState('playing')
    }
    audio.onended = () => {
      const next = idxRef.current + 1
      idxRef.current = next
      setCurrentIdx(next)
      playFrom(next)
    }
    audio.onerror = () => stop()

    setState('loading')
    idxRef.current = idx
    setCurrentIdx(idx)
    audio.play().catch(() => stop())
  }

  const toggle = () => {
    if (state !== 'idle') {
      stop()
    } else {
      activeRef.current = true
      idxRef.current = 0
      playFrom(0)
    }
  }

  const isActive = state !== 'idle'

  return (
    <button
      onClick={toggle}
      title={isActive ? 'Arrêter' : 'Écouter le passage'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.85rem 0.3rem 0.65rem',
        borderRadius: '999px',
        border: `1px solid ${isActive ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
        background: isActive ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        color: isActive ? '#C9A84C' : '#64748B',
        fontSize: '0.68rem',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {state === 'loading' ? (
        <>
          <Spinner />
          Chargement…
        </>
      ) : state === 'playing' ? (
        <>
          <PauseIcon />
          {currentIdx + 1} / {verses.length}
        </>
      ) : (
        <>
          <PlayIcon />
          {label}
        </>
      )}
    </button>
  )
}
