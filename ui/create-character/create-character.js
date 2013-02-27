(function() {
  
  if (Meteor.isClient) {

    var session = (function() {

      var self = Object.create(MeteorMud.Common.Session);

      self.characterNameValid = function(valid) {
        return self.sessionValue("characterNameValid", valid);
      };

      return self;

    })();

    var view = (function() {
      
      var self = Object.create(MeteorMud.Common.PassiveView);
      
      self.name = self.fieldFn("character-name");
      self.description = self.fieldFn("character-desc");
      
      return self;
      
    })();
    
    var controller = (function() {
      
      var self = Object.create(null);
      
      var validateName = function() {
        session.characterNameValid(view.name().length > 1);
      };
      
      var nameIsValid = function() {
        return session.characterNameValid();
      };
      
      var createCharacter = function() {
        MeteorMud.Domain.Character.createCharacter(view.name(), view.description());        
      };

      self.onStartup = function() {
        session.characterNameValid(true);
      };

      self.onCreateCharacterPressed = function() {
        validateName();
        if (nameIsValid()) createCharacter();
      };
      
      return self;
      
    })();

    Meteor.startup(controller.onStartup);
    
    Template.createCharacter.characterNameValid = function() {
      return session.characterNameValid();
    };

    Template.createCharacter.events({
      'click #create-character' : controller.onCreateCharacterPressed
    });
  
  }
  
})();