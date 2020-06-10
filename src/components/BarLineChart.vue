<template>
  <div class="chart-content">
    <div class="chart-container"
         :id="chartId"></div>
  </div>
</template>

<script lang="ts">
import ChartMixin from '../assets/js/chartMixin'
import { px2px } from '../assets/js/rem'
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
@Component
export default class BarLineChart extends Mixins(ChartMixin)  {
  private getOption () {
    /* tslint:disable
    let option = {
      'legend': {
        show: true,
        selectedMode: false,
        itemGap: 20,
        top: px2px(20),
        textStyle: {
          fontFamily: 'PingFangSC-Regular',
          color: '#AEB8D7',
          fontSize: px2px(24)
        }
      },
      tooltip: {
        show: true
        // formatter (params) {
        //   console.log('params', params)
        // }
      },
      grid: {
        top: px2px(80),
        bottom: px2px(80)
      },
      'xAxis': [
        {
          'type': 'category',
          'name': '',
          interval: 0,
          'data': [],
          'axisPointer': {
            'type': 'shadow'
          },
          'axisLabel': {
            'show': true,
            interval: 0,
            rotate: 30,
            'textStyle': {
              'color': '#7385BD'
            },
            fontSize: px2px(24)
          },
          'axisLine': {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      'yAxis': [
        {
          'type': 'value',
          'name': '',
          'nameTextStyle': {
            'color': '#7385BD',
            fontSize: px2px(24)
          },
          'axisLabel': {
            'show': true,
            fontSize: px2px(24),
            'textStyle': {
              'color': '#7385BD'
            },
            formatter: '{value}'
          },
          'axisLine': {
            show: false,
            lineStyle: {
              color: '#ECEFF2'
            }
          },
          'splitLine': {
            show: false,
            'lineStyle': {
              'color': '#7d838b'
            }
          },
          axisTick: {
            'show': false
          }
        },
        {
          'type': 'value',
          'name': '',
          'nameTextStyle': {
            'color': '#7385BD',
            fontSize: px2px(24)
          },
          'show': true,
          'axisLabel': {
            show: true,
            fontSize: px2px(24),
            'textStyle': {
              'color': '#7385BD'
            },
            formatter: '{value}%'
          },
          'axisLine': {
            show: false,
            lineStyle: {
              color: '#ECEFF2'
            }
          },
          'splitLine': {
            show: true,
            lineStyle: {
              color: '#213A6B'
            }
          },
          axisTick: {
            'show': false
          }
        }
      ]
    }
    return option
    */
  }
}
</script>

<style lang="scss" scoped>
.chart-content {
  position: relative;
  width: 100%;
  height: 100%;

  .chart-container {
    width: 100%;
    height: 100%;
    div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
