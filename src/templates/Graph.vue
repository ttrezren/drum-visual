<template>
  <Layout>
    <h1>Dunun parts for {{ $page.graph.name }}</h1>
    <svg id="viz" :height="height" :width="width">
      <g v-for="a in output" :key="a">
        <!--"output" is a computed function-->
        <g class="line">
          <text class="label" x="0" :y="a[1][0].y + 5">
            {{ a[0] }}
          </text>
          <g v-for="c in a[1]" :key="c.id">
            <circle
              v-if="c.circleSize"
              stroke="black"
              :cx="c.x"
              :cy="c.y"
              :key="c.id"
              :r="c.circleSize"
              :fill="c.fill"
              :stroke-width="c.stroke"
            ></circle>
            <line
              stroke="black"
              :x1="c.x - c.xSize"
              :x2="c.x + c.xSize"
              :y1="c.y - c.xSize"
              :y2="c.y + c.xSize"
              :stroke-width="c.stroke"
            ></line>
            <line
              stroke="black"
              :x1="c.x - c.xSize"
              :x2="c.x + c.xSize"
              :y1="c.y + c.xSize"
              :y2="c.y - c.xSize"
              :stroke-width="c.stroke"
            ></line>
          </g>
        </g>
      </g>
      <!-- <PrintRow width="width" height = "height" data="[0,1,1,0,0,1,1,0]" step="50" :verticalOffset="height-20" /> -->
      <g id="legend">
        <rect height="100%" width="100%" padding="10px" opacity="0">
          <text class="legendTitle" x="0" :y="height + 5">Legend</text>

          <text class="legendItem" x="30" :y="height + 25">— Bell</text>
          <line
            stroke="black"
            :stroke-width="1"
            x1="0"
            x2="10"
            :y1="height + 15"
            :y2="height + 25"
          ></line>
          <line
            stroke="black"
            :stroke-width="1"
            x1="0"
            x2="10"
            :y1="height + 25"
            :y2="height + 15"
          ></line>

          <text class="legendItem" x="30" :y="height + 50">— Closed drum</text>
          <circle
            stroke="black"
            cx="5"
            :cy="height + 50 - 5"
            r="7.5"
            fill="#EEE"
          ></circle>

          <text class="legendItem" x="30" :y="height + 75">— Open drum</text>
          <circle
            stroke="black"
            cx="5"
            :cy="height + 75 - 5"
            r="15"
            fill="#EEE"
          ></circle>
        </rect>
      </g>
    </svg>
  </Layout>
</template>

<page-query>
    query Graph($path: String!) {
        graph: graph(path: $path) {
            name
            steps
            parts {
                name
                data
            }
        }
    }
</page-query>

<script>
import * as d3 from 'd3';
import PrintRow from '~/components/PrintRow.vue';

export default {
  data() {
    return {
      parts: null,
      name: null,
      steps: null,
      scale: null,
      height: 300,
      width: 600,
      xSize: 560,
      ySize: 280,
    };
  },
  created() {
    this.parts = this.$page.graph.parts;
    this.name = this.$page.graph.name;
    this.steps = this.$page.graph.steps;
    this.scale = {
      x: d3
        .scaleLinear()
        .domain([0, this.steps - 1])
        .range([30, 600]),
      y: d3
        .scaleLinear()
        .domain([0, 2])
        .range([10, 290]),
    };
  },
  mounted() {
    let axis = d3
      .axisBottom(this.scale.x)
      .tickFormat('')
      .tickSize(20)
      .ticks(this.steps);
    d3.select('svg')
      .insert('g', ':first-child')
      .attr('id', 'grid')
      .call(axis);
  },
  methods: {
    getSymbol(offset, d, i) {
      let symbol = {
        id: i,
        x: this.scale.x(i),
        y: offset.y + 10,
      };
      if (d > 2) {
        symbol.xSize = 5;
        symbol.circleSize = 7.5;
        symbol.fill = '#EEE';
        symbol.stroke = 1;
        return symbol;
      } else if (d > 1) {
        symbol.xSize = 5;
        symbol.circleSize = 15;
        symbol.fill = '#EEE';
        symbol.stroke = 1;
        return symbol;
      } else if (d > 0) {
        symbol.xSize = 5;
        symbol.stroke = 1;
        return symbol;
      } else {
        return symbol;
      }
    },
    formatData() {
      var result = [];
      let lines = Object.keys(this.parts).length;
      for (var n = 0; n < this.parts.length; n++) {
        var key = this.parts[n].name[0];
        let offset = {
          x: 20,
          y:
            (this.height - this.ySize) / 2 +
            this.ySize / (lines * 2) +
            (this.ySize / lines) * n,
        };
        const output = this.parts[n].data.map((d, i) => {
          return this.getSymbol(offset, d, i);
        });
        result.push([key, output]);
      }
      return result;
    },
  },
  computed: {
    output() {
      return this.formatData();
    },
  },
  components: {
    PrintRow,
  },
};
</script>

<style>
#viz {
  font-size: 14px;
  overflow: visible;
  /* outline: 1px solid red; */
}

g#grid line,
g#grid path {
  stroke: lightblue;
}

g text.label {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 14px;
  fill: lightblue;
}
g text.legendTitle {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 18px;
  fill: lightblue;
}

g text.legendItem {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 16px;
  fill: lightgrey;
}

/* g#legend {
    outline: solid 1px lightblue;
} */

g.line {
  margin-left: 18px;
}
</style>
