/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      searchByName(people);
      // TODO: search by name
      break;
    case 'no':
      // TODO: search by traits
      searchByTrait(people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
        displayPerson(person);
      break;
    case "family":
      // TODO: get person's family persons info AND relation
        displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants recursion
        getDes(person, people);
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });
  mainMenu(filteredPeople[0], people);

  // TODO: What to do with filteredPeople?

}


function searchByTrait(people){
  var id = promptFor("What is the person's ID?", chars);
  var gender = promptFor("What is the person's gender?", chars);
  var dob = promptFor("What is the person's dob?", chars);
  var height = promptFor("What is the person's height?", chars);
  var weight = promptFor("What is the person's weight?", chars);
  var eyeColor = promptFor("What is the person's eye color?", chars);
  var occupation = promptFor("What is the person's occupation?", chars);

  let filteredId = people.filter(function(el) {
    if(el.id == id) {
      return el;
  }
  });
  mainMenu(filteredId[0], people);

  let filteredGender = people.filter(function(el) {
    if(el.gender == gender) {
      return el;
    }
  });
  mainMenu(filteredGender[0], people);

  let filteredDob = people.filter(function(el) {
    if(el.dob == dob) {
      return el;
    }
  });
  mainMenu(filteredDob[0], people);

  let filteredHeight = people.filter(function(el) {
    if(el.Height == height) {
      return el;
    }
  });
  mainMenu(filteredHeight[0], people);

  let filteredWeight = people.filter(function(el) {
    if(el.weight == weight) {
      return el;
    }
  });
  mainMenu(filteredWeight[0], people);

  let filteredEye = people.filter(function(el) {
    if(el.eyeColor == eyeColor) {
      return el;
    }
  });
  mainMenu(filteredEye[0], people);

  let filteredOcc = people.filter(function(el) {
    if(el.occupation == occupation) {
      return el;
    }
  });
  mainMenu(filteredOcc[0], people);

}







// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayFamily(person, people) {
  var familyInfo

    for (let i = 0; i < people.length; i++) {
        if (person.parents.includes(people[i].id)){
            if (people[i].gender === "male"){
                familyInfo = "Dad: " + people[i].firstName + " " + people[i].lastName + "\n";
            } else if (people[i].gender === "female") {
                familyInfo = "Mom: " + people[i].firstName + " " + people[i].lastName + "\n";
            }
        }
        if (person.parents === people[i].parents && person.id !== people[i].id){
            if (people[i].gender === "male"){
                familyInfo += "Brother: " + people[i].firstName + " " + people[i].lastName + "\n";
            } else if (people[i].gender === "female") {
                familyInfo += "Sister: " + people[i].firstName + " " + people[i].lastName + "\n";
            }
        }
        if (people[i].parents.includes(person.id)){
            if (people[i].gender === "male"){
                familyInfo += "Son: " + people[i].firstName + " " + people[i].lastName + "\n";
            } else {
                familyInfo += "Daughter: " + people[i].firstName + " " + people[i].lastName + "\n";
            }
        }
        if (person.currentSpouse === people[i].id){
            familyInfo += "Spouse: " + people[i].firstName + " " + people[i].lastName + "\n";
        }
    }
    alert(familyInfo);
}

function getDes(person, people) {
   var desInfo = "";

        for (let i = 0; i < people.length; i++) {
                if (people[i].parents.includes(person.id)){
                    desInfo += "Descendants: " + people[i].firstName + " " + people[i].lastName + "\n";
                    console.log(desInfo);
                }

        }
//store in id array

    alert(desInfo);
}




// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
