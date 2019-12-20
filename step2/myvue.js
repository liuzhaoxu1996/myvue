class Vue {
  constructor(options) {
    var id = options.el;
    this.data = options.data;
    
    Object.keys(this.data).forEach((key) => {
      this._proxyData(key)
    })

    observe(this.data, this)

    var dom = nodeContainer(document.getElementById(id), this)
    document.getElementById(id).appendChild(dom)
  }
  _proxyData(key) {
    var vm = this
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        return vm.data[key]
      },
      set(newVal) {
        vm.data[key] = newVal
      }
    })
  }
}
