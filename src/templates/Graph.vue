<template>
    <Layout>
        <h1>Dunun parts for {{ $page.graph.name }}</h1>
        <svg id="viz"
            :height='height'
            :width='width'
        >
            <g v-for="a in output">
            <!--"output" is a computed function-->
                <g class="line">
                    <text class="label" x="0" :y="a[1][0].y + 5">
                        {{ a[0] }}
                    </text>
                    <circle
                        v-for="c in a[1]"
                        stroke="black"
                        :cx="c.x"
                        :cy="c.y"
                        :key="c.id"
                        :r="c.size"
                        :fill="c.fill"
                        :stroke-width="c.stroke"
                    ></circle>
                </g>
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
import * as d3 from 'd3'

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
            ySize: 280
        }
    },
    created() {
        this.parts = this.$page.graph.parts
        this.name = this.$page.graph.name
        this.steps = this.$page.graph.steps
        this.scale = {
            x: d3.scaleLinear().domain([0,this.steps-1]).range([30,600]),
            y: d3.scaleLinear().domain([0,2]).range([10,290])
        }
    },
    mounted() {
    let axis = d3.axisBottom(this.scale.x).tickFormat("").tickSize(20).ticks(this.steps)
    d3.select("svg").insert("g",":first-child")
        .attr("id", "grid")
        .call(axis)
    },
    methods: {
        sizeMap: d3.scaleOrdinal([0,5,10,5])
            .domain([0,1,2,3]),
        strokeMap: d3.scaleOrdinal([0,0,2,2])
            .domain([0,1,2,3]),
        fillMap: d3.scaleOrdinal([null,"#000","#EEE","#EEE"])
            .domain([0,1,2,3]),
        formatData(){
            var result = [];
            let lines = Object.keys(this.parts).length
            for (var n = 0; n < this.parts.length; n++){
                var key = this.parts[n].name[0];
                let offset = {
                        x: 20,
                        y: (this.height-this.ySize)/2 + this.ySize/(lines*2) + (this.ySize/lines * n)
                    };
                const output = this.parts[n].data.map((d,i) => {
                    return {
                        id: i,
                        x: (this.scale.x(i)),
                        y: (offset.y) + 10,
                        size: this.sizeMap(d),
                        fill: this.fillMap(d),
                        stroke: this.strokeMap(d)
                    };
                })
                result.push([key,output]);
            }
            return result
        },
    },
    computed: {
        output() {
            return this.formatData();
        }
    }
}
</script>

<style>
#viz {
    font-size: 14px;
    overflow: visible;
   /* outline: 1px solid red; */
}

g#grid line,  g#grid path{
    stroke: bisque;
}

g text.label {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 14px;
    fill: bisque;
}

g.line {
    margin-left: 18px;
}
</style>
