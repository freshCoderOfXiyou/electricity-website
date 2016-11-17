var webpack=require('webpack')
module.exports={
	entry:__dirname+"/app/main.js",
	output:{
		path:__dirname+"/public",
		filename:"bundle.js"
	},
	module:{

			loaders:[
				{
					test:/\.json$/,
					loader:'json'
				},
				//npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
				//npm install --save react react-dom
				//frist for Using es6
				//second for using React
				//npm install --save-dev style-loader css-loader
				{
					test:/\.css$/,
					loader:"style!css"	
				},
				{
					test:/\.scss$/,
					loader:"!sass!style!css"
				}
			]
	}
}