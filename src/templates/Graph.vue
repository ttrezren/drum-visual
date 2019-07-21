<template>
    <Layout>
        <h1>Dunun parts for {{ $page.graph.name }}</h1>
        <svg id="viz"
            :height='height'
            :width='width'
        >
            <g v-for="g in output">
            <!--"output" is a computed function-->
                <g>
                    <circle
                        v-for="c in g"
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
            x: d3.scaleLinear().domain([0,this.steps-1]).range([20,580]),
            y: d3.scaleLinear().domain([0,2]).range([10,290])
        }
    },
    mounted() {
    let axis = d3.axisBottom(this.scale.x).tickFormat("").tickSize(20).ticks(this.steps)
    d3.select("svg").insert("g",":first-child")
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
            for (var n = 0; n < this.parts.length; n++){
                let count = this.parts[n].data.length
                let lines = Object.keys(this.parts).length
                let offset = {
                        x: 10,
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
                result.push(output);
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

