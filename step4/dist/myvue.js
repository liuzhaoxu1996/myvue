(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function Dep() {
    this.subs = [];
  }
  Dep.prototype = {
    //这里定义增加订阅者的方法
    add: function add(sub) {
      this.subs.push(sub);
    },

    //这里定义触发订阅者update()的通知方法
    notify: function notify() {
      this.subs.forEach(function (sub) {
        console.log(sub);
        //下列发布者的更新方法
        sub.update();
      });
    }
  };

  function observe(obj, vm) {
    Object.keys(obj).forEach(function (key) {
      defineReactive(vm, key, obj[key]);
    });
  }

  function defineReactive(obj, key, value) {
    //每一个vm的data属性值声明一个新的订阅者
    var dep = new Dep();
    Object.defineProperty(obj, key, {
      get: function get() {
        console.log(Dep.global);
        // -----------------------
        // 重复不添加
        if (Dep.global) {
          dep.add(Dep.global);
          console.log("get了值" + value);
        }
        // -----------------------
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        console.log("set了最新值" + value);
        dep.notify();
      }
    });
  }

  function Watcher(vm, node, name) {
    Dep.global = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.update();
    Dep.global = null;
  }

  Watcher.prototype = {
    update: function update() {
      this.get();
      switch (this.node.nodeType) {
        case 1:
          this.node.value = this.value;
          break;
        case 3:
          this.node.nodeValue = this.value;
          break;
      }
    },
    get: function get() {
      this.value = this.vm[this.name];
    }
  };

  function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/g;
    if (node.nodeType === 1) {
      var attr = node.attributes;
      //解析节点的属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == 'v-model') {
          var name = attr[i].nodeValue;
          //------------------------- 这里新添加的监听
          node.addEventListener('input', function (e) {
            vm[name] = e.target.value;
          });
          //-------------------------
          // 将实例中的data数据赋值给节点
          node.value = vm[name];
          node.removeAttribute('v-model');
          new Watcher(vm, node, name);
        }
      }
    }
    //如果节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1; //获取匹配到的字符串
        name = name.trim();
        // node.nodeValue = vm.data[name];
        new Watcher(vm, node, name);
      }
    }
  }

  function nodeContainer(node, vm, flag) {
    var flag = flag || document.createDocumentFragment();

    var child;
    while (child = node.firstChild) {
      compile(child, vm);
      flag.appendChild(child);
      if (child.firstChild) {
        nodeContainer(child, vm, flag);
      }
    }
    return flag;
  }

  function Vue(options) {
      var id = options.el;
      this.data = options.data;
      // 这里调用定义响应式方法 ----------------------
      observe(this.data, this);
      //--------------------------
      var dom = nodeContainer(document.getElementById(id), this);
      document.getElementById(id).appendChild(dom);
  }

  return Vue;

})));
