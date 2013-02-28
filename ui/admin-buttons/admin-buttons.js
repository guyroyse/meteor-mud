(function() {

  if (Meteor.isClient) {

    var session = (function() {

      var self = Object.create(MeteorMud.Common.Session);

      self.editMode = function(editMode) {
        return self.sessionValue("editMode", editMode);
      };

      return self;

    })();

    var controller = (function() {

      var self = Object.create(null);

      var character = function() {
        return MeteorMud.Domain.Character.currentCharacter();
      };

      var room = function() {
        return character().currentRoom();
      };

      self.onGotoRoomClick = function(room) {
        session.editMode(false);
        character().teleportTo(room);
      };

      self.onEditRoomClick = function() {
        session.editMode(true);
      };

      self.onNewRoomClick = function() {
        session.editMode(false);
        var room = MeteorMud.Domain.Room.createRoom(character().name + "'s New Room",
          "This rooms needs a better description.");
        character().teleportTo(room);
      };

      self.onAddDoorClick = function(toRoom) {
        console.log(toRoom);
        room().addDoorTo(toRoom, 'Door to ' + toRoom.name, 'This door is uninteresting');
      };

      return self;

    })();

    Template.roomsDropdown.rooms = function() {
      return MeteorMud.Domain.Room.all();
    };

    Template.doorsDropdown.rooms = function() {
      return MeteorMud.Domain.Room.all();
    };

    Template.playGame.events({
      'click #edit-room' : function() {
        controller.onEditRoomClick();
      },
      'click #new-room' : function() {
        controller.onNewRoomClick();
      },
      'click .goto-room' : function() {
        controller.onGotoRoomClick(this);
      },
      'click .add-door-to-room' : function() {
        controller.onAddDoorClick(this);
      }
    });

  }

})();