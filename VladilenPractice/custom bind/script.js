const person = {
  name: 'Vadym'
}

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел.:${phone}, Email: ${email}`)
}


//Custom
// function bind(fn, context, ...rest){
//   return function(...args){
//     const uniqueID = Data().toString();
//     context[uniqueID] = fn;

//     const result = context[uniqueID](...rest.concat(...args));
//     delete context[uniqueID];

//     return result;
//   }
// }

//ES 5
// function bind(fn, context){
//   const rest = Array.prototype.slice.call(arguments, 2)
//   return function(){
//     const args = Array.prototype.slice.call(arguments);
//     fn.apply(context, rest.concat(args));
//   }
// }

//ES 6+
function bind(fn, context, ...rest){
  return function(...args){
    return fn.call(context, ...rest.concat(args))
  }
}

//Call
function call(fn, context, ...rest){
  const uniqueID = Date.now().toString();
  context[uniqueID] = fn;

  const result = context[uniqueID](...rest);
  delete context[uniqueID];

  return result;
}

//Apply
function apply(fn, context, args){
  const uniqueID = Date.now().toString();
  context[uniqueID] = fn;

  const result = context[uniqueID](...args);
  delete context[uniqueID];

  return result;
}

info.bind(person)('12345', 'v@mail.ru');
info.bind(person, '12345')('v@mail.ru1');
info.bind(person, '12345', 'v@mail.ru2')();

call(info, person, '12345', 'v@mail.ru3');
apply(info, person, ['12345', 'v@mail.ru4']);