var Relation = require("../common/Relation");
var ProcessInstancePage = function(world) {
	this.world = world;

};

ProcessInstancePage.prototype.get = function() {
	
	this.newButton = $$(".btn-primary").get(0);
	this.saveForm = $$(".btn-primary").get(0);
	this.editButton = $('[ng-click="editButton()"]');
	this.prioritySelect= $$(".selectize-input").get(0);
	
	this.table = $('#viewTable') ;
	this.taskName = $('#name');
	this.description = $('#description');
	this.title = $("h1");
	
	this.popup = $(".modal-content");
	this.usersTodelegate = this.popup.all(by.repeater('row in entity.data'));
	

	this.userRelation = new Relation(1);
	this.taskRelation = new Relation(2);
	this.processDefinitionRelation = new Relation(4);
	this.informationBox = $$(".box-solid").get(0);
	
	this.menu = $(".content-actionbar");
	this.dueDatePicker = $$(".datetimepicker-wrapper").get(0);
	
	
		
	
};

ProcessInstancePage.prototype.getNbUser = function(){
	return this.userRelation.getSize();
}

ProcessInstancePage.prototype.getNbTask = function(){
	return this.taskRelation.getSize();
}

ProcessInstancePage.prototype.getNbProcessDefinition = function(){
	return this.processDefinitionRelation.getSize();
}

ProcessInstancePage.prototype.EditButtonisPresent = function(){
	return this.editButton.isPresent();
}



module.exports = ProcessInstancePage;