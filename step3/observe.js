function observe (obj,vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key]);
  })
}

function defineReactive (obj, key, value) {
  //这里每一个vm的data属性值声明一个新的订阅者
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log(Dep.global);
      // -----------------------
      //这里是第一次new对象Watcher的时候，初始化数据的时候，往订阅者对象里面添加对象。第二次后，就不需要再添加了
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