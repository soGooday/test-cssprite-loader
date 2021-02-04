const { call } = require("file-loader");

class cssSpritePlugin{
    constructor(){};
    apply(compiler){
        // compiler.plugic
        // console.log(arguments);
        compiler.hooks.afterPlugins.tap('MyPlugin', (context, entry) => {
            console.log('--->>',context, '\n',entry);
          }); 
    }
}
module.exports = cssSpritePlugin;