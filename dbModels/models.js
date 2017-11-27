const db = require('../config');

const Person = db.model.extend({
    tableName: 'person',
    hasTimeStamps: true,
    routes: function() {
        return this.hasMany(Route);
      }
});

const Route = db.model.extend({
    tableName: 'route',
    hasTimeStamps: true,
    person: function() {
        return this.belongsTo(Person);
    }
})

const Waypoint = db.model.extend({
    tableName: 'waypoint'
})

const Rating = db.model.extend({
    tableName: 'rating'
})

const Session = db.model.extend({
    tableName: 'session'
})

const Favorite = db.model.extend({
    tableName: 'favorite'
})