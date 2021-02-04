import './index.scss'

export class Text{
    constructor(config){
        this.init(config)
    }
    init(config){
        document.getElementById(config.el).innerHTML = this.render();
    }
    render(){
        return `<div id="text-box">
            <div class="hammer"></div>
            <div class="hand"></div>
        </div>`
    }
}