import { Dep } from './dep'
export function Watcher(vm, node, name) {
  Dep.global = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.update();
  Dep.global = null;
}

Watcher.prototype = {
  update() {
    this.get();
    switch(this.node.nodeType) {
      case 1: 
        this.node.value = this.value;
        break;
      case 3:
        this.node.nodeValue = this.value;
        break;
      default: break;
    }
  },
  get() {
    this.value = this.vm[this.name];
  }
}