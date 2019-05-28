<template>
<div id="app">
  <router-view />
</div>
</template>

<style lang="less">

::-webkit-scrollbar {
  width: 20px;
  height: 20px;
  opacity: 0;
}

::-webkit-scrollbar-track-piece {
  background-color: #ebebeb;
}

::-webkit-scrollbar-thumb {
  transition: background-color 0.5s;
}

::-webkit-scrollbar-thumb:vertical {
  transition: background-color 0.5s;
  height: 32px;
  background-color: #ccc;
}

::-webkit-scrollbar-thumb:hover {
  transition: background-color 0.5s;
  height: 32px;
  background-color: #888;
}

::-webkit-scrollbar-thumb:horizontal {
  width: 32px;
  background-color: #ccc;
}
</style>
