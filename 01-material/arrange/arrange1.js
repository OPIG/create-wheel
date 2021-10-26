/*
实现一个arrange函数，可以进行时间和工作调度

*/

const arrange = name => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const list = [];
  const priorityList = [];
  let _priority = false;
  list.push(() => console.log(`${name} is notified`));

  const chain = new Proxy({}, {
      get(_, prop) {
          return data => {
              const [_, method, priority = _priority] = /^(\w+?)(First)?$/[Symbol.match](prop);
              _priority = priority;
              if (method === 'wait') {
                  (priority ? priorityList : list).push(async () => await wait(data * 1000));
              } else if(method === 'do') {
                  (priority ? priorityList : list).push(() => console.log(`Start to ${data}`));
              }
              return chain;
          }
      }
  });

  setTimeout(async () => {
      for (let func of priorityList) {
          await func();
      }

      for (let func of list) {
          await func();
      }
  }, 0)

  return chain;
};

// arrange('William');
// arrange('William').wait(5).do('commit');
arrange('William').waitFirst(5).do('push');