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
   if (word === undefined){
      word = ""; //so word is a string for .toUpperCase() Is there a better way to do this?
   }
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
let candidateWord = "";
function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   candidateWord = input.question("Enter a word to score: ");
   return candidateWord;
};

function simpleScorer(ssWord){ //should this just be word as a parameter?
  if (ssWord === undefined){
   ssWord = "";
  }
  let ssLetterPoints = (ssWord.length);
   return ssLetterPoints;
};

function vowelBonusScorer(vbsWord) {
   let vbsLetterPoints = 0
   if (vbsWord === undefined) {
      vbsWord = "";
   }
   vbsWord = vbsWord.toUpperCase();
   for (i = 0; i < vbsWord.length; i++) {
      if (vbsWord[i] === "A") {
         vbsLetterPoints += 3;
      } else if (vbsWord[i] === "E"){
         vbsLetterPoints += 3;
      } else if (vbsWord[i] === "I"){
         vbsLetterPoints += 3;
      } else if (vbsWord[i] === "O"){
         vbsLetterPoints += 3;
      } else if (vbsWord[i] === "U"){
         vbsLetterPoints += 3;
      } else {
         vbsLetterPoints += 1;
      }
   }
   return vbsLetterPoints;
};

let simpleScorerObject =  {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: function(word){
      return simpleScorer(word);
   }
}
let bonusVowelObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: function(word) {
      return vowelBonusScorer(word);
   }
}
let scrabbleObject = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: function(word) {
      return "\n" + scrabbleScorer(word);
   }
}

const scoringAlgorithms = [simpleScorerObject, bonusVowelObject, scrabbleObject];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system");
   let i = input.question("Enter 0, 1, or 2: ");
   console.log(`Score for '${candidateWord}' is: ${scoringAlgorithms[i].scorerFunction(candidateWord)}`); //return selectedObject;
}

let newPointStructure = {}
transform(oldPointStructure);

function transform(oldObject) {
   let  word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   for (let i = 0; i < word.length; i++){
      for (let item in oldObject) {
         if (oldObject[item].includes(word[i])) {
            let letter = String (word[i]);
            newPointStructure[letter] = item;
         }
      }
   }
};

function scrabbleScorer(word){
   if (word === undefined) {
      word = "";
   }
   word = word.toUpperCase();
   let letterPoints = 0;
   let totalPoints = 0;
   for (let i = 0; i < word.length; i++){
      let letter = word[i];
      letterPoints = Number(newPointStructure[letter]);
      totalPoints = (totalPoints+letterPoints);
   }
   return totalPoints;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
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
