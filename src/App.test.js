import { render, screen } from '@testing-library/react';
import App from './App';
import {checkPrime, checkZipCodeHasTwoPrimes} from "./utils/prime"
import {paginate} from "./utils/paginate"

describe('Prime number tests', ()=> {
  test.each`
  number| expected
  ${1}  | ${false}
  ${2}  | ${true}
  ${11} | ${true}
  ${8}  | ${false}
  ${12} | ${false}
  ${9}  | ${false}
  ${13} | ${true}
  ${61} | ${true}
  ${81} | ${false}
  `('$number is prime $expected', ({number, expected}) => {
    expect(checkPrime(number)).toBe(expected);
  });

})

describe('Check zip code has 2 primes', () => {
  test.each`
  zipCode      | expected
  ${11111}     | ${false}
  ${22110}     | ${true}
  ${'HU 8234'} | ${true}
  ${'GB 1111'} | ${false}
  ${'H0 Z01'}  | ${false}
  ${''}        | ${false}
  ${'H'}       | ${false}
  `('$zipCode contains 2 prime: $expected', ({zipCode, expected}) => {
    expect(checkZipCodeHasTwoPrimes(zipCode)).toBe(expected);
  });

})

describe('Pagination tests', () => {
  const expected1 = [[1,2],[3,4]];
  it('Input array split to two', () => {
    expect(paginate([1,2,3,4],2)).toEqual(
      expect.arrayContaining(expected1),
    );
  });
  const expected2 = [[1],[2],[3],[4]];
  it('Input array split to four', () => {
    expect(paginate([1,2,3,4],1)).toEqual(
      expect.arrayContaining(expected2),
    );
  });
});