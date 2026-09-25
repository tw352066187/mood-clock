import { useEffect, useState } from 'react'

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

export function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

export function formatTime(d: Date): string {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}

export function formatSeconds(d: Date): string {
  return pad2(d.getSeconds())
}

export function formatDate(d: Date): string {
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${m} 月 ${day} 日  ·  ${WEEKDAYS[d.getDay()]}`
}

export function minutesOfDay(d: Date): number {
  return d.getHours() * 60 + d.getMinutes()
}

export function useClock(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return now
}
