<template>
<div class="home">
  <Row type="flex" justify="center" align="middle">
    <Col>
    <h1><img :src="img" width="8%">焱猫矿机信息表</h1>
    </Col>
  </Row>
  <Table :rowData="list" :columnDefs="machineListColumns" :defaultColDef="config">
    <Button slot="reflash" type="warning" style="marginRight:1rem" @click.native="reflash()">刷新数据</Button>
  </Table>
</div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/A.vue'
import {
  TableData
} from '@/api/data'
const getTime = (time) => {
  var date = new Date(time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

const getTransTime = (time) => {
  if (time == '' || time == 0) {
    return 0
  }

  time = parseInt(time.substring(2, 10), 16) / 1000

  var days = time / 1000 / 60 / 60 / 24;
  var daysRound = Math.floor(days);
  var hours = time / 1000 / 60 / 60 - (24 * daysRound);
  var hoursRound = Math.floor(hours);
  var minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  var minutesRound = Math.floor(minutes);
  var seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  var time = daysRound + '天' + hoursRound + '时' + minutesRound + '分' + seconds.toFixed(0) + '秒'
  return time;
}

const getOfflineTime = (tim) => {
    console.log(Date.parse(new Date())/1000 - tim);
    let  time =  (Date.parse(new Date())/1000 - tim)*1000
    var days = time / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    var hours = time / 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound = Math.floor(hours);
    var minutes = time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound = Math.floor(minutes);
    var seconds = time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    var times = daysRound + '天' + hoursRound + '时' + minutesRound + '分' + seconds.toFixed(0) + '秒'
    return times;
}

export default {
  name: 'home',
  data() {
    return {
      img: require('@/assets/title.png'),
      list: [],
      config: {
        width: 110,
        sortable: true,
        resizable: true,
        filter: true,
        search: true,
      },
      machineListColumns: [{
          headerName: '序号',
          field: '',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          cellRenderer: params => {
            return params.rowIndex + 1
          },
          valueGetter: params => {
            return params.rowIndex + 1
          },
          width: 100
        },
        {
          headerName: 'ID',
          field: 'ID',
          cellStyle: {
            color: 'black',
            textAlign: 'left'
          },
          width: 180
        },
        {
          headerName: '在线/离线',
          field: 'Online',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          cellRendererFramework: 'statusButton',
          // cellRenderer: params => {
          //   return params.data.Online ? '在线' : '离线'
          // },
          valueGetter: params => {
            return params.data.Online ? '在线' : '离线'
          }
        },
        {
          headerName: '矿工',
          field: 'Worker',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
        {
          headerName: '离线时间',
          field: '',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          cellRenderer: params => {
            return getTime(params.data.OfflineTime)
          },
          valueGetter: params => {
            return getTime(params.data.OfflineTime)
          },
          width: 200
        },
        {
          headerName: '离线时长',
          field: '',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          cellRenderer: params => {
            return params.data.Online?  '----/----/----/----' :getOfflineTime(params.data.OfflineTime)
          },
          valueGetter: params => {
            return params.data.Online?  '----/----/----/----' :getOfflineTime(params.data.OfflineTime)
          },
          width: 200
        },
        {
          headerName: '显卡',
          field: 'CardsCount',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width:100
        },
        {
          headerName: 'IP地址',
          field: 'IPAddress',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 200
        },
        {
          headerName: '运行时间',
          field: 'RunningTime',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 200,
          cellRenderer: params => {
            return getTransTime(params.data.RunningTime)
          },
          valueGetter: params => {
            return getTransTime(params.data.RunningTime)
          },
        },
        {
          headerName: '挖矿时间',
          field: 'MiningTime',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 200,
          cellRenderer: params => {
            return getTransTime(params.data.MiningTime)
          },
          valueGetter: params => {
            return getTransTime(params.data.MiningTime)
          },
        },
        {
          headerName: '温度',
          field: 'Temperature',
          cellStyle: {
            color: 'red',
            textAlign: 'left'
          },
          width: 300
        },
        {
          headerName: '风扇',
          field: 'FanSpeed',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 250
        },
        {
          headerName: '软件版本',
          field: 'Version',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
        {
          headerName: '内核版本',
          field: 'KernelVersion',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
        {
          headerName: '主币',
          field: 'MasterCoinType',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
        // {
        //   headerName: '主币钱包',
        //   field: 'MasterWallet',
        //   cellStyle: {
        //     color: '#8D8D8D',
        //     textAlign: 'left'
        //   },
        //   width: 420
        // },
        {
          headerName: '主币矿池',
          field: 'MasterPool',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 300
        },
        {
          headerName: '主币备用矿池',
          field: 'BackupPool',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 300
        },
        {
          headerName: '主币总算力',
          field: 'MasterTotalPower',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 180
        },
        {
          headerName: '主币单卡算力',
          field: 'MasterEachPower',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          },
          width: 680
        },
        {
          headerName: '主币接收',
          field: 'MasterAccept',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
        {
          headerName: '主币拒绝',
          field: 'MasterReject',
          cellStyle: {
            color: '#8D8D8D',
            textAlign: 'left'
          }
        },
      ],
    }
  },
  components: {
    Table
  },
  methods: {
    async init() {
      this.list = []
      let parmas = ''
      if (window.location.search) parmas = window.location.search
      console.log(parmas);
      await TableData(parmas).then(res => {
        this.list = res.data
        console.log(res.data);
      })
    },
    async reflash() {
      await this.init()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
body {
    padding: 1rem;
    h1 {
        font-size: 2rem;
        color: #409eff;
        font-size: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            margin-right: 1rem;
        }
    }
}
</style>
