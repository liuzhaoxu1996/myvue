import { observe } from './observe'
import { nodeContainer } from './compile'

function Vue(options) {
    var id = options.el;
    this.data = options.data;
    // 这里调用定义响应式方法 ----------------------
    observe(this.data, this);
    //--------------------------
    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
}
export default Vue


