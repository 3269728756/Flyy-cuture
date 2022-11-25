import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts' //(*===所有)，导入所有 并命名为echarts
// import "./css/home.css"
// import ReactEcharts from "echarts-for-react"


export default function Pie() {
  const chartRef = useRef()
  const chartRef1 = useRef()
  
  
  var data1 = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
              children: [
                {
                  name: 'Jackson',
                  value: 2
                }
              ]
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Aunt Jane',
          children: [
            {
              name: 'Cousin Kate',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Mike',
      children: [
        {
          name: 'Uncle Dan',
          children: [
            {
              name: 'Cousin Lucy',
              value: 3
            },
            {
              name: 'Cousin Luck',
              value: 4,
              children: [
                {
                  name: 'Nephew',
                  value: 2
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];
 const options = {
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 10,
      inRange: {
        color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
      }
    },
    series: {
      type: 'sunburst',
      data: data1,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };
   
   const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
const bgColor = 'white';
const itemStyle = {
  star5: {
    color: colors[0]
  },
  star4: {
    color: colors[1]
  },
  star3: {
    color: colors[2]
  },
  star2: {
    color: colors[3]
  }
};
const data= [
  {
    name: '虚构',
    itemStyle: {
      color: colors[1]
    },
    children: [
      {
        name: '小说',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '疼'
              },
              {
                name: '慈悲'
              },
              {
                name: '楼下的房客'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '虚无的十字架'
              },
              {
                name: '无声告白'
              },
              {
                name: '童年的终结'
              }
            ]
          },
          {
            name: '3☆',
            children: [
              {
                name: '疯癫老人日记'
              }
            ]
          }
        ]
      },
      {
        name: '其他',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '纳博科夫短篇小说全集'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '安魂曲'
              },
              {
                name: '人生拼图版'
              }
            ]
          },
          {
            name: '3☆',
            children: [
              {
                name: '比起爱你，我更需要你'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '非虚构',
    itemStyle: {
      color: colors[2]
    },
    children: [
      {
        name: '设计',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '无界面交互'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '数字绘图的光照与渲染技术'
              },
              {
                name: '日本建筑解剖书'
              }
            ]
          },
          {
            name: '3☆',
            children: [
              {
                name: '奇幻世界艺术\n&RPG地图绘制讲座'
              }
            ]
          }
        ]
      },
      {
        name: '社科',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '痛点'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '卓有成效的管理者'
              },
              {
                name: '进化'
              },
              {
                name: '后物欲时代的来临'
              }
            ]
          },
          {
            name: '3☆',
            children: [
              {
                name: '疯癫与文明'
              }
            ]
          }
        ]
      },
      {
        name: '心理',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '我们时代的神经症人格'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '皮格马利翁效应'
              },
              {
                name: '受伤的人'
              }
            ]
          },
          {
            name: '3☆'
          },
          {
            name: '2☆',
            children: [
              {
                name: '迷恋'
              }
            ]
          }
        ]
      },
      {
        name: '居家',
        children: [
          {
            name: '4☆',
            children: [
              {
                name: '把房子住成家'
              },
              {
                name: '只过必要生活'
              },
              {
                name: '北欧简约风格'
              }
            ]
          }
        ]
      },
      {
        name: '绘本',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '设计诗'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: '假如生活糊弄了你'
              },
              {
                name: '博物学家的神秘动物图鉴'
              }
            ]
          },
          {
            name: '3☆',
            children: [
              {
                name: '方向'
              }
            ]
          }
        ]
      },
      {
        name: '哲学',
        children: [
          {
            name: '4☆',
            children: [
              {
                name: '人生的智慧'
              }
            ]
          }
        ]
      },
      {
        name: '技术',
        children: [
          {
            name: '5☆',
            children: [
              {
                name: '代码整洁之道'
              }
            ]
          },
          {
            name: '4☆',
            children: [
              {
                name: 'Three.js 开发指南'
              }
            ]
          }
        ]
      }
    ]
  }
];
for (let j = 0; j < data.length; ++j) {
  let level1 = data[j].children;
  for (let i = 0; i < level1.length; ++i) {
    let block = level1[i].children;
    let bookScore = [];
    let bookScoreId;
    for (let star = 0; star < block.length; ++star) {
      // eslint-disable-next-line no-loop-func
      let style = (function (name) {
        // eslint-disable-next-line default-case
        switch (name) {
          case '5☆':
            bookScoreId = 0;
            return itemStyle.star5;
          case '4☆':
            bookScoreId = 1;
            return itemStyle.star4;
          case '3☆':
            bookScoreId = 2;
            return itemStyle.star3;
          case '2☆':
            bookScoreId = 3;
            return itemStyle.star2;
        }
      })(block[star].name);
      block[star].label = {
        color: style.color,
        downplay: {
          opacity: 0.5
        }
      };
      if (block[star].children) {
        style = {
          opacity: 1,
          color: style.color
        };
        // eslint-disable-next-line no-loop-func
        block[star].children.forEach(function (book) {
          book.value = 1;
          book.itemStyle = style;
          book.label = {
            color: style.color
          };
          let value = 1;
          if (bookScoreId === 0 || bookScoreId === 3) {
            value = 5;
          }
          if (bookScore[bookScoreId]) {
            bookScore[bookScoreId].value += value;
          } else {
            bookScore[bookScoreId] = {
              color: colors[bookScoreId],
              value: value
            };
          }
        });
      }
    }
    level1[i].itemStyle = {
      color: data[j].itemStyle.color
    };
  }
}
const option1 = {
  backgroundColor: bgColor,
  color: colors,
  series: [
    {
      type: 'sunburst',
      center: ['50%', '48%'],
      data: data,
      sort: function (a, b) {
        if (a.depth === 1) {
          return b.getValue() - a.getValue();
        } else {
          return a.dataIndex - b.dataIndex;
        }
      },
      label: {
        rotate: 'radial',
        color: bgColor
      },
      itemStyle: {
        borderColor: bgColor,
        borderWidth: 2
      },
      levels: [
        {},
        {
          r0: 0,
          r: 40,
          label: {
            rotate: 0
          }
        },
        {
          r0: 40,
          r: 105
        },
        {
          r0: 115,
          r: 140,
          itemStyle: {
            shadowBlur: 2,
            shadowColor: colors[2],
            color: 'transparent'
          },
          label: {
            rotate: 'tangential',
            fontSize: 10,
            color: colors[0]
          }
        },
        {
          r0: 140,
          r: 145,
          itemStyle: {
            shadowBlur: 80,
            shadowColor: colors[0]
          },
          label: {
            position: 'outside',
            textShadowBlur: 5,
            textShadowColor: '#333'
          },
          downplay: {
            label: {
              opacity: 0.5
            }
          }
        }
      ]
    }
  ]
};

    useEffect(() => {
        // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
        const chart = echarts.init(chartRef.current)
        const chart1 = echarts.init(chartRef1.current)

        // 设置图表实例的配置项和数据
        chart.clear()
        chart.setOption(options,true)
        
        chart1.setOption(option1)

        // 组件卸载
        return () => {
            // myChart.dispose() 销毁实例。实例销毁后无法再被使用
            chart.dispose()
            chart1.dispose()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
      <div style={{width: "500px", height: "500px", float:"left",}} ref={chartRef}></div>
      <div style={{width: "500px", height: "500px", float:"right"}} ref={chartRef1}></div>
    
    </div>
    
  )
}



