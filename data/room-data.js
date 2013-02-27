var MeteorMud = MeteorMud || {};
MeteorMud.Data = MeteorMud.Data || {};

MeteorMud.Data.Rooms = (function() {

  var self = Object.create(MeteorMud.Common.Data);
  
  self.collection = new Meteor.Collection("rooms");

  self.countByLobby = function() {
    return this.collection.find({lobby: true}).count();
  };

  self.byLobby = function() {
    return this.collection.findOne({lobby: true});
  };
  
  self.setName = function(id, name) {
    this.setField(id, 'name', name);
  };

  self.setDescription = function(id, desc) {
    this.setField(id, 'description', desc);
  };

  return self;

})();