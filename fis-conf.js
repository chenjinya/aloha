


fis.match('**/*.{css,less}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  }),
  //release : './$0',
});



// fis.match('**/*.less', {
//   optimizer: fis.plugin('less'),
//   rExt: '.css',
// });
// // 清除其他配置，只保留如下配置
// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   // fis-optimizer-clean-css 插件进行压缩，已内置
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   // fis-optimizer-png-compressor 插件进行压缩，已内置
//   optimizer: fis.plugin('png-compressor')
// });

// fis.match('**/*.{js,css,jpg,png}', {
//   useHash: false,
//   url : '.$0',
// });