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
2. create a new json file in ./content

```json
{
    "name": "Name", //becomes title
    "steps": 12, // usually 12 or 16, forms grid
    "parts": [ // optimized for three parts
        {
            "name": "Kenkeni", // first letter becomes label
            "data": [0,1,2,0,2,2,0,1,2,0,2,2] // must match number of steps
        }, // 0 = nothing; 1 = small filled; 2 = large hollow; 3 = large filled
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

Build script creates a route and graph for every .json file in the *content* folder.

### deploy to netlify by pushing to github

`git push origin master`

[Riddimist](https://www.samizdatpixelpress.net)
