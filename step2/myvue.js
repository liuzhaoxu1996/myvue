class Vue {
  constructor(options) {
    var id = options.el;
    this.data = options.data;
    observe(this.data, this)

    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
  }
  proxy() {
    
  }
}
