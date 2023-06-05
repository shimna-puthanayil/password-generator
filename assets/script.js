// Assignment code here
var lowercaseSelected = false;
var uppercaseSelected = false;
var numericSelected = false;
var specialSelected = false;

// This function validates the character types that are confirmed for generating the password. 
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

//An object is created which contains all character arrays and functions to generate a random character.
var randomObject = {
    character: "",
    randomChar: "",
    // Array of special characters
    specialCharacters: ["@", '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'],
    // Array of lowercase characters
    lowerCasedCharacters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    // Array of uppercase characters
    upperCasedCharacters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    // Array of numeric characters
    numericCharacters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
   
    getrandomCharacter: function (characterArray) {// function to get a random character from an array which is passed as parameter.
        this.character = characterArray[Math.floor(Math.random() * characterArray.length)];
        return this.character;
    },
    getCharacter: function (randomChartype) {
        if (randomChartype === 'L') {
            this.randomChar = this.getrandomCharacter(this.lowerCasedCharacters);//get a character from an array of lowercase letters
        }
        else if (randomChartype === 'U') {
            this.randomChar = this.getrandomCharacter(this.upperCasedCharacters);//get a character from an array of uppercase letters
        }
        else if (randomChartype === 'N') {

            this.randomChar = this.getrandomCharacter(this.numericCharacters);//get a character from an array of numeric characters
        }
        else if (randomChartype === 'S') {
            this.randomChar = this.getrandomCharacter(this.specialCharacters);//get a character from an array of special characters
        }
        else {
            return;
        }
        return this.randomChar;
    }

};
// Generates a random password 
function generatePassword() {
    var selectedCharacters = [];
    var randomPassword = "";
    var characterTypes = [];
    var passwordLength = window.prompt("How many characters would you like your password to contain(8-123)");
    //validation
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
                //selected character type array 'selectedCharacters' is copied into another array 'characterTypes' .

                if (characterTypes.length === 0) {
                    characterTypes = selectedCharacters;
                }

                //Randomly chooses a character type 'L','U','N' OR 'S' from 'characterTypes' and stored in 'randomCharacter'.
                //which  is used to get a random character from the corresponding character array[lowercase ,uppercase ,numeric or special character arrays]
                //Then that character type 'L','U','N' OR 'S' is removed from the  same array 'characterTypes'.This ensures next character
                // will be selected from a different type(in next iteration) and at last the password will have random characters from all confirmed types.


                var index = Math.floor(Math.random() * characterTypes.length);
                randomCharacter = characterTypes[index];//'L','U','N' OR 'S'

                characterTypes = characterTypes.toSpliced(index, 1);

                // Gets the random character from the corresponding character array and appends it with password variable 'randomPassword'
                randomPassword = randomPassword + randomObject.getCharacter(randomCharacter);

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
