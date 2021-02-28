'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // we need to empty string before -thats how we do it

  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = acc => {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((mov, arr) => mov + arr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // MAth.abs removes the minuss sign

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€ `;
};

const createUserNames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUi = function (acc) {
  ///Display movements__type
  displayMovements(acc.movements);

  //Display Summary
  calcDisplaySummary(acc);

  //Display BalanceValue

  calcDisplayBalance(acc);

  //clear input fields
};

//// EVENT HANDLERS //////////////////////////////////

let currentAccount;

btnLogin.addEventListener('click', e => {
  //prevents form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back , ${
      //Display UI and Welcome Message
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur(); // Makes field to loose the focus

    /* //Display movements__type
    displayMovements(currentAccount.movements);

    //Display Summary
    calcDisplaySummary(currentAccount);

    //Display BalanceValue

    calcDisplayBalance(currentAccount);

    //clear input fields */
    //Uptade Ui
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUi(currentAccount);
  }
  // need to find the user
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add amount
    currentAccount.movements.push(amount);

    // Update UI

    updateUi(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      // Find index finds the indexes of arrays
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 1;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('dog');
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/* 
let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['a', 'b', 'c', 'd', 'e'];
let arr3 = ['a', 'b', 'c', 'd', 'e', 'f'];

//brackets defines where to start extractiing array, u can also define end paramater
console.log(arr.slice(2)); // logs Array(3) [ "c", "d", "e" ]
console.log(arr.slice(2, 4)); // logs Array [ "c", "d" ]
console.log(arr.slice(-2)); // logs the last two 'd' , 'e'
console.log(arr.slice(1, -2)); // logs excpet 2  Array [ "b", "c" ]
console.log([...arr]); // rturns the same array

//Splice---------

console.log(arr.splice(2)); // Splice mutates original array but not the slice method - Array(3) [ "c", "d", "e" ]
console.log(arr); // Array [ "a", "b" ]

arr.splice(-1);
console.log(arr); // Array(4) [ "a", ]

arr2.splice(1, 2); // takes 2 out from the position 1
console.log(arr2); // Array(3) [ "a", "d", "e" ]

// Reverse   //  REVERSE MUTATES ARRAY
console.log(arr3.reverse());
console.log(arr3);

//CONCAT -
const letters = arr2.concat(arr3); // logs [ "a", "d", "e", "f", "e", "d", "c", "b", "a" ]
console.log(letters);
console.log([...arr2, ...arr3]); // ist will be the same as above -  // logs [ "a", "d", "e", "f", "e", "d", "c", "b", "a" ]

// JOIN //

console.log(letters.join('-')); // returns string  a-d-e-f-e-d-c-b-a script.js:111:9
 */

//_____  LOOPING ARRAYS FOR EACH __________________________________________________________________________

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {

for (const [i, movement] of movements.entries())
  if (movement > 0) {
    console.log(`You deposited movement ${i} - ${movement}`);
  } else {
    console.log(`you withdrew movement ${i} - ${Math.abs(movement)}`);
  }

// You can not break out of forEach loop

console.log('FUNCTION__EXPRESSION'); // The order to get index and paramater matters
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`You deposited movement ${i} - ${movement}`);
  } else {
    console.log(`you withdrew movement ${i} - ${Math.abs(movement)}`);
  }
});

console.log('---AARRROW---FUNCTION');

movements.forEach(movement =>
  movement > 0
    ? console.log(`you deposited ${movement}`)
    : console.log(`you withdraw ${Math.abs(movement)}`)
);
 */

//_____  LOOPING MAPS & SETS  FOR EACH __________________________________________________________________________
/* 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET

const currenciesUniq = new Set(['EUR', 'Euro', 'EUR', 'Euro']);
console.log(currenciesUniq); // logs Set [ "EUR", "Euro" ]    Set may only occur once; it is unique in the Set's collection.

currenciesUniq.forEach(function (value, key, map) {
  // SETS DOESNT HAVE KETYS OR INDEXES
  console.log(`${key}: ${value}`);
});

// returns EUR: EUR script.js:158:11
//Euro: Euro
 */

//_________ CHALLLANGE #1  _________
/* 
const julia = [3, 5, 2, 12, 7];

const kate = [4, 1, 15, 8, 3];
const juliaNew = [];

function checkDogs(dog) {
  const dogs = dog.slice(1, -2);
  dogs.forEach(function (age, i) {
    age > 3
      ? console.log(`Dog nr ${i + 1} is  and adult and is ${age} years old `)
      : console.log(`Dog nr ${i + 1} is puppy and is ${age} years old `);
  });
}

checkDogs(julia);
checkDogs(kate);
console.log(julia);
 */

//________________MAP , FILTER, REDUCE _______________

// MAP -- returns new array and loops over the array and
//FILTER - is used to filter elements within the array  and return new array and
// REDUCE boild down all array elements down to one single value

// MAP
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroTo = 1.1;
const movementsUSD = movements.map(movement => movement * euroTo);
console.log(movementsUSD);

const movementLV = movements.map(function (movement) {
  return movement * euroTo;
});
console.log(movementLV);

const movUSDfor = [];

for (const mov of movements) movUSDfor.push(mov * euroTo);
console.log(movUSDfor);

const description = movements.map(
  (mov, i) => 
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited ' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log( description);
 */

//______MAPS_______________- isconst user = 'Steven Thomas Williams';

/* const createUserNames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(names => names[0])
      .join('');
  });
};
console.log(accounts);
 const username = user
  .toLowerCase()
  .split(' ')
  .map(names => names[0])
  .join(''); */

//reateUserNames(accounts); // logs -stw

//______FILTER ________________________________________________
/* 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits); // returns  200, 450, 3000, 70, 1300
// console.log(movements); //[ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

const withdrawals = [];

const deposits = movements.filter(mov => {
  mov < 0 ? withdrawals.push(mov) : '';
});
console.log(withdrawals);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

//mov => mov.filter(mov < 0 ? withdrawals.push(mov))
//< 0 ? withdrawals.push(mov)

//________REDUCE _________________________________________

// accunilator is like a snowball

const balance = movements.reduce(function (accumilator, cur, i, arr) {
  console.log(`itteration ${i}: ${accumilator} ${cur}`);

  return accumilator + cur;
}, 0);

console.log(balance);

const balance2 = movements.reduce((acc, i) => acc + i, 0);
console.log(balance2);
 */

//Maximum value for

/* const movements = [-200, 450, -400, 3000, -650, -130, 70, 300];
const maximum = movements.reduce((a, b) => (a > b ? a : b), [0]);
console.log(maximum);
console.log(movements);
 */
//______________CODING CHALLLANGE #2___________
/* 
const dogsAge = [5, 2, 4, 1, 15, 8, 3];
const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(years => years >= 18)
    .reduce((acc, i, x, arr) => acc + i / arr.length, 0);

const dogsRealAge = calcAverageAge(dogsAge2);
console.log(dogsRealAge);
 */
//__________ CHAINING METHODS______

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

//  U can addd in chain as long as it returns new array
//Pipeline
const deposits = movements
  .filter(movement => movement > 0)
  .filter(movement => movement > 0)
  .map(movement => movement * euroToUsd)
  .reduce((acc, movement) => acc + movement, 0);

console.log(deposits);
 */

//_______________________THE FIND METHOD ________________________

/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//It will find the first element in the array that satisfies the condition
// Filter methd returns new array and find returns only one element

const firstWithDrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithDrawal); // logs - 400;

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
 */

//___________SOME &  EVERY  INCLUDES------------------------------------------
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//EQUALITY
console.log(movements.includes(-130)); //logs - true   , it checks only for equality
console.log(movements);

//CONDITION

const anyDepo = movements.some(mov => mov > 0); // logs true -- returns condition of movements
console.log(anyDepo);

//____EVERY   -- runs through all elements and returns only if all elements are true
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Separate callbacks

const deposits = mov => mov > 0;

movements.forEach(deposits);
console.log(movements.some(deposits));

//___________Flat &  FLATMAP------------------------------------------

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat()); //  Returns nested arrays in one array logs - [ 1, 2, 3, 4, 5, 6, 7, 8 ]  It goes only one level deep

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(4)); // BY specifing number like 4 it will go 4 levels deep in

const accountMovement = accounts.map(acc => acc.movements);
console.log(accountMovement);

const allMovements = accountMovement.flat().reduce((acc, mov) => acc + mov, 0);
console.log(allMovements);
 */
//FLATMAP  combines Flat and MAP and goes only one level deep

//___________________________________- SORTING ARRAYS-_______________________________________________________
/* 
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

//Sort Mutates original arrray. It does sorting based on strings

console.log(owners.sort()); // returns [ "Adam", "Jonas", "Martha", "Zach" ]

// Numbers

console.log(movements);

// If we return postive > 0 , B ,A
// return < 0, A ,B
// movements.sort((a, b) => (a < b ? 1 : -1));

movements.sort((a, b) => a - b); // this is the same as above
console.log(movements);
 */

//___________________________________- MORE WAYS CREATING ARRAYS
/* 
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(new Array(1, 3, 4, 5, 6, 7)); // logs Array(6) [ 1, 3, 4, 5, 6, 7 ]

const x = new Array(7);
console.log(x); // returns Array(7) [ <7 empty slots> ]
//x.fill(1);
//console.log(x); // logs Array(7) [ 1, 1, 1, 1, 1, 1, 1 ]

x.fill(1, 3, 5);
console.log(x); // logs [ <3 empty slots>, 1, 1, <2 empty slots> ]

x.fill(69, 1, 6);
console.log(x); // logs  [ <1 empty slot>, 69, 69, 69, 69, 69, <1 empty slot> ]

//ARRAY FROM

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // logs Array(7) [ 1, 1, 1, 1, 1, 1, 1 ]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // logs Array(7) [ 1, 2, 3, 4, 5, 6, 7 ] */

/* //___________________________________- WHICH ARRAY METHOD TO USE WITH

const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);

//2

const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  //.filter(mov => mov >= 1000).length;
  .reduce((count, cur) => (cur > 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

//3

const { deposits, withdrawals } = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals); // logs script.js:620 {deposits: 25180, withdrawals: -7340}

// Convert --  this is a nice title   - to  - This Is a Nice Title -

const convertTitle = title => {
  const exceptions = ['a', 'the', 'or', 'but', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(convertTitle('this is a nice title'));
 */

//FINNAL ARRAY CHALLENGE

/* FindSarah'sdogandlogtotheconsolewhetherit'seatingtoomuchortoo
 little. Hint: Some dogs have multiple owners, 
 so you first need to find Sarah in the owners array, 
 and so this one is a bit 
tricky (on purpose) 🤓
 */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

const sarDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarDog);

// ? console.log('true') : console.log('not'));
/* dog.owners.includes('Sarah') && dog.recFood < dog.curFood
    ? console.log('too much')
    : console.log('too little') */
console.log(
  `Sarahs dog is eating too  ${
    sarDog.recFood < sarDog.curFood ? 'much' : 'little'
  }`
);

/* Create an array containing all owners of dogs who eat too much (
  'ownersEatTooMuch') and an array with all owners of 
  dogs who eat too little ('ownersEatTooLittle').
 */

const eatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .map(dog => dog.owners);

console.log(eatTooMuch);

/* Log a stringtotheconsoleforeacharraycreatedin3.,likethis:
"Matildaand Alice and Bob's dogs eat too much!" and 
"Sarah and John and Michael's dogs eat too little!" */
