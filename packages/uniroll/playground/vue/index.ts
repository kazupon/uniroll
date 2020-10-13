import { rollup } from 'rollup'
import RollupVue from 'rollup-plugin-vue'
import { createMemoryFs, getBaseConfig } from '../../src/index'

const App = `
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HelloWorld from './HelloWorld.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld
  },

  setup() {
    const count = ref(0)
    const msg = computed(() => 'hello world ' + count.value.toString())
    const onClick = () => count.value++

    return {
      count,
      msg,
      onClick
    }
  }
})
</script>

<template>
  <div class="container">
    <h1>Count: {{ count }}</h1>
    <button @click="onClick">Count</button>
    <HelloWorld :msg="msg" />
  </div>
</template>

`

const HelloWorld = `
<script>
export default defineComponent({
  name: 'HelloWorld',
  props: ['msg']
})
</script>

<template>
  <p>{{ msg }}</p>
</template>
`

const EntoryPoint = `
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`

;(async () => {
  const files = {
    '/App.vue': App,
    '/HelloWorld.vue': HelloWorld,
    '/index.ts': EntoryPoint
  }
  const memfs = createMemoryFs(files)
  const { plugins } = getBaseConfig({
    fs: memfs,
    importmaps: {
      imports: {
        vue: 'https://unpkg.com/vue@3.0.0/dist/vue.runtime.esm-browser.js'
      }
    }
  })
  const rolled = await rollup({
    input: '/index.ts',
    onwarn(warnings) {
      console.warn('[warn]', warnings)
    },
    plugins: [
      ...plugins,
      RollupVue({
        compilerOptions: {
          mode: 'function',
          scopeId: null,
          sourceMap: false,
          prefixIdentifiers: false,
          cacheHandlers: false
        }
      })
    ]
  })
  try {
    const out = await rolled.generate({
      file: 'index.js',
      format: 'iife'
    });
    const code = out.output[0].code
    console.log(code)
    // eval(code)
  } catch (e) {
    console.error(e)
  }
})()
