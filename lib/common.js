var MeteorMud = MeteorMud || {};
MeteorMud.Common = MeteorMud.Common || {};

MeteorMud.Common.Data = (function() {

  var self = Object.create(null);
  
  self.insert = function(item) {
    return this.collection.insert(item);
  };

  self.count = function() {
    return this.collection.find().count();
  };
  
  self.all = function() {
    return this.collection.find();
  }

  self.byId = function(id) {
    return this.collection.findOne({_id: id});
  };
  
  self.setField = function(id, field, value) {
    var fields = {};
    fields[field] = value;
    this.collection.update({_id: id}, {$set: fields});
  };

  return self;
  
})();

MeteorMud.Common.Session = (function() {
  
  var self = Object.create(null);

  self.sessionValue = function(name, value) {
    if (value !== undefined) Session.set(name, value);
    return Session.get(name);
  };
  
  self.clearValue = function(name) {
    Session.set(name, undefined);
  };

  return self;
  
})();

if (Meteor.isClient) {

  MeteorMud.Common.PassiveView = (function() {
    
    var self = Object.create(null);

    var getField = function(id) {
      return $('#' + id).val();
    };

    var setField = function(id, value) {
      $('#' + id).val(value);
    };

    var focus = function(id) {
      $('#' + id).focus();
    };

    var field = function(id, value) {
      if (value !== undefined) setField(id, value);
      return getField(id);
    };

    self.fieldFn = function(id) {
      return function(value) {
        return field(id, value);
      };
    };

    self.focusFn = function(id) {
      return function() {
        focus(id);
      };
    };

    return self;

  })();

}