export function Dep() {
  this.subs = [];
}
Dep.prototype = {
  add(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach((sub) => {
      console.log(sub);
      //下列发布者的更新方法
      sub.update();
    })
  }
}
