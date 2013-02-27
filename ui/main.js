(function() {

  if (Meteor.isClient) {
    
    Template.content.character = function() {
      return MeteorMud.Domain.Character.currentCharacter();
    };
  }
  
})();