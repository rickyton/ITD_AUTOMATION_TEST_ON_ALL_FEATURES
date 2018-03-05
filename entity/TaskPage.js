var Relation = require("../common/Relation");

var TaskPage = function(world) {
	this.world = world;

	
};

TaskPage.prototype.get = function() {

	//buttons
	this.newButton = $$(".btn-primary").get(0);
	this.saveForm = $$(".btn-primary").get(0);
	this.editButton = $('[ng-click="editButton()"]');
	this.dashboardCloseButton = $('[ng-click="closeModalDialog()"]');
	this.openProcessDiagram = $('[ng-click="openRelatedEntity()"]');

	//fields
	this.taskName = $('#name') ;
	this.description = $('#description') ;

	//facets
	this.filterTask = $('#filterObject');
	this.processFacet =$("#facet_processDefinitionName");

	//others
	this.switchDiagramButton = $('[ng-click="switchDiagram()"]');
	this.diagramZone = $('#processDiagramCanvasDropZone');

	//icons
	this.pauseInstanceButton = $('[ng-click="changeState(\'suspend\')"]');
	this.cancelProcessButton = $('[ng-click="changeState(\'cancel\')"]');
	this.instanceTimeLine = $('[ng-show="instance.timeline"]');

};


TaskPage.prototype.goToTeamTasks = function() {
	this.filterTask.element(by.xpath("//*[contains(text(),'Team Tasks')]")).click();
}

TaskPage.prototype.goTolistOfMyTask = function() {
	this.filterTask.element(by.xpath("//*[contains(text(),'My Tasks')]")).click();
}

TaskPage.prototype.goToDelegateTasks = function() {
	this.filterTask.element(by.xpath("//*[contains(text(),'Delegated')]")).click();
}

TaskPage.prototype.goToUnassignedTasks = function() {
	this.filterTask.element(by.xpath("//*[contains(text(),'Unassigned')]")).click();
}

TaskPage.prototype.clickSwitchDiagramButton = function(){
	browser.executeScript("arguments[0].click();", this.switchDiagramButton.getWebElement());
}

TaskPage.prototype.newTask = function(taskName, taskDescription) {
	this.newButton.click();
	this.setTaskName(taskName);
	this.setDescription(taskDescription);
};

TaskPage.prototype.setTaskName = function(taskName){
	this.taskName.clear();
	this.taskName.sendKeys(taskName);
}

TaskPage.prototype.setDescription = function(description){
	this.description.clear();
	this.description.sendKeys(description);
}



module.exports = TaskPage;