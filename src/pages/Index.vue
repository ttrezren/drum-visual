<template>
  <Layout>
    <ul>
      <li v-for="edge in $page.graphs.edges" :key="edge.node.id">
        <g-link :to="edge.node.path"> {{ edge.node.name }}</g-link>
      </li>    
    </ul>
  </Layout>
</template>

<page-query>
query Graphs {
  graphs: allGraph (sortBy: "name", order: ASC) {
    edges {
      node { 
        id
        name
        path
      }
    }
  }
}
</page-query>

<style>
  body {
    margin: 20px;
  }
</style>
