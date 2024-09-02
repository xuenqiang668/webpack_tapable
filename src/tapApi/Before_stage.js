// 如果同时使用 before 和 stage 时，优先会处理 before ，在满足 before 的条件之后才会进行 stage 的判断。
// 关于 before 和 stage 都可以修改事件回调函数的执行时间，但是不建议混用这两个属性。换句话说如果你选择在你的 hooks.tap 中使用 stage 的话就不要在出现 before ，反之亦然。
const { SyncHook } = require('tapable');

const hooks = new SyncHook();

hooks.tap(
  {
    name: 'flag1',
  },
  () => {
    console.log('This is flag1 function.');
  }
);

hooks.tap(
  {
    name: 'flag2',
    // flag2 事件函数会在flag1之前进行执行
    before: 'flag1',
  },
  () => {
    console.log('This is flag2 function.');
  }
);

hooks.call();

// result
// This is flag2 function.
// This is flag1 function.
