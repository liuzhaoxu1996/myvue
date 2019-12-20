class Vue {
  constructor(options) {
    this.data = options.data;
    var id = options.el;


    observe(this.data, this)

    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
  }
  proxy() {
    
  }
}
