import { LoaderOptionsPlugin } from 'webpack'
import { parseVuePartRequest } from '../utils'
import type { ResolveIdResult, LoadResult, TransformResult } from 'rollup'

function isVueSFCParseQuery(id: string): boolean {
  // e.g. (template block): `/App.vue?vue&type=template&id=472cff63`
  return /\?vue&type/.test(id);
}

export function Vue() {
  return {
    name: 'uniroll-plugin-vue',
    async resolveId(id: string, importer?: string): Promise<ResolveIdResult> {
      console.log('uniroll-plugin-vue#resolveId', id, importer)
      return
    },
    async load(id: string): Promise<LoadResult> {
      console.log('uniroll-plugin-vue#load', id)
      return
    },
    async transform(code: string, id: string): Promise<TransformResult> {
      console.log('uniroll-plugin-vue#transform', code, id)
      const query = parseVuePartRequest(id)
      return code
    }
  }
}
