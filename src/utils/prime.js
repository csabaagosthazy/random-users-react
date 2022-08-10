import PropTypes from "prop-types";
/**
 * Checks if an integer is prime
 * @param {Integer} number 
 * @returns Boolean
 */
export const checkPrime = (number) => {
    //prime number is larger than 1 and has 2 divisors 1 and itself
    if(number <= 1 ) return false;
    if(number === 2) return true;
    //even numbers > 2 are not prime
    if(number%2 === 0) return false;

    //large numbers, use sq root -> performance
    const sqroot = Math.sqrt(number);
    for(let i = 2 ; i <= sqroot; i++ ){
        if(sqroot%i === 0){
            return false;
        }
    }

    return true;

}
/**
 * Checks if an input has at least two prime numbers
 * @param {*} zipCode 
 * @returns Boolean
 */
export const checkZipCodeHasTwoPrimes = (zipCode) => {
    //work with strings
    const zipStr = String(zipCode)
    if(zipStr.length < 2) return false
    //get only numbers
    const numArr = zipStr.match(/\d+/g);
    //concat array to get only one string
    const numStr = numArr.join('') 
    //split string again to get only 1 char once
    const splits = numStr.split('')
    //check if splits contains at least 2 prime
    let counter = 0;
    for(let i = 0; i < splits.length; i++){
        if(checkPrime(parseInt(splits[i]))) counter ++;
    }
    if(counter>=2) return true
    return false
}


checkPrime.propTypes = {
    number: PropTypes.number.isRequired,
};

checkZipCodeHasTwoPrimes.propTypes = {
    zipCode: PropTypes.isRequired,
};