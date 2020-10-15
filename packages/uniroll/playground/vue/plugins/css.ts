/**
 * borow from vite
 * https://github.com/vitejs/vite/blob/master/src/node/build/buildPluginCss.ts
 */

import { parseVuePartRequest } from '../utils'
import type { Plugin, TransformResult } from 'rollup'
import type { SFCAsyncStyleCompileOptions } from '@vue/compiler-sfc'

const cssInjectionMarker = `__UNIROLL_VUE_CSS__`
const cssPreprocessLangRE = /\.(less|sass|scss|styl|stylus|postcss)$/
const cssModuleRE = /\.module\.(less|sass|scss|styl|stylus|postcss|css)$/

const isCSSRequest = (file: string) => file.endsWith('.css') || cssPreprocessLangRE.test(file)

export const css = () => {
  return {
    name: 'uniroll-vue-css',
    async transform(code: string, id: string): Promise<TransformResult> {
      const isVueStyle = /\?vue&type=style/.test(id)

      if (isVueStyle) {
        const preprocessLang = (id.match(cssPreprocessLangRE) || [])[1] as SFCAsyncStyleCompileOptions['preprocessLang']
        // TODO: preprocessing other alt css lang
        const query = parseVuePartRequest(id)
        console.log('css plugin: query', query)
        const genCode =
          `let ${cssInjectionMarker} = document.createElement('style');` +
          `${cssInjectionMarker}.innerHTML = ${JSON.stringify(code)};` +
          `document.head.appendChild(${cssInjectionMarker});`
        return {
          code: genCode,
          map: null,
          moduleSideEffects: true
        }
      } else {
        return code
      }
    }
  } as Plugin
}
