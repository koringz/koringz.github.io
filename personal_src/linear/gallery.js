const { random, PI, cos, sin } = Math;

// 随机生成占比数据
const val = random() * 100;


// 圆心角的一半
const angle = PI * val / 50 / 2;
// 渐变起点
const pointStart = [
    0.5 - 0.5 * cos(angle) * sin(angle),
    0.5 + 0.5 * cos(angle) * cos(angle)
];
// 渐变终点
const pointEnd = [
    0.5 - 0.5 * sin(angle),
    0.5 + 0.5 * cos(angle)
];


option = {
    title: {
        text: 'linear 实现伪弧形渐变',
        left: 'center',
        bottom: 20,
        textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#333',
            fontWeight: 'normal'
        }
    },
    series: [{
        name: '占比',
        type: 'pie',
        startAngle: 270, // 环图起始位置：正下发
        radius: ['50%', '60%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: true,
                position: 'center',
                formatter: ({ data }) => `${data.value.toFixed(2)}%`
            },
            emphasis: {
                show: true
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            name: '满足率',
            value: val,
            label: {
                normal: {
                    fontSize: 18,
                    color: '#585F6E',
                    fontWeight: 'bolder'
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: pointStart[0],
                        y: pointStart[1],
                        x2: pointEnd[0],
                        y2: pointEnd[1],
                        colorStops: [
                            // !! 在此添加渐变过程色 !!
                            { offset: 0, color: '#24BCF9' },
                            { offset: 1, color: '#1ADAE9' }
                        ]
                    },
                    shadowColor: 'rgba(34,192,245,0.8)',
                    shadowBlur: 10
                }
            }
        }, {
            name: '未满足率',
            value: 100 - val,
            label: {
                normal: {
                    show: false,
                    fontSize: 0
                }
            },
            itemStyle: {
                normal: {
                    color: '#f0f0f0'
                },
                emphasis: {
                    color: '#f0f0f0'
                }
            },
            hoverAnimation: false
        }]
    }]
}