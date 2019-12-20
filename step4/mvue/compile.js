import { Watcher } from './watcher'

export function compile(node, vm) {
  var reg = /\{\{(.*)\}\}/g;
  if(node.nodeType === 1) {
    var attr = node.attributes;
    //解析节点的属性
    for(var i = 0;i < attr.length; i++) {
      if(attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue;
        //------------------------- 这里新添加的监听
        node.addEventListener('input', function(e) {
          vm[name] = e.target.value; 
        });
        //-------------------------
        // 将实例中的data数据赋值给节点
        node.value = vm[name]; 
        node.removeAttribute('v-model');
        new Watcher(vm,node,name);
      }
      
    }
  }
  //如果节点类型为text
  if(node.nodeType === 3) {
    if(reg.test(node.nodeValue)) {
      var name = RegExp.$1;//获取匹配到的字符串
      name = name.trim();
      // node.nodeValue = vm.data[name];
      new Watcher(vm,node,name);
    }
  }
}

export function nodeContainer(node, vm, flag) {
  var flag = flag || document.createDocumentFragment();

  var child;
  while(child = node.firstChild) {
    compile(child, vm);
    flag.appendChild(child);
    if(child.firstChild) {
      nodeContainer(child, vm, flag);
    }
  }
  return flag;
}