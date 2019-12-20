import { Dep } from './dep'

export function observe (obj,vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key]);
  })
}

export function defineReactive (obj, key, value) {
  //每一个vm的data属性值声明一个新的订阅者
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log(Dep.global);
      // -----------------------
      // 重复不添加
      if(Dep.global) {
        dep.add(Dep.global);
        console.log("get了值"+value);
      }
      // -----------------------
      return value;
    },
    set(newValue) {
      if(newValue === value) {
        return;
      }
      value = newValue;
      console.log("set了最新值"+value);
      dep.notify();
    }
  })
}