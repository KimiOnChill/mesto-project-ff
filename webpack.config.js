const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключен плагин для HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин для очистки содержимого dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для объединения CSS файлов в один 

module.exports = {
  entry: { main: './src/index.js' },
  output: {
      path: path.resolve(__dirname, 'dist'),// точка выхода использует утилиту path для полного пути
      filename: 'main.js',
              publicPath: ''
  },
  mode: 'development',// режим разработчика
  devServer: {//page will refesh automaticly
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // ускоряет загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ //это массив правил, в который добавлен объект правил для babel
      //первый объект правил для js-кода
      {
        test: /\.js$/, // регулярное выражение, которое ищущее все js файлы
        use: 'babel-loader',// при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/'// исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      //второй объект правил для картинок и шрифтов
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,// регулярка, ищущая все файлы с расширениями 
        type: 'asset/resource' //переносит исходные файлы в конечную сборку в том же формате
      },
      //третий объект правил для CSS
      {
        test: /\.css$/, //это правило только для CSS-файлов
        // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: { importLoaders: 1 }// чтобы работал postcss
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    // html plugin это класс, с помощью которого можно конструировать объекты
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(), //настраивать не не нужно
    new MiniCssExtractPlugin()
  ]
}