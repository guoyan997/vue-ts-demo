/**
 * @description echarts图表组件混入
 */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import _ from 'lodash'
import echarts from 'echarts'


@Component
class ChartMixin extends Vue {
  @Prop({ default: () => ({}) }) public option?: object
  @Prop({ default: () => [] }) public chartData?: object[]
  public chartId: string = _.uniqueId('chart')
  public chartInstance: any = undefined
  public resizeTimer: any = null

  public renderChart () {
    // console.log('=== 渲染图表 ===', _.merge(this.getOption(), this.option))
    try {
      if (!this.chartInstance) {
        let chartDom = document.getElementById(this.chartId)
        if (chartDom) {
          // @ts-ignore
          this.chartInstance = echarts.init(chartDom)
          // @ts-ignore
          this.chartInstance.setOption(_.merge(this.getOption(), this.option), true)
        } else {
          // console.log('=== 获取不到图表dom ===')
          return false
        }
      } else {
        // @ts-ignore
        this.chartInstance.setOption(_.merge(this.getOption(), this.option), true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  public resizeChart () {
    if (this.chartInstance) {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = setTimeout(() => {
        this.chartInstance.resize()
      }, 500)
    }
  }
  // 挂载时渲染
  private mounted () {
    this.renderChart()
    // tslint:disable-next-line
    const self = this
    // tslint:disable-next-line
    window.addEventListener('resize', self.resizeChart, false)
  }
  private beforeDestroy () {
    const self = this
    // tslint:disable-next-line
    window.removeEventListener('resize', self.resizeChart)
    if (this.chartInstance) {
      // console.log('=== 释放图表实例 ===')
      this.chartInstance.dispose()
      this.chartInstance = null
      // console.log(this.chartInstance)
    }
  }
  @Watch('chartData', { deep: true })
  private onChartDataChange () {
    this.renderChart()
  }
}
export default ChartMixin
export {
  ChartMixin
}
