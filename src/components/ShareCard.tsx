import { forwardRef } from 'react'
import type { Quote } from '../data/quotes'

type Props = {
  quote: Quote
  time: string
  date: string
}

export const ShareCard = forwardRef<HTMLDivElement, Props>(function ShareCard(
  { quote, time, date },
  ref,
) {
  return (
    <div className="share-stage" aria-hidden="true">
      <div ref={ref} className="share-card">
        <div className="share-card__wash" />
        <p className="share-card__brand">今日一句 · 情绪时钟</p>
        <p className="share-card__time">{time}</p>
        <p className="share-card__date">{date}</p>
        <blockquote className="share-card__quote">
          <span className="share-card__mark">「</span>
          {quote.text}
          <span className="share-card__mark">」</span>
        </blockquote>
        {quote.attribution ? (
          <p className="share-card__attr">{quote.attribution}</p>
        ) : null}
        <div className="share-card__rule" />
        <p className="share-card__foot">把此刻收藏</p>
      </div>
    </div>
  )
})
