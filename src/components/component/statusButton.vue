<template>
<div>

  <Tag color="green" size="large" v-if="params.data.Online">在线</Tag>
  <Tag color="red" size="small" v-else>离线</Tag>
</div>
</template>

<script>
import 'iview/dist/styles/iview.css'

import {
  Button,
  Poptip,
  Tag
} from 'iview'
export default {
  data() {
    return {

    }
  },
  components: {
    Button,
    Poptip,
    Tag
  },
  beforeMount() {},
  mounted() {
  }
}
</script>

<style lang="less" scoped>
</style>
