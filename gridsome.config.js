// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Riddimist',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './content/*.json',
        typeName: 'Graph',
        remark: {
          // remark options
        }
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
    },
    json: {
      // global json options
    }
  }

}
