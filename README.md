# js-wizard-director

# Installation
`npm install`

# Build
`npm run-script webpack`

# Configuration
This section explains how this project is configured and its reasons.

Firstly, the javascript code is written in ES2015 to take advantage of multiple language features like sintactic sugar and native imports.  
But because not all browsers support this nowadays, we use Babel to transform this code so browsers can run it.
Finally, webpack processes the all the sources and bundles them in a more friendly browser format (get rid of require/import calls).

## How
As explained, the javascript source code is transformed two times by Babel and Webpack.
Luckily, this is easily achieved by configuring just one tool properly: Webpack.

Webpack's main purpose is to bundle a javascript project (typically organized in different modules) into a way that a browser can use it. This results in reducing the number of original source files into one or more bundled files.  
However, it also has a system of "plugins" (loaders/rules in webpack's terminology) that can also pre-process the sources before bundling, and here's where babel enters into play.

We configured the project so babel is used to transpile ES2015 source files into ES5:

```
module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            ['env', {
                                targets: ...
                                modules: false 
                            }] 
                       ],
                        plugins: ['transform-helper']
                    }
                }
            }
        ]
    }
```
With this configuration we are instructing webpack to:

- Files that match have the .js extension (`test: /\.js$/`) needs to be processed by this rule
- Exclude files inside `node_modules` folder. We only want to process our project's files.
- Use the babel loader.
- We pass some options to babel:
    - Use `env` preset. Babel itself has plugins, and a preset is a predefined list of plugins.
    - We disable `module` importing purposely, this tells babel not to transform our ES6 modules to CommonJs modules. 
      We don’t want babel to compile them to CommonJs because webpack understand ES6 imports/exports which is what allows it to do tree-shaking and reduce even more final file size.
    - We want to also use `transform-helper` plugin, which helps to reduce final file size. 
      When Babel transforms ES2015 to ES5 code, it inlines some helper functions in every file processed. This can result in helper functions being repeated along different files, increasing the final size. This plugin puts all required helper methods in their own file and then they are referenced using `
      imports`.
