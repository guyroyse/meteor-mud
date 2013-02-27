(function() {
  
  if (Meteor.isClient) {
    
    var controller = (function() {
      
      var self = Object.create(null);
      
      self.onDoorClick = function(door) {
        MeteorMud.Domain.Room.setCurrentRoom(door);
      };
      
      return self;
      
    });
  
    Template.room.room = function() {
      return MeteorMud.Domain.Character.currentCharacter().currentRoom();
    };
  
    Template.door.events({
      'click .door' : function() {
        controller.onDoorClick(this);
      }
    });
  
  }

})();