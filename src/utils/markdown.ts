import { marked } from 'marked'
import type { Token, Tokens } from 'marked'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import markdownLang from 'highlight.js/lib/languages/markdown'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import diff from 'highlight.js/lib/languages/diff'
import type { Heading } from '../types/content'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('go', go)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('markdown', markdownLang)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('diff', diff)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** 从 inline tokens 提取纯文本（用于标题 id 与目录） */
function inlineText(tokens: readonly Token[]): string {
  let out = ''
  for (const t of tokens) {
    const anyT = t as { text?: unknown; tokens?: Token[] }
    if (Array.isArray(anyT.tokens) && anyT.tokens.length) {
      out += inlineText(anyT.tokens)
    } else if (typeof anyT.text === 'string') {
      out += anyT.text
    }
  }
  return out
}

export function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5·\-]/g, '')
    .toLowerCase()
}

// 渲染期间收集的标题（与渲染器生成 id 完全一致）
const collected: Heading[] = []

marked.use({
  renderer: {
    code({ text, lang }: Tokens.Code) {
      const language = (lang || '').trim()
      let highlighted: string
      if (language && hljs.getLanguage(language)) {
        highlighted = hljs.highlight(text, { language }).value
      } else if (language) {
        highlighted = escapeHtml(text)
      } else {
        highlighted = hljs.highlightAuto(text).value
      }
      const label = language ? `<span class="code-lang">${escapeHtml(language)}</span>` : ''
      const codeClass = language ? ` class="language-${escapeHtml(language)}"` : ''
      return `<pre class="code-block hljs">${label}<code${codeClass}>${highlighted}</code></pre>`
    },
    heading({ tokens, depth }: Tokens.Heading) {
      const text = inlineText(tokens)
      const id = slugify(text)
      collected.push({ id, text, depth })
      return `<h${depth} id="${id}">${text}</h${depth}>`
    },
  },
})

export interface RenderedDoc {
  html: string
  headings: Heading[]
}

export function renderMarkdown(md: string): RenderedDoc {
  collected.length = 0
  const html = marked.parse(md, { async: false }) as string
  return { html, headings: [...collected] }
}

/** 阅读时长估算：中文 400 字/分钟、英文 200 词/分钟 */
export function readingMinutes(md: string): number {
  const cjk = (md.match(/[\u4e00-\u9fa5]/g) || []).length
  const words = (md.match(/[A-Za-z0-9]+/g) || []).length
  return Math.max(1, Math.round(cjk / 400 + words / 200))
}
