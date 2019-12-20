export function Dep() {
  this.subs = [];
}
Dep.prototype = {
  //这里定义增加订阅者的方法
  add(sub) {
    this.subs.push(sub);
  },
  //这里定义触发订阅者update()的通知方法
  notify() {
    this.subs.forEach((sub) => {
      console.log(sub);
      //下列发布者的更新方法
      sub.update();
    })
  }
}
