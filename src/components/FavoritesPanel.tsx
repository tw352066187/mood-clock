import type { Quote } from '../data/quotes'

type Props = {
  open: boolean
  items: Quote[]
  onClose: () => void
  onPick: (q: Quote) => void
  onRemove: (id: string) => void
}

export function FavoritesPanel({ open, items, onClose, onPick, onRemove }: Props) {
  return (
    <>
      <button
        type="button"
        className={`veil${open ? ' is-on' : ''}`}
        aria-label="关闭收藏"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <header className="drawer__head">
          <div>
            <p className="drawer__kicker">收藏夹</p>
            <h2 className="drawer__title">我的收藏</h2>
          </div>
          <button type="button" className="ghost" onClick={onClose}>
            关闭
          </button>
        </header>
        {items.length === 0 ? (
          <p className="drawer__empty">还没有收藏。遇见喜欢的句子，轻轻按一下「收藏」。</p>
        ) : (
          <ul className="drawer__list">
            {items.map((q) => (
              <li key={q.id} className="drawer__item">
                <button type="button" className="drawer__quote" onClick={() => onPick(q)}>
                  {q.text}
                </button>
                <button
                  type="button"
                  className="ghost ghost--tiny"
                  onClick={() => onRemove(q.id)}
                >
                  移除
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  )
}
