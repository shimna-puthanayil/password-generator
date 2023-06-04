// Assignment code here
var lowercaseSelected = false;
var uppercaseSelected = false;
var numericSelected = false;
var specialSelected = false;
var character;
// Array of special characters to be included in password
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];

// This function validates the character types that are confirmed for generting the password. 
// Checks whether at least one character type is confirmed.

function confirmCharacter() {
    var confirmed = false;
    lowercaseSelected = window.confirm("Click OK to confirm including lowercase letters?");
    uppercaseSelected = window.confirm("Click OK to confirm including uppercase letters?");
    numericSelected = window.confirm("Click OK to confirm including numeric characters?");
    specialSelected = window.confirm("Click OK to confirm including special characters?");
    if (!lowercaseSelected && !uppercaseSelected && !numericSelected && !specialSelected) {
        var confirmAgain = window.confirm("You haven't confirmed any character types.Do you want to confirm?");
        if (confirmAgain) {
            if (confirmCharacter()) {
                confirmed = true;
            }
            else {
                confirmed = false;
            }
        }
        else {
            confirmed = false;
        }
    }
    else {
        confirmed = true;

    }
    return confirmed;
}

//This function selects and returns a random character from an array which is passed as parameter of the function.

function getrandomCharacter(characterArray) {
    character = characterArray[Math.floor(Math.random() * characterArray.length)];
    return character;
}

// Generates a random password 
function generatePassword() {
    var selectedCharacters = [];
    var randomPassword = "";
    var charArrayLength = 0;
    var characterTypes = [];
    var passwordLength = window.prompt("How many characters would you like your password to contain(8-123)");

    if (passwordLength === null) {
        return randomPassword;
    }
    else if (isNaN(passwordLength)) {
        window.alert("Enter a number");
    }
    else if (passwordLength < 8) {
        window.alert("Password should contain at least 8 characters");
    }
    else if (passwordLength > 128) {
        window.alert("Password length should not exceed 128 characters");
    }
    else {

        if (confirmCharacter()) {
            //Confirmed character types are added into an array , 'selectedCharacters' which will be used to ensure at least one character from each type will be selected.
            if (lowercaseSelected) {
                selectedCharacters.push('L');
            }
            if (uppercaseSelected) {
                selectedCharacters.push('U');
            }
            if (numericSelected) {
                selectedCharacters.push('N');
            }
            if (specialSelected) {
                selectedCharacters.push('S');
            }

            for (i = 0; i < passwordLength; i++) {
                //selected character type array is copied into another array 'characterTypes' .

                if (characterTypes.length === 0) {
                    characterTypes = selectedCharacters;
                }

                //Randomly chooses a character type 'L','U','N' OR 'S' from 'characterTypes' and stored in 'randomCharacter'.
                //which  is used to get a random character from that character array[lowercase ,uppercase ,numeric or special character arrays]
                //Then that character type['L','U','N' OR 'S'] is removed from the  same array 'characterTypes'.This ensures next character
                // will be selected from a different type(next iteration) and at last the password will have random characters from all confirmed types.


                var index = Math.floor(Math.random() * characterTypes.length);
                randomCharacter = characterTypes[index];

                characterTypes = characterTypes.toSpliced(index, 1);

                if (randomCharacter === 'L') {
                    randomPassword = randomPassword + getrandomCharacter(lowerCasedCharacters);
                }
                else if (randomCharacter === 'U') {
                    randomPassword = randomPassword + getrandomCharacter(upperCasedCharacters);
                }
                else if (randomCharacter === 'N') {

                    randomPassword = randomPassword + getrandomCharacter(numericCharacters);
                }
                else if (randomCharacter === 'S') {
                    randomPassword = randomPassword + getrandomCharacter(specialCharacters);
                }
                else {

                    return;
                }
            }
        }
    }
    return randomPassword;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
