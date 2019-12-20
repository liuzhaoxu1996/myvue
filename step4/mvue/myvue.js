import { observe } from './observe'
import { nodeContainer } from './compile'

function Vue(options) {
    var id = options.el;
    this.data = options.data;

    observe(this.data, this);
    
    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
}
export default Vue


