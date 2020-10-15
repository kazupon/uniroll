/**
 * borow from rollup-plugin-vue 
 * https://github.com/vuejs/rollup-plugin-vue/blob/3222451614e8c5e4c1c3188bd6388285a25851ba/src/index.ts#L320-L372
 */
import qs from 'querystring'

type Query =
  | {
      filename: string
      vue: false
    }
  | {
      filename: string
      vue: true
      type: 'script'
      src?: true
    }
  | {
      filename: string
      vue: true
      type: 'template'
      id?: string
      src?: true
    }
  | {
      filename: string
      vue: true
      type: 'style'
      index: number
      id?: string
      scoped?: boolean
      module?: string | boolean
      src?: true
    }
  | {
      filename: string
      vue: true
      type: 'custom'
      index: number
      src?: true
    }

export function parseVuePartRequest(id: string): Query {
  const [filename, query] = id.split('?', 2)

  if (!query) return { vue: false, filename }

  const raw = qs.parse(query)

  if ('vue' in raw) {
    return {
      ...raw,
      filename,
      vue: true,
      index: Number(raw.index),
      src: 'src' in raw,
      scoped: 'scoped' in raw,
    } as any
  }

  return { vue: false, filename }
}
