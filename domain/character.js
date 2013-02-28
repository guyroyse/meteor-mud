var MeteorMud = MeteorMud || {};
MeteorMud.Domain = MeteorMud.Domain || {};

MeteorMud.Domain.Character = function(user) {

  var character = MeteorMud.Data.Characters.byUserId(user);

  if (character !== undefined) {
    this.found = true;
    this.id = character._id;
    this.user = character.user;
    this.name = character.name;
    this.description = character.description;
    this.room = character.room;
    this.admin = character.admin;
  } else {
    this.found = false;
  }
  
};

MeteorMud.Domain.Character.prototype = (function() {
  
  var self = Object.create(null);
  
  self.currentRoom = function() {
     return new MeteorMud.Domain.Room(this.room);
  };
  
  self.teleportTo = function(room) {
    MeteorMud.Data.Characters.updateRoom(this.user, room.id);
  };
  
  self.useDoor = function(door) {
    MeteorMud.Data.Characters.updateRoom(this.user, door.to);
  };
  
  return self;
  
})();

MeteorMud.Domain.Character.createCharacter = function(name, description) {

  var firstCharacter = function() {
    return MeteorMud.Data.Characters.count() === 0;
  };

  var user = Meteor.userId();
  var room = MeteorMud.Domain.Room.lobby().id; 

  var character = {};
  character.user = user;  
  character.name = name;
  character.description = description;
  character.room = room;
  
  if (firstCharacter())
    character.admin = true;
  
  console.log(character);
  
  MeteorMud.Data.Characters.insert(character);
  
};

MeteorMud.Domain.Character.currentCharacter = function() {
  var character = new MeteorMud.Domain.Character(Meteor.userId());
  if (character.found) return character;
  return; 
};