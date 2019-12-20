function compile(node, vm) {
  var reg = /\{\{(.*?)\}\}/g;//匹配双绑的双大括号
  if(node.nodeType === 1) {
    var attr = node.attributes;
    //解析节点的属性
    for(var i = 0;i < attr.length; i++) {
      if(attr[i].nodeName == 'v-model') {
        var name = attr[i].nodeValue; 
        node.value = vm.data[name];
      }
    }
  }
  //如果节点类型为text
  if(node.nodeType === 3) {
    
    if(reg.test(node.nodeValue)) {
      var name = RegExp.$1;//获取匹配到的字符串
      name = name.trim();
      node.nodeValue = vm.data[name];
    }
  }
}

function nodeContainer(node, vm, flag) {
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