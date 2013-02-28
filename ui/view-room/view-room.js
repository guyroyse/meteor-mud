(function() {
  
  if (Meteor.isClient) {

    var session = (function() {

      var self = Object.create(MeteorMud.Common.Session);

      self.editMode = function(editMode) {
        return self.sessionValue("editMode", editMode);
      };

      return self;

    })();

    var view = (function() {

      var self = Object.create(MeteorMud.Common.PassiveView);

      self.name = self.fieldFn("edit-room-name");
      self.description = self.fieldFn("edit-room-desc");

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
      
      self.onUseDoorClick = function(door) {
        character().useDoor(door);
      };
      
      self.onAddDoorClick = function(toRoom) {
        console.log(toRoom);
        room().addDoorTo(toRoom, 'Door to ' + toRoom.name, 'This door is uninteresting');        
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

      self.onEditRoomSave = function() {
        var room = character().currentRoom();
        room.setName(view.name());
        room.setDescription(view.description());
        session.editMode(false);
      };

      self.onEditRoomCancel = function() {
        session.editMode(false);
      };

      return self;
      
    })();
  
    Template.room.room = function() {
      var character = MeteorMud.Domain.Character.currentCharacter();
      return character.currentRoom();
    };

    Template.doors.room = function() {
      var character = MeteorMud.Domain.Character.currentCharacter();
      return character.currentRoom();
    };

    Template.roomsDropdown.rooms = function() {
      return MeteorMud.Domain.Room.all();
    };

    Template.doorsDropdown.rooms = function() {
      return MeteorMud.Domain.Room.all();
    };

    Template.room.editMode = function() {
      return session.editMode();
    };
  
    Template.room.events({
      'click #edit-room' : function() {
        controller.onEditRoomClick();
      },
      'click #edit-room-cancel' : function() {
        controller.onEditRoomCancel();  
      },
      'click #edit-room-save' : function() {
        controller.onEditRoomSave();
      },
      'click #new-room' : function() {
        controller.onNewRoomClick();
      },
      'click .goto-room' : function() {
        controller.onGotoRoomClick(this);
      },
      'click .add-door-to-room' : function() {
        controller.onAddDoorClick(this);
      },
      'click .use-door' : function() {
        controller.onUseDoorClick(this);
      }
    });
  
  }

})();