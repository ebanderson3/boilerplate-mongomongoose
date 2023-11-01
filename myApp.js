require('dotenv').config();
mongoose = require('mongoose');

// #1
mongoose.connect(process.env["MONGO_URI"], {useNewUrlParser: true, useUnifiedTopology: true})

// #2
const personSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

// 3

const createAndSavePerson = (done) => {
  let dave = new Person({name : 'Dave', age: 20, favoriteFoods: ['sushi']});
  
  dave.save((err, data) => {
    if (err) {
      return console.error(err);
    } else {
      done(null, data); 
    }
  });
};

// 4
/*
let arrayOfPeople = [
  {name : 'joe', age: 20, favoriteFoods: ['sushi']},
  {name : 'bob', age: 20, favoriteFoods: ['sushi']},
  {name : 'sam', age: 20, favoriteFoods: ['sushi']}
]; */

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, createdPeople) => {
    if (err) {
      console.log(err);
    }else{
       done(null, createdPeople);
    }
  });
};

// 5

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, arrayOfResults) => {
    if (err) {
      console.log(err);
    }else{
       done(null, arrayOfResults);
    }
  });
};

//6
const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods: {$all: [food]}}, (err, result) => {
    if (err) {
        console.log(err);
      }else{
         done(null, result);
      }
  });  
};

//7

const findPersonById = (personId, done) => {
  Person.findById( personId, (err, result) => {
    if (err) {
      console.log(err);
    }else{
      done(null, result);
    }
  });
};

//8

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, result) => {
    if(err){
      console.log(err);
    }else{
      result.favoriteFoods.push(foodToAdd);
      result.save((err, updatedResult) => {
        if (err){
          console.log(err);
        }else{
          done(null, updatedResult);
        }
      });
    }
  });
};

//9

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) {
      console.log(err);
    }else{
      done(null, updatedDoc);
    }
  });
};

// 10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, result) => {
    if (err) {
      console.log(err);
    }else{
      done(null, result);
    }
  });
};

// 11

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove( {name: nameToRemove}, (err, result) => {
    if (err) {
      console.log(err);
    }else{
      done(null, result);
    }
  });
};

// 12

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all : [foodToSearch]}})
    .sort({name: 1})
    .limit(2)
    .select('-age')
    .exec((err, filteredResult) => {
      if (err) {
        console.log(err);
      }else{
        done(null, filteredResult)
      }
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
