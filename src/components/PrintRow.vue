<template>
    <svg class="drumRow" :width="width" :height="height">
            <g v-for="(d,i) in data" :key="i">
                <circle stroke="black" fill="none" :cx="(i*step)" :cy="verticalOffset" r=7.5></circle>
                <circle stroke="black" fill="none" :cx="(i*step)" :cy="verticalOffset" r=15></circle>
                <line stroke="black" :x1="(i*step)-5" :x2="(i*step)+5" :y1="verticalOffset-5" :y2="verticalOffset+5"></line>
                <line stroke="black" :x1="(i*step)-5" :x2="(i*step)+5" :y1="verticalOffset+5" :y2="verticalOffset-5"></line>
            </g>
    </svg>
</template>

<script>
export default {
    name: "PrintRow",
    props: ['width','height','verticalOffset','data','step']
}
</script>

