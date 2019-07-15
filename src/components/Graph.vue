<template>
    <div>
        <h1>Dunun parts</h1>
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
    </div>
</template>

<script>
import * as d3 from 'd3'
import dununba from './dununba'
import gidanba from './gidanba'
import sofa from './sofa'
let steps = 16
export default {
    name: "Graph",
    data() {
        return {
            height: 300,
            width: 600,
            xSize: 560,
            ySize: 280,
            parts: sofa,
            scale: {
                x: d3.scaleLinear().domain([0,steps-1]).range([20,580]),
                y: d3.scaleLinear().domain([0,2]).range([10,290])
            }

        }
    },
    created() {
        },
    mounted() {
            let axis = d3.axisBottom(this.scale.x).tickFormat("").tickSize(20).ticks(12)
            d3.select("svg").insert("g",":first-child")
                .call(axis)
        // this.getData();
    },
    methods: {
        sizeMap: d3.scaleOrdinal([0,5,10,5])
            .domain([0,1,2,3]),
        strokeMap: d3.scaleOrdinal([0,0,2,2])
            .domain([0,1,2,3]),
        fillMap: d3.scaleOrdinal([null,"#EEE","#EEE","#888"])
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
        getData() {
            var that = this;
            d3.json('data.json', function(data){
                that.componentData = data;
                console.log(that.componentData);
            });
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
    background-color: #ccc;
}
</style>
