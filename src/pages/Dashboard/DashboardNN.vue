<template>
  <div>
    <div class="row">
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">Accuracy</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.accuracy}}</h3>
                </template>
            </card>
        </div>
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">Precision</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.precision}}</h3>
                </template>
            </card>
        </div>
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">Recall</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.recall}}</h3>
                </template>
            </card>
        </div>

    </div>

    <div class="row">
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">AUC</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.auc}}</h3>
                </template>
            </card>
        </div>
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">Loss</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.loss}}</h3>
                </template>
            </card>
        </div>
        <div class="col-md-4">
            <card type="chart">
                <template slot="header">
                    <h5 class="card-category">Val loss</h5>
                    <h3 class="card-title"><i class="tim-icons icon-chart-pie-36 text-primary "></i> {{metrics.val_loss}}</h3>
                </template>
            </card>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <card type="chart">
                <template slot="header">
                    <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> ROC CURVE</h3>
                </template>
                <scatter-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="rocChart.chartData"
                        :gradient-colors="rocChart.gradientColors"
                        :gradient-stops="rocChart.gradientStops"
                        :extra-options="rocChart.extraOptions">
                </scatter-chart>
            </card>
        </div>
        <div class="col-md-6">
            <card>
                <template slot="header">
                    <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> Confusion matrix</h3>
                </template>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="confusion-matrix">
                    <div class="row">
                        <div>
                            <h4>Predicted values</h4>
                        </div>
                    </div>
                            <!-- tn, fp, fn, tp --->
                    <div class="row">
                        <div class="option positive-value">
                            {{this.metrics.confusion_matrix.true_positive}}
                        </div>
                        <div class="option negative-value">
                             {{this.metrics.confusion_matrix.false_positive}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="option negative-value">
                            {{this.metrics.confusion_matrix.false_negative}}
                        </div>
                        <div class="option positive-value">
                            {{this.metrics.confusion_matrix.true_negative}}
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </card>
        </div>
    </div>

  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import ScatterChart from '@/components/Charts/ScatterChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './TaskList';
  import UserTable from './UserTable';
  import config from '@/config';

  import axios from 'axios';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      ScatterChart
    },
    data() {
      return {
        metrics: {
            accuracy: 0.0,
            recall: 0.0,
            precision: 0.0,
            auc: 0.0,
            loss: 0.0,
            val_loss: 0.0,
            confusion_matrix: {
                true_positive: 0,
                false_positive: 0,
                false_negative: 0,
                true_negative: 0
            }
        },
        rocChart: {},

      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
      // this.i18n = this.$i18n;
      // if (this.enableRTL) {
      //   this.i18n.locale = 'ar';
      //   this.$rtl.enableRTL();
      // }
      // this.initBigChart(0);
      console.log("doing request");
      axios.get(`http://localhost:3000/api/results/${this.$route.params.id}/`).then((response) => {
          console.log(response.data);
          this.metrics.accuracy = response.data.accuracy;
          this.metrics.auc = response.data.auc;
          this.metrics.precision = response.data.precision;
          this.metrics.recall = response.data.recall;
          this.metrics.loss = response.data.loss;
          this.metrics.val_loss = response.data.val_loss;

          let roc_chart_data = [];

          let fp_rate = JSON.parse(response.data.settings.roc_curve.fp_rate);
          let tp_rate = JSON.parse(response.data.settings.roc_curve.tp_rate);

          fp_rate.forEach(function (value, i) {
              roc_chart_data.push({
                  x: value,
                  y: tp_rate[i]
              });
          });

          // second roc curve
          let fp_rate_2 = JSON.parse("[0.0, 0.13067896308119772, 1.0]");
          let tp_rate_2 = JSON.parse("[0.0, 0.9637077722655327, 1.0]");

          let roc_2 = [];

          fp_rate_2.forEach(function (value, i) {
              roc_2.push({
                  x: value,
                  y: tp_rate_2[i]
              });
          });


          // tn, fp, fn, tp

          let confusion_matrix = JSON.parse(response.data.settings.confusion_matrix);

          this.metrics.confusion_matrix.true_positive = confusion_matrix[0][0];
          this.metrics.confusion_matrix.true_negative = confusion_matrix[1][1];
          this.metrics.confusion_matrix.false_positive = confusion_matrix[0][1];
          this.metrics.confusion_matrix.false_negative = confusion_matrix[1][0];

          this.rocChart = {
            extraOptions: chartConfigs.purpleChartOptions,
            chartData: {
            datasets: [
                {
                  label: "NNM",
                  fill: true,
                  showLine: true,
                  borderColor: config.colors.primary,
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: config.colors.primary,
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: config.colors.primary,
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: roc_chart_data,
                },
                {
                  label: "SVM",
                  fill: true,
                  showLine: true,
                  borderColor: '#d7a0d9',
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: '#d7a0d9',
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: '#d7a0d9',
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: roc_2,
                },
                {
                  label: "Reference",
                  fill: true,
                  showLine: true,
                  borderColor: config.colors.danger,
                  borderWidth: 2,
                  borderDash: [5,5],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: config.colors.primary,
                  pointBorderColor: 'rgba(255,255,255,0)',
                  pointHoverBackgroundColor: config.colors.primary,
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: [{
                      x: 0.0,
                      y: 0.0
                    },
                    {
                      x: 1.0,
                      y: 1.0
                    }
                  ],
                }
            ]
          },
            gradientColors: config.colors.primaryGradient,
            gradientStops: [1, 0.2, 0],
          }
      });

    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
    .confusion-matrix {
        margin-left: 193px;
    }

    .confusion-matrix .option {
        font-size: 46px;
        color: #f9f9fa;
        padding: 30px;
        width: 200px;
        text-align: center;
    }

    .positive-value {
        background-color: #39996a;
    }

    .confusion-matrix .negative-value {
        background-color: #fd5d93;
    }
</style>
