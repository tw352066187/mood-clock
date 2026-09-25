export type Quote = {
  id: string
  text: string
  attribution?: string
}

export const QUOTES: Quote[] = [
  { id: 'q01', text: '风过无痕，心过有声。' },
  { id: 'q02', text: '把今天过成自己喜欢的样子。' },
  { id: 'q03', text: '山中何事，松花酿酒，春水煎茶。', attribution: '唐 · 贾岛' },
  { id: 'q04', text: '月亮不忙，花开不急。' },
  { id: 'q05', text: '慢慢来，比较快。' },
  { id: 'q06', text: '人间烟火，最抚人心。' },
  { id: 'q07', text: '愿你所到之处，遍地阳光。' },
  { id: 'q08', text: '今日事，今日心安。' },
  { id: 'q09', text: '一茶一坐，便是清欢。' },
  { id: 'q10', text: '时间会把答案轻轻放在你手心。' },
  { id: 'q11', text: '不必赶路，沿途都是风景。' },
  { id: 'q12', text: '夜色温柔，心事也该歇一歇。' },
  { id: 'q13', text: '把喜欢的日子过得漫长。' },
  { id: 'q14', text: '云在青天，水在瓶。', attribution: '唐 · 李翱' },
  { id: 'q15', text: '心安处，便是归处。' },
  { id: 'q16', text: '此刻刚好，不早不晚。' },
  { id: 'q17', text: '把光阴过成诗。' },
  { id: 'q18', text: '雨落无声，花开有期。' },
  { id: 'q19', text: '你很好，无需证明。' },
  { id: 'q20', text: '世界很大，你要对自己温柔。' },
  { id: 'q21', text: '星光不问赶路人。' },
  { id: 'q22', text: '一念清静，便是莲花。' },
  { id: 'q23', text: '把烦恼泡进茶里，喝掉。' },
  { id: 'q24', text: '春有百花秋有月，夏有凉风冬有雪。', attribution: '宋 · 无门慧开' },
  { id: 'q25', text: '日子不慌，人心不乱。' },
  { id: 'q26', text: '听见风，就听见了远方。' },
  { id: 'q27', text: '把此刻收藏，它不会再来。' },
  { id: 'q28', text: '温柔是一种力量。' },
  { id: 'q29', text: '山河远阔，人间值得。' },
  { id: 'q30', text: '静下来，世界会靠近你。' },
  { id: 'q31', text: '一杯水，一窗光，便足够。' },
  { id: 'q32', text: '愿你被岁月善待。' },
  { id: 'q33', text: '不必完美，恰好就好。' },
  { id: 'q34', text: '晨光会原谅昨夜的疲惫。' },
  { id: 'q35', text: '把心放软，路会变宽。' },
  { id: 'q36', text: '今日的风，也认识你。' },
]

export function quoteAtMinute(totalMinutes: number): Quote {
  const idx = ((totalMinutes % QUOTES.length) + QUOTES.length) % QUOTES.length
  return QUOTES[idx]!
}

export function randomQuote(exceptId?: string): Quote {
  const pool = exceptId ? QUOTES.filter((q) => q.id !== exceptId) : QUOTES
  return pool[Math.floor(Math.random() * pool.length)]!
}

export function findQuote(id: string): Quote | undefined {
  return QUOTES.find((q) => q.id === id)
}
