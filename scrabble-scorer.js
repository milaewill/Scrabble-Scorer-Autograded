// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! \n\nEnter a word: ");
   return word;
};

let simpleScorer = function (word) {
   word = word.toUpperCase();
   return word.length;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3
      } else {
         letterPoints += 1
      }
   }
   return letterPoints;
};

let scrabbleScorer = function (word) {
   word = word.toUpperCase()
   let letterPoints = 0
   for (let i = 0; i < word.length; i++) {
      let letter = word[i].toLowerCase();
      letterPoints = letterPoints + newPointStructure[letter];
   }
   return letterPoints;
};


//Scoring Objects
let simpleScorerObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
}
let vowelBonusScorerObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
}
let scrabbleScorerObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}

const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, scrabbleScorerObject];

function scorerPrompt() {
   let choice = input.question("Which scoring algorithm would you like to use? \n\n0 - Simple: one point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble pint system \nEnter 0, 1, or 2: \n")
   while (choice < 0 || choice > 2 || isNaN(choice)) {
      choice = input.question("Choose Again- \nEnter 0, 1, or 2: ")
   }
   let userChoice = scoringAlgorithms[choice];
   return userChoice;
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (key in oldPointStructure) {
      let letterScore = oldPointStructure[key]
      for (let j = 0; j < letterScore.length; j++) {
         letter = letterScore[j].toLowerCase();
         newPointStructure[letter] = Number(key)
      }

   } return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {      //order that our page is running
   let word = initialPrompt();
   let scoringSystem = scorerPrompt()
   let userChoice = scoringSystem.scorerFunction(word)
   console.log(`Score for '${word}': ${userChoice}`)
   oldScrabbleScorer(word)

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
