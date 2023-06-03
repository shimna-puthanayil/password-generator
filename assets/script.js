// Assignment code here
var lowercaseSelected = false;
var uppercaseSelected = false;
var numericSelected = false;
var specialSelected = false;

function confirmCharacter() {
    lowercaseSelected = window.confirm("Click OK to confirm including lowercase letters?");
    uppercaseSelected = window.confirm("Click OK to confirm including uppercase letters?");
    numericSelected = window.confirm("Click OK to confirm including numeric characters?");
    specialSelected = window.confirm("Click OK to confirm including special characters?");
    if (!lowercaseSelected && !uppercaseSelected && !numericSelected && !specialSelected) {
        var confirmAgain = window.confirm("You haven't confirmed any character types.Do you want to confirm?");
        if (confirmAgain) {
            confirmCharacter();
        }
    }
    return;
}

function generatePassword() {
    var passwordLength = window.prompt("How many characters would you like your password to contain(8-123)");
    console.log(passwordLength);
    if (passwordLength === null) {
        return;
    }
    else if (passwordLength < 8) {
        window.alert("Password should contain at least 8 characters");
    }
    else if (passwordLength > 123) {
        window.alert("Password length should not exceed 123 characters");
    }
    else {
        confirmCharacter();
    }
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
