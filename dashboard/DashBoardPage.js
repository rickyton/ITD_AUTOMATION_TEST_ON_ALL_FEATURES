
var DashBoardPage = function(world) {
	this.world = world;

	this.dashBoard = {};

};



DashBoardPage.prototype.get = function() {
	
	//navigation
	this.dashboard = $('.fa-dashboard');


	//map
	this.map = $("#task-map");

	//calendar
	this.calendar = $("#calendarWidget");

	this.calendarNextMonthButton   = this.calendar.$('[ng-click="move(1)"]');
	this.allCalendarTask = element.all(by.repeater('task in calendarWidget.tasks'));

	//timeline related
	this.timelineDay = $$(".timeline");
	this.timeLabel = $$('.time-label');
	this.allEvents = element.all(by.repeater("event in events"));
	this.listOftask = $$(".todo-list").get(0);

	//Box related
	this.taskSmallBox= $$(".small-box");
	this.taskSmallBoxOverdue = this.taskSmallBox.get(0);
	this.taskSmallBoxToday = this.taskSmallBox.get(1);
	this.taskSmallBoxUnassgined= this.taskSmallBox.get(2);
	this.taskSmallBoxSevenDay = this.taskSmallBox.get(3);

	//pagination
	this.paginationIndex = element.all(by.repeater('page in taskWidget.pages track by $index'));
	this.paginationPlus = $('[ng-click="changePage(taskWidget.page+1)"]');
	this.allTask = element.all(by.repeater('task in tasks[taskWidget.page]'));
	this.dayWithTask = this.calendar.$$(".dayWithTask");
};



DashBoardPage.prototype.dashBoardPage = function(){

	var self = this;
	browser.getCurrentUrl().then(function(url){		
		url = url.split('/');		
		var site = url[url.length-1];		
		if(site != 'dashboard'){
			browser.executeScript("arguments[0].click();", self.dashboard.getWebElement());
		}
	})
}



DashBoardPage.prototype.isMapPresent = function(){
	return this.map.isPresent();
}



DashBoardPage.prototype.isCalendarPresent = function(){
	return this.calendar.isPresent();
}


DashBoardPage.prototype.isTimelineIsPresent = function(){
	return this.timelineDay.get(0).isPresent();
}


DashBoardPage.prototype.isListOfTaskPresent = function(){
	return this.listOftask.isPresent();
}


DashBoardPage.prototype.getNbTaskIcon = function(){
	return this.taskSmallBox.then(function(iconTab){
		return iconTab.length;
	});
}



DashBoardPage.prototype.getNbSmallIconNumber = function(index){
	return this.taskSmallBox.get(index).element(by.css("h3")).getText().then(function(text){
		return text;
	})
}


DashBoardPage.prototype.clickOnOverdueSmallBox = function(){
	this.taskSmallBoxOverdue.click();
}

DashBoardPage.prototype.clickOnUnassignedSmallBox = function(){
	this.taskSmallBoxUnassgined.click();
}

DashBoardPage.prototype.clickOnTaskToBeDoneTodaySmallBox = function(){
	this.taskSmallBoxToday.click();
}


DashBoardPage.prototype.clickOnTaskToBeDoneInTheWeek = function(){
	this.taskSmallBoxSevenDay.click();
}

DashBoardPage.prototype.isLastPaginationIndex = function(){
	return this.paginationIndex.then(function(allIndex){
		return  hasClass(allIndex[allIndex.length-1] , 'active');
	});
}

DashBoardPage.prototype.taskPaginationPlus = function(){
	this.paginationPlus.click();
}

DashBoardPage.prototype.openEditTask = function(taskName){
	
	var index=1;
	var self=this;

	
	this.findPageTask(taskName,1).then(function(){
		self.findTask(taskName).then(function(result){
			browser.actions().mouseMove(result).perform().then(function(){
				result.$(".fa-edit").click();
			});
		})
	});
}

DashBoardPage.prototype.completeTask = function(taskName){
	
	var index=1;
	var self=this;

	
	this.findPageTask(taskName,1).then(function(){
		self.findTask(taskName).then(function(result){
			browser.actions().mouseMove(result).perform().then(function(){
				result.$(".fa-check-square-o").click();
			});
		})
	});
}

DashBoardPage.prototype.unclaimTask = function(taskName){
	
	var index=1;
	var self=this;

	
	this.findPageTask(taskName,1).then(function(){
		self.findTask(taskName).then(function(result){
			browser.actions().mouseMove(result).perform().then(function(){
				result.$(".fa-thumbs-o-down").click();
			});
		})
	});
}


DashBoardPage.prototype.delegateTask = function(taskName){
	
	var index=1;
	var self=this;

	
	this.findPageTask(taskName,1).then(function(){
		self.findTask(taskName).then(function(result){
			browser.actions().mouseMove(result).perform().then(function(){
				result.$(".fa-mail-forward").click();
			});
		})
	});
}


DashBoardPage.prototype.findPageTask = function(taskName,index){
	var self=this;
	var taskToComplete;
	var tasknotFind = true;
	return this.allTask.each(function(task){
		if(tasknotFind){
			task.$("a").getText().then(function(text){
				if(text==taskName ){
					taskToComplete=task;
					tasknotFind = false;
				}
			});
		}
	}).then(function(){
		if(index>1){
			self.isLastPaginationIndex().then(function(result){
				if(result){
					return null;
				}
				else{
					if(!tasknotFind){
						return null;
					}
					else{
						 self.taskPaginationPlus();
						 self.findPageTask(taskName,index++);
					}
				}
			});
		}
		else{
			if(!tasknotFind){
				return null;
			}
			self.taskPaginationPlus();
			self.findPageTask(taskName,++index);
		}
	})
}


DashBoardPage.prototype.findTask = function(taskName){
	var taskToComplete;
	return this.allTask.each(function(task){
	
		task.element(by.css("a")).getText().then(function(text){
			if(text==taskName ){
				taskToComplete=task;
				
				tasknotFind = false;
			}
		});
		
	}).then(function(){
		return taskToComplete;
	});
}


var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
        
        
    });
};



module.exports = DashBoardPage;