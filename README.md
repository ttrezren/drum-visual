# Riddimist

Dunun are the original tom-toms.

## Consisting of Javascript, Markup and APIs

Built with the jamstack and deployed on netlify.
Graphs by d3js. Framework by gridsome. Content by Tim Renner.

The project uses a simple scheme to create a diagram for drum parts based on the West African dunun tradition. These are my personal notes. The goal is to easily add rhythms that will be visually uncluttered, yet provide the necessary information.

## Make your own

### install gridsome if you don't have it

`npm install --global @gridsome/cli`

`git clone git@github.com:ttrezren/drum-visual.git && cd drum-visual`

`yarn install`

### after installation run server with live update

`gridsome develop`

## 3. drum vizualization

1. think up some beats
1. create a new json file in ./content

```json
{
    "name": "Name",
    "steps": 12,
    "parts": [
        {
            "name": "Kenkeni",
            "data": [0,1,2,0,2,2,0,1,2,0,2,2]
        },
        {
            "name": "Sangban",
            "data": [3,0,1,1,0,1,1,0,2,1,0,1]
        },
        {
            "name": "Dununba",
            "data": [0,1,1,0,1,1,0,2,2,0,2,2]
        }
    ]
}
```
where:
*name* becomes the page title

*steps* defines the grid, commonly 12 or 16

*parts* is an array of part objects, each of which has a *name* and *data* key

*data* values cause symbols to be printed in the grid 0 = nothing; 1 = small filled; 2 = large hollow; 3 = large filled

Note: the build script creates a route and graph for every .json file in the *content* folder.

### deploy to netlify by pushing to github

`git push origin master`

[![Netlify Status](https://api.netlify.com/api/v1/badges/03d5a170-4ef9-4916-9679-a73289cde700/deploy-status)](https://app.netlify.com/sites/jolly-wilson-1e0ce9/deploys)

[Riddimist](https://jolly-wilson-1e0ce9.netlify.app/)
