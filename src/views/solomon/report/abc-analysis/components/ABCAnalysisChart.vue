<template>
  <div ref="chartRef"></div>
</template>
<script setup lang="ts">
  import { ref, Ref, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { formatNumber } from '/@/utils/numberUtil';

  /* eslint-disable-next-line */
  type UpperCaseCharacter =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z';

  // add additional non-letter characters to this union as desired
  type GradeType = UpperCaseCharacter | Lowercase<UpperCaseCharacter>;

  type ABCGrade = {
    grade_qty: GradeType;
    grade_count: GradeType;
    sku?: number;
    order_count?: number;
    pcs?: number;
    prop?: number;
  };

  type ChartData = {
    abcGrade: ABCGrade[];
  };

  const props = defineProps({
    chartData: {
      type: Object as PropType<ChartData>,
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.chartData,
    () => {
      if (!props.chartData) return;
      const { abcGrade } = (props.chartData as ChartData) || { abcGrade: [] };

      const gradeCountList: GradeType[] = [];
      const gradeQtyList: GradeType[] = [];
      let maxPcs: number = 0;
      abcGrade.forEach((item) => {
        if (!gradeCountList.includes(item.grade_count)) {
          gradeCountList.push(item.grade_count);
        }
        if (!gradeQtyList.includes(item.grade_count)) {
          gradeQtyList.push(item.grade_count);
        }
        if (item.pcs && item.pcs > maxPcs) maxPcs = item.pcs;
      });

      gradeCountList.sort((a, b) => {
        if (a < b) return 1;
        if (b > a) return -1;
        return 0;
      });

      gradeQtyList.sort((a, b) => {
        if (a < b) return 1;
        if (b > a) return -1;
        return 0;
      });

      const data = abcGrade.map((item) => {
        return [
          gradeCountList.indexOf(item.grade_count),
          gradeQtyList.indexOf(item.grade_qty),
          item.sku || 0,
          item.pcs || 0,
        ];
      });

      setOptions({
        backgroundColor: '#0f375f',
        tooltip: {
          position: 'top',
        },
        xAxis: {
          name: '입고량',
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: {
            color: '#ccc',
            fontSize: 15,
            verticalAlign: 'top',
          },
          type: 'category',
          data: gradeCountList,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          name: '출고일',
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: {
            color: '#ccc',
            fontSize: 15,
            verticalAlign: 'bottom',
          },
          type: 'category',
          data: gradeQtyList,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          show: false,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          min: 1,
          max: maxPcs,
          // inRange: {
          //   color: ['#D9D9D9'],
          // },
        },
        series: [
          {
            name: 'ABC GRADE',
            type: 'heatmap',
            data: data,
            label: {
              show: true,
              formatter: (param) => {
                const [x, y, sku, pcs] = param.data as any;
                const grade = gradeCountList[x] + gradeQtyList[y];
                return `${grade} \n sku ${formatNumber({ num: sku })} \n pcs ${formatNumber({
                  num: pcs,
                })}`;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
