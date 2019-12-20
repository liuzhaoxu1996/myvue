function observe (obj,vm) {
  Object.keys(obj).forEach(function(key) {
      defineReactive(vm, key, obj[key]);
  })
}

function defineReactive (obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
        console.log("get了值"+value);
        return value;
    },
    set(newValue) {
        if(newValue === value) {
            return;
        }
        value = newValue;
        document.getElementById('output').innerHTML = value;
        console.log("set了最新值"+value);
    }
  })
}