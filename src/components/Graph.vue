<template>
    <div>
        <h1>Visualizing data with d3</h1>
        <h2>{{ msg }}</h2>
        <svg id="viz"
            :height='height'
            :width='width'
        >
            <g transform="translate(50,50)">
            <!--"output" is a computed function-->
                <circle
                    v-for="c in output"
                    :key="c.id"
                    :r="c.r"
                    :cx="c.x"
                    :cy="c.y"
                    :fill="c.fill"
                    :stroke="c.stroke"
                ></circle>
            </g>
        </svg>
    </div>
</template>


<script>
import * as d3 from 'd3'

export default {
    name: "Graph",
    data() {
        return {
            height: 600,
            width: 600
        }
    },
    created() {
    },
    mounted() {
        this.getData();
    },
    methods: {
        formatData(){
        },
        getData() {
            var that = this;
            d3.json('data.json', function(data){
                that.componentData = data;
                console.log(that.componentData);
            });
        }
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
