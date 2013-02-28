var MeteorMud = MeteorMud || {};
MeteorMud.Domain = MeteorMud.Domain || {};

MeteorMud.Domain.Room = function(id) {

  var room = MeteorMud.Data.Rooms.byId(id);
  
  if (room !== undefined) {
    this.found = true;
    this.id = room._id;
    this.name = room.name;
    this.description = room.description;
    this.lobby = room.lobby;
    this.doors = room.doors;
  } else {
    this.found = false;
  }
  
};

MeteorMud.Domain.Room.prototype = (function() {

  var self = Object.create(null);

  self.setName = function(name) {
    MeteorMud.Data.Rooms.setName(this.id, name);
  };

  self.setDescription = function(description) {
    MeteorMud.Data.Rooms.setDescription(this.id, description);
  };
  
  self.addDoorTo = function(room, name, description) {
    MeteorMud.Data.Rooms.addDoor(this.id, room.id, name, description);
  };

  return self;

})();

MeteorMud.Domain.Room.all = function() {
  return MeteorMud.Data.Rooms.all().map(function(room) {
    return new MeteorMud.Domain.Room(room._id);    
  });
};

MeteorMud.Domain.Room.createRoom = function(name, description) {

  var room = {};
  room.name = name;
  room.description = description;

  var id = MeteorMud.Data.Rooms.insert(room);
  
  return new MeteorMud.Domain.Room(id);

};

MeteorMud.Domain.Room.lobby = function() {

  var createLobby = function() {
    var lobby = {
      name: "The Lobby",
      description: "This is the stock lobby. It needs customized.",
      lobby: true
    };
    MeteorMud.Data.Rooms.insert(lobby);
  };

  if (MeteorMud.Data.Rooms.countByLobby() < 1) createLobby();
  var lobby = MeteorMud.Data.Rooms.byLobby();
  return new MeteorMud.Domain.Room(lobby._id);
  
};