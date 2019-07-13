<template>
    <div>
        <h1>Circle pack in d3</h1>
        <h2>{{ msg }}</h2>
        <svg id="viz"
            :height='height'
            :width='width'
        >
            <g transform="translate(50,50)">
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
            msg: "👏 from the Graph component",
            height: 600,
            width: 600,
            tweetData: {
                tweets: [] //array of tweets;
            },
        };
    },
    created() {
        this.colourScale = d3
            .scaleOrdinal()
            .range(["#5EAFC6","#FE9922","#93C464","#75739F"]);
    },
    mounted() {
        this.getData();
    },
    methods: {
        packChart() {
            console.log('packChart invoked')
            const packChart = d3.pack();
            packChart.size([500,500]);
            packChart.padding(10);
            const output = packChart(this.packData).descendants();
            console.log("output is", output)
            return output.map((d,i) => {
                const fill = this.colourScale(d.depth);
                return {
                    id: i + 1,
                    r: d.r,
                    x: d.x,
                    y: d.y,
                    fill,
                    stroke: "grey"
                };
            });
        },
        getData() {
            var that = this;
            d3.json('tweets.json', function(data){
                that.tweetData = data;
                console.log(that.tweetData);
            });
        }
    },
    computed: {
        packData() {
            console.log('packData invoked on ' , this.tweetData)
            const nestedTweets = d3
                .nest()
                .key(d => d.user)
                .entries(this.tweetData.tweets);
        
            const packableTweets = {
                id: "All Tweets",
                values: nestedTweets
                };
            console.log('packable ',packableTweets)
            return d3
                .hierarchy(packableTweets, d => d.values)
                .sum(d => d.retweets ? d.retweets.length + d.favorites.length + 1 : 1 )
        },
        output() {
            return this.packChart();
        }
    }
}</script>

<style>
#viz {
    background-color: #ccc;
}
</style>
