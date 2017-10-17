(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};


// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: '',
		age: '',
		occupation: 'none',
        gender: '-'
	}
});

// A List of People
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},
	
	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	}
});

// The View for a Person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),	
	
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	
	events: {
	 'click .edit' : 'editPerson',
	 'click .delete' : 'DestroyPerson'	
	},
	
	editPerson: function(){
        var newName = prompt ("Please enter the new name", this.model.get('name'));
        var newAge = prompt ("How 'bout an age?", this.model.get('age'));   
        var newJob = prompt ("Your occupation?", this.model.get('occupation'));
        var newGender = prompt ("Updated Gender?", this.model.get('gender'));

		this.model.set('name', newName);
        this.model.set('age', newAge);
        this.model.set('occupation', newJob);
        this.model.set('gender', newGender);
	},
	
	DestroyPerson: function(){
		this.model.destroy();
	},
	
	remove: function(){
		this.$el.remove();
	},
	
	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'
	},

	submit: function(e) {
		e.preventDefault();
		var newPersonName = $(e.currentTarget).find('input[id=name]').val();
        var newPersonAge= $(e.currentTarget).find('input[id=age]').val();
        var newPersonJob= $(e.currentTarget).find('input[id=job]').val();
        var newPersonGender= $(e.currentTarget).find('input[name=gender]:checked').val();
		
// Having some difficulty returning the icon for the appropriate gender w/o returning code as string
    /*    var newPersonGenderIcon = '';
        if (newPersonGender === "male") {
            newPersonGenderIcon = "<i class='fa fa-mars' aria-hidden='true'></i>";
            }
        else if (newPersonGender === "female") {
            newPersonGenderIcon = "<i class='fa fa-venus' aria-hidden='true'></i>";
        }
        else {
            newPersonGenderIcon ='';
        }
    */
        
		var person = new App.Models.Person({ name: newPersonName, age: newPersonAge, occupation: newPersonJob, gender: newPersonGender }); //want to replace newPersonGender w/...GenderIcon
		this.collection.add(person);

	}
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26,
        gender: 'male'
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer',
	}
]);
var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
})();