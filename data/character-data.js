var MeteorMud = MeteorMud || {};
MeteorMud.Data = MeteorMud.Data || {};

MeteorMud.Data.Characters = (function() {

  var self = Object.create(MeteorMud.Common.Data);

  self.collection = new Meteor.Collection("characters");
  
  self.byUserId = function(userId) {
    return this.collection.findOne({user: userId});
  };

  self.updateRoom = function(userId, roomId) {
    this.collection.update({user: userId}, {$set: {room: roomId}});
  };
  
  return self;

})();
