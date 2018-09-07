export default {
  extraBabelPlugins: [
    ["import", {"libraryName": "antd", "style": true}]
  ],
  hash: true,
  html: {
    template: "./src/index.ejs"
  },
  theme: {
     "@primary-color": "#4D8BB6",
     "@link-color": "#1DA57A",
     "@border-radius-base": "5px",
     "@font-size-base": "12px",
     "@line-height-base": "1.2"
   },

}
