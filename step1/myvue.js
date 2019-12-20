class Vue {
  constructor(options) {
    this.data = options.data;
    var id = options.el;
    // Object.keys(this.data).forEach((key) => {
    //   this._proxyData(key)
    // })
    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
  }
  // _proxyData(key) {
  //   var vm = this
  //   Object.defineProperty(vm, key, {
  //     configurable: true,
  //     enumerable: true,
  //     get() {
  //       return vm.data[key]
  //     },
  //     set(newVal) {
  //       vm.data[key] = newVal
  //     }
  //   })
  // }
}
