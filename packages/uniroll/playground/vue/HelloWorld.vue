<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: ['msg']
})
</script>

<template>
  <p>{{ msg }}</p>
</template>
