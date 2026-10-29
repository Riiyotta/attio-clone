// Shared S-LINKS rows for the legacy (T2) platform pages: eight platform routes, all mounted.
export const PLATFORM_LINKS = [
  { label: 'Assistant', to: '/platform/ask' },
  { label: 'Agents', to: '/platform/custom-agents' },
  { label: 'Data model', to: '/platform/data' },
  { label: 'Apps & developers', to: '/platform/developers' },
  { label: 'Call notes', to: '/platform/call-intelligence' },
  { label: 'Workflows', to: '/platform/workflows' },
  { label: 'Sequences', to: '/platform/sequences' },
  { label: 'Analytics', to: '/platform/reporting' },
]
export const LINKS_HEAD = { title: 'All of Corvale, close at hand.', sub: 'Work your way, from first touch to renewal.' }
export const MARQUEE_ROWS = (items, labels = ['Corvale', 'Ops team', 'Sales', 'RevOps', 'Success']) => {
  const mk = (offset) =>
    Array.from({ length: 16 }, (_, i) => {
      const [icon, title, desc] = items[(i + offset) % items.length]
      return { icon, title, desc, label: labels[(i + offset) % labels.length] }
    })
  return [mk(0), mk(7)]
}
