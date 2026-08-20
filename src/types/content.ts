export interface BaseDoc {
  slug: string
  content: string
  date?: string
  tags?: string[]
}

export interface Article extends BaseDoc {
  title: string
  author: string
  description?: string
  cover?: string
  readingMinutes: number
}

export interface Thought extends BaseDoc {
  title?: string
}

export interface Ask extends BaseDoc {
  question: string
  answerer: string
  answered: boolean
}

export interface Heading {
  id: string
  text: string
  depth: number
}
