export interface Frontmatter {
  [key: string]: string | boolean | string[] | undefined
}

/**
 * 极简 frontmatter 解析器：支持单行 `key: value`、`key: [a, b]` 数组、布尔值。
 * 兼容旧示例中的 `arthor` 拼写（在 store 层做别名处理）。
 */
export function parseFrontmatter(md: string): { data: Frontmatter; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(md)
  if (!match) return { data: {}, content: md }

  const data: Frontmatter = {}
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    const raw = line.slice(sep + 1).trim()
    if (!key) continue

    if (raw.startsWith('[') && raw.endsWith(']')) {
      data[key] = raw
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (raw === 'true' || raw === 'false') {
      data[key] = raw === 'true'
    } else {
      data[key] = raw.replace(/^["']|["']$/g, '')
    }
  }

  const content = match[0].length < md.length ? md.slice(match[0].length) : ''
  return { data, content }
}
