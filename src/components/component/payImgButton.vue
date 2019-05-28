<template>
<Button @click="father.operationDetail(params.data,params.rowIndex)" icon="el-icon-search" size="small">查看</Button>
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
