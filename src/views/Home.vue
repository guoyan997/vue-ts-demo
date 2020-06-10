<template>
  <div class="home">
    <div class="chart-div">
      <bar-line-chart :chartData="[]" :option="chartOption"></bar-line-chart>
    </div>
    <div>
      {{msgStr}}{{userName}}
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import BarLineChart from '@/components/BarLineChart.vue'
import { UserModule } from '@/store/modules/user' // 引入store中的user模块
import API from '../assets/js/api'
@Component({
  name: 'home',
  components: {
    BarLineChart
  }
})
export default class extends Vue {
  // 原data数据
  public showList = true
  public testList: any[] = []
  private dataStr = ''
  @Prop({ default: '你好' }) private msg!: string
  // 计算属性 computed
  get listLength () {
    return this.testList.length
  }
  get userName () {
    return UserModule.name
  }
  get msgStr () {
    return this.msg
  }
  get chartOption () {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    const labelList = []
    const dataList = []
    for (let item of this.testList) {
      labelList.push(item.name)
      dataList.push(item.value)
    }
    option.xAxis.data = labelList
    option.series[0].data = dataList
    return option
  }
  public async getBarData () {
    const { __statusCode, data } = await API.getDataFromInterface(
      API.getBarData,
      {
        dateStrM: '201908',
        dateStrJ: '3'
      }
    )
    if (__statusCode === '1') {
      const list = JSON.parse(data).resY
      const temp: any[] = []
      for (const item of list) {
        const obj = {
          name: '',
          value: ''
        }
        obj.name = item.examination_subject
        obj.value = (item.corp_yield_rate * 100) + ''
        temp.push(obj)
      }
      this.testList = temp
    }
  }
  // 生命周期函数
  public created () {
    this.testList.push('哈哈哈')
    this.getBarData()
  }

  @Watch('listLength', { deep: true })
  private onChartDataChange (newData: number) {
    if (newData > 5) {
      this.dataStr = '已经足够长了'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/style/rem.scss';
.home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  .chart-div {
    width: px2rem(400);
    height: px2rem(500);
    background-color: #aeb8d7;
  }
}
</style>
