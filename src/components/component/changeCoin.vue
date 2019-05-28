<template>
<div class="">
  <Tag color="primary" @click.native="father.changeAgentStatus(params.data,params.rowIndex)" icon="el-icon-search">切换币种</Tag>
</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      father: null
    }
  },
  methods: {
    message(num) {
      this.show = true
    }
  },
  beforeMount() {},
  mounted() {
    this.father = this.params.context.componentParent
  }
}
</script>

<style lang="less" scoped>
</style>
