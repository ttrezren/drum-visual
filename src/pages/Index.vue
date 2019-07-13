<template>
  <Layout>
    
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <Graph />

    <p class="home-links">
      <a href="https://gridsome.org/docs" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>

  </Layout>
</template>

<script>
import Graph from '../components/Graph.vue';
import * as d3 from 'd3';

export default {
  metaInfo: {
    title: 'Viz in D3'
  },
  components: {
    Graph,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
