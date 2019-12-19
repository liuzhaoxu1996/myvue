class Vue {
  constructor(options) {
    this.data = options.data;
    var id = options.el;
    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
  }
}
