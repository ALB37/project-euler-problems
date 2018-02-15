'use strict';

// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
//   April, June and November.
// All the rest have thirty - one,
//   Saving February alone,
//     Which has twenty - eight, rain or shine.
// And on leap years, twenty - nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century(1 Jan 1901 to 31 Dec 2000) ?


// Monday - 0, Tuesday - 1, Wednesday - 2, Thursday - 3, Friday - 4, Saturday - 5, Sunday - 6
// Jan - 0, Feb - 1, Mar - 2, Apr - 3, May - 4, Jun - 5, Jul - 6, Aug - 7, Sep - 8, Oct - 9, Nov - 10, Dec - 11,

const countingSundays = () => {

  const longMonths = [0, 2, 4, 6, 7, 9, 11];
  const shortMonths = [3, 5, 8, 10];
  
  
  let dayOfWeek = 0;
  let dayOfMonth = 0;
  let month = 0;
  let year = 1900;
  let firstDayOfMonthIsSunday = 0;
  
  
  while (year < 2001){
    if (longMonths.includes(month)){
      if (dayOfMonth === 31){
        month++;
        dayOfMonth = 0;
      }
    }
    if (shortMonths.includes(month)){
      if (dayOfMonth === 30){
        month++;
        dayOfMonth = 0;
      }
    }
    if (month === 1){
      if (year !== 1900 && year % 4 === 0){
        if (dayOfMonth === 29){
          month++;
          dayOfMonth = 0;
        }
      } else {
        if (dayOfMonth === 28){
          month++;
          dayOfMonth = 0;
        }
      }
    }
    if (month === 12){
      month = 0;
      year++;
    }
    if (dayOfWeek === 7){
      dayOfWeek = 0;
    }
    if (dayOfWeek === 6 && dayOfMonth === 0 && year > 1900){
      firstDayOfMonthIsSunday++;
    }
    dayOfWeek++;
    dayOfMonth++;
  }
  return firstDayOfMonthIsSunday;
};

console.log(countingSundays());
  