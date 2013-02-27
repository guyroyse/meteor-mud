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
  } else {
    this.found = false;
  }
  
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