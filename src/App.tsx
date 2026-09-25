import { useCallback, useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { quoteAtMinute, randomQuote, type Quote } from './data/quotes'
import { FavoritesPanel } from './components/FavoritesPanel'
import { ShareCard } from './components/ShareCard'
import { useAtmosphere } from './hooks/useAtmosphere'
import { formatDate, formatSeconds, formatTime, minutesOfDay, useClock } from './hooks/useClock'
import { useFavorites } from './hooks/useFavorites'

export default function App() {
  const now = useClock()
  useAtmosphere()
  const { favorites, isFav, toggle, remove } = useFavorites()

  const scheduled = useMemo(() => quoteAtMinute(minutesOfDay(now)), [now])
  const [override, setOverride] = useState<Quote | null>(null)
  const quote = override ?? scheduled

  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<number>(0)

  const time = formatTime(now)
  const seconds = formatSeconds(now)
  const date = formatDate(now)
  const saved = isFav(quote.id)

  const notice = useCallback((msg: string) => {
    window.clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const onShuffle = () => {
    setOverride(randomQuote(quote.id))
  }

  const onFav = () => {
    toggle(quote.id)
    notice(saved ? '已取消收藏' : '已收入收藏')
  }

  const onShare = async () => {
    const node = cardRef.current
    if (!node || sharing) return
    setSharing(true)
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: undefined,
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `mood-clock-${time.replace(':', '')}.png`
      a.click()
      notice('卡片已下载')
    } catch {
      notice('生成卡片失败，请稍后再试')
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="stage">
      <div className="wash" />
      <div className="grain" />

      <header className="top">
        <p className="brand">
          <span className="brand__mark" />
          今日一句 · 情绪时钟
        </p>
        <button type="button" className="ghost" onClick={() => setDrawer(true)}>
          我的收藏
          {favorites.length > 0 ? <span className="count">{favorites.length}</span> : null}
        </button>
      </header>

      <main className="center">
        <p className="date">{date}</p>
        <h1 className="clock">
          <span className="clock__hm">{time}</span>
          <span className="clock__sec">{seconds}</span>
        </h1>
        <blockquote className="quote" key={quote.id}>
          <span className="quote__mark">「</span>
          <span className="quote__text">{quote.text}</span>
          <span className="quote__mark">」</span>
        </blockquote>
        {quote.attribution ? <p className="attr">{quote.attribution}</p> : <p className="attr attr--ghost">—</p>}

        <div className="actions">
          <button type="button" className="pill" onClick={onShuffle}>
            换一句
          </button>
          <button type="button" className={`pill${saved ? ' is-on' : ''}`} onClick={onFav}>
            {saved ? '已收藏' : '收藏'}
          </button>
          <button type="button" className="pill" onClick={onShare} disabled={sharing}>
            {sharing ? '生成中…' : '分享卡片'}
          </button>
        </div>
      </main>

      <footer className="foot">
        <span>背景随一日光阴缓缓变色</span>
        <span>本地收藏，不离开这台机器</span>
      </footer>

      <FavoritesPanel
        open={drawer}
        items={favorites}
        onClose={() => setDrawer(false)}
        onPick={(q) => {
          setOverride(q)
          setDrawer(false)
        }}
        onRemove={remove}
      />

      <ShareCard ref={cardRef} quote={quote} time={time} date={date} />

      <div className={`toast${toast ? ' is-on' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
