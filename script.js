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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // we need to empty string before -thats how we do it

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
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
