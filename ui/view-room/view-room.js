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
      
      self.onEditRoomClick = function() {
        session.editMode(true);
      };

      self.onEditRoomSave = function() {
        var character = MeteorMud.Domain.Character.currentCharacter();
        var room = character.currentRoom();
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
      var character = MeteorMud.Domain.Character.currentCharacter()
      return character.currentRoom();
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
      }
    });
  
  }

})();