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

      self.onUseDoorClick = function(door) {
        character().useDoor(door);
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

    Template.room.editMode = function() {
      return session.editMode();
    };

    Template.doors.room = function() {
      var character = MeteorMud.Domain.Character.currentCharacter();
      return character.currentRoom();
    };

    Template.room.events({
      'click #edit-room-cancel' : function() {
        controller.onEditRoomCancel();
      },
      'click #edit-room-save' : function() {
        controller.onEditRoomSave();
      }
    });
    
    Template.door.events({
      'click .use-door' : function() {
        controller.onUseDoorClick(this);
      }      
    });

  }

})();