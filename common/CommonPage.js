var CommonPage = function(world) {
	
	
		this.world = world;
		this.generic = {};

	
};

CommonPage.prototype.get = function() {
	
	//Navigation group
	this.dashboard = $('.fa-dashboard');
	this.admin = $('.fa-gear');
	this.pageRefresh = $('.glyphicon-repeat');
	this.sideBarMenu = $('.sidebar-menu');


	//Titles, Boxes, forms or panels group
	this.box = $$('.box');
	this.formGroup = $$('.form-group');
	this.panels = element.all(by.repeater('panel in form.layout.column2.panels'));
	this.title = $('h1');
	this.checkboxes = element.all(by.model('field.field_value'));

	//Tables, dialog
	this.tableList = $('#viewTable');
	this.rows = element.all(by.repeater('row in entity.data'));
	this.rowsInPanels = element.all(by.repeater('row in entityData'));
	this.mapView = $('#entity-map');
	this.dialogBox = $('.modal-content');
	this.aclRows = element.all(by.repeater('authority in authorities.selected'));
	this.filterFacet = $('#filter_list');
	this.okButton = $('.modal-footer').$('[ng-click="ok()"]');


	//Bars and fields
	this.searchBar = $('.selectize-input');
	this.searchBarFill = $('.ui-select-match');
	this.searchField = $('.ui-select-search');
	this.search = $('.fa-search');
	this.actionsBar = $('.content-actionbar');
	this.orderBy = element(by.model('orderBy'));


	//Buttons
	this.button = $$('.btn');
	this.newButton = $$('.btn-primary').get(0);
	this.saveFormButton = $$('.btn-primary').get(0);
	this.saveFormButton1 = $('.content-actionbar').$('[ng-click="save()"]');
	this.editButton = $$('.btn-primary').get(0);
	
	this.actionsButton = this.actionsBar.element(by.xpath('.//*[.="Actions"]'));
	this.activityButton = this.actionsBar.element(by.xpath('.//*[.="Activity"]'));
	this.aclAccess = this.actionsBar.$$('.btn-group').get(1).$('.caret');
	
	this.imageUploadInput = $$('input[type="file"]');
	this.imageUpload = $$('[data-ng-click="submitAll()"]');

	this.uploadButton = this.dialogBox.$('[uploader="uploader"]');

	//filter
	this.filterInFilter = element.all(by.repeater('filter in filters'));

	//Mode
	this.mapIcon = this.actionsBar.$('.fa-map-marker');
	this.listIcon = this.actionsBar.$('.fa-th-list');
	this.cardMode = this.actionsBar.$('.fa-th-large');

	//map
	this.detailsInMapView = $('#entity-in-map-view');

	//actions
	this.add = $('.fa-plus');
	this.ascend = $('.glyphicon-sort-by-attributes');
	this.descend = $('.glyphicon-sort-by-attributes-alt');
	
	//calendar
	this.calendar = $$('.fa-calendar');
	this.dateButtons = element.all(by.repeater('dt in row'));
	this.monthButtons = element.all(by.repeater('dt in row'));
	this.calendarHeader = $('.uib-title');
	this.pullCalendarRight = $('[ng-click="move(1)"]');
	this.pullCalendarLeft = $('[ng-click="move(-1)"]');
}

CommonPage.prototype.removeErrorMessageIfAny = function(){
	$('.error').isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", $('.error').$('.glyphicon-remove').getWebElement());
		}
	})
}


CommonPage.prototype.entityPage = function(entity){	
	this.entityPageWithoutRefresh(entity);
	browser.executeScript("arguments[0].click();", this.pageRefresh.getWebElement());
	browser.sleep(1000);	
}

CommonPage.prototype.entityPageWithoutRefresh = function(entity){
	var self = this;
	self.removeErrorMessageIfAny();
	browser.getCurrentUrl().then(function(url){
		url = url.split('/');
		var site = url[url.length-1];	
		if(site != 'dashboard'){
			browser.executeScript("arguments[0].click();", self.dashboard.getWebElement());
		}
	})
	self.admin.click();
	self.box.each(function(eachBox){
		eachBox.$('.box-title').getText().then(function(boxName){
			if(boxName.includes('Ecosystem Data')){
				boxToSelect = eachBox;
			}
		})
	}).then(function(){
		var ele = boxToSelect.element(by.xpath('.//*[.="'+entity+'"]'));
		ele.isPresent().then(function(isPres){
			if(!isPres){
				var extention = boxToSelect.$('[ng-click="changeNumberOfForms()"]');
				browser.executeScript("arguments[0].click();", extention.getWebElement());
			}
		});

		browser.executeScript('arguments[0].scrollIntoView(false)', ele.getWebElement());
		browser.actions().mouseMove(ele).perform();
		ele.click();
	});	
}


CommonPage.prototype.systemEntityPage = function(panel,entity){
	var self = this;
	this.removeErrorMessageIfAny();
	browser.getCurrentUrl().then(function(url){		
		url = url.split('/');		
		var site = url[url.length-1];
		if(site != 'dashboard'){
			browser.executeScript("arguments[0].click();", self.dashboard.getWebElement());
		}
	});
	this.admin.click();
	this.box.each(function(eachBox){
		eachBox.$('.box-title').getText().then(function(boxName){
			if(boxName.includes(panel)){
				boxToSelect = eachBox;
			}
		})
	}).then(function(){
		var ele = boxToSelect.element(by.xpath('.//*[.="'+entity+'"]'));
		browser.executeScript('arguments[0].scrollIntoView(false)', ele.getWebElement());
		browser.actions().mouseMove(ele).perform();
		ele.click();
	});
	browser.sleep(1000);
	
	// if(entity != "Utilities"){
	// 	browser.refresh();
	// }

}

CommonPage.prototype.entityPageFromSideBar = function(entity){
	var entity = this.sideBarMenu.element(by.xpath('.//*[.="'+entity+'"]'));
	browser.executeScript("arguments[0].click();", entity.getWebElement());
}



CommonPage.prototype.getNbElement = function(){
	var nbElement = this.title.getText().then(function(str){
		var res = str.split("(");
		var nbElement =  res[res.length-1];
		nbElement = nbElement.substring(0,nbElement.length-1);
		nbElement = parseInt(nbElement);
		return 	isNaN(nbElement) ?  0 : nbElement;
	})
	return nbElement;	
}



CommonPage.prototype.itemInPanel = function(panel,item){
	this.box.each(function(eachBox){
		eachBox.$('.box-title').getText().then(function(boxName){
			if(boxName.includes(panel)){
				boxToSelect = eachBox;
			}
		})
	}).then(function(){
		var ele = boxToSelect.element(by.xpath(".//*[contains(text(),'"+item+"')]"));
		browser.executeScript('arguments[0].scrollIntoView(false)', ele.getWebElement());
		browser.actions().mouseMove(ele).perform();
		ele.click();
	});
	
}

CommonPage.prototype.selectItem = function(field,type,item){
	var ele = field.element(by.cssContainingText(type,item));
	// browser.executeScript("arguments[0].click();", ele.getWebElement());
	// browser.executeScript('arguments[0].scrollIntoView(false)', ele.getWebElement());
	browser.actions().mouseMove(ele).perform();
	ele.click();
}

CommonPage.prototype.selectOption = function(field,cssAttribute,valueAttribute){
	field.all(by.css('option')).each(function(opt){
		opt.getAttribute(cssAttribute).then(function(value){
			if(value.includes(valueAttribute)){
				optionToClick = opt;
			}
		})
	}).then(function(){
		optionToClick.click();
		// browser.executeScript("arguments[0].click();", optionToClick.getWebElement());
	})
};


CommonPage.prototype.selectItemInField = function(field,type,item){
	var self = this;
	// browser.executeScript('arguments[0].scrollIntoView(false)', field.getWebElement());
	// browser.actions().mouseMove(field).perform();
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		self.selectItem(field,type,item);
	});
}

CommonPage.prototype.selectItemType1 = function(type,item){
	var ele = element(by.xpath('.//'+type+'[.="'+item+'"]'));
	// browser.executeScript("arguments[0].click();", ele.getWebElement());
	// browser.executeScript('arguments[0].scrollIntoView(false)', ele.getWebElement());
	browser.actions().mouseMove(ele).perform();
	ele.click();
}

CommonPage.prototype.selectItemInFieldType1 = function(field,type,item){
	var self = this;
	// browser.executeScript('arguments[0].scrollIntoView(false)', field.getWebElement());
	// browser.actions().mouseMove(field).perform();
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		self.selectItemType1(type,item);
	});
}

CommonPage.prototype.selectItemInFieldType2 = function(label,type,item){
	var self = this;
	$$('.form-group').each(function(group){
		group.$('label').getText().then(function(txt){
			if(txt==label){
				groupToSelect = group;
			}
		})
	}).then(function(){
		var ele1 = groupToSelect.$('.selectize-input');
		browser.actions().mouseMove(ele1).perform();
		ele1.click().then(function(){
			self.selectItemType1(type,item);
		});
	})	
}

CommonPage.prototype.selectRandomItemInField = function(index,string){
	var self = this;
	var field = $$('.ui-select-search').get(index);

	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		field.sendKeys(string).then(function(){
			element.all(by.repeater('option in $select.items')).count().then(function(nb){
				var rand = Math.round(Math.random()*(nb-1));
				var item = element.all(by.repeater('option in $select.items')).get(rand);
				browser.executeScript("arguments[0].click();", item.getWebElement());
			})
		})
	})	
}

CommonPage.prototype.selectIndexOption = function(groupType,label,index){
	var self = this;
	groupType.each(function(group){
		group.$('label').getText().then(function(name){
			if(name.includes(label)){
				groupSelected = group;
			}
		})
	}).then(function(){
		var field = groupSelected.$('.selectize-input');
		browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
			var option = element.all(by.repeater('option in $select.items')).get(index);
			browser.executeScript("arguments[0].click();", option.getWebElement())
		})
	})
}

CommonPage.prototype.getRowNumberInSearchField = function(index,string){
	var self = this;
	var field = $$('.ui-select-search').get(index);

	browser.executeScript("arguments[0].click();", field.getWebElement());
	field.clear();
	field.sendKeys(string);
	return element.all(by.repeater('option in $select.items')).count();	
}

CommonPage.prototype.getContentInSearchField = function(index,string){
	var self = this;
	var field = $$('.ui-select-search').get(index);

	browser.executeScript("arguments[0].click();", field.getWebElement());
	field.clear();
	field.sendKeys(string);
	return element.all(by.repeater('option in $select.items')).getText();	
}


CommonPage.prototype.fillInField = function(field,content){
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		field.clear();
		field.sendKeys(content);
	});
}


CommonPage.prototype.addingFilter = function(title,field,operator,criteria){
	
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-cog').getWebElement());
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-plus').getWebElement());		
	this.fillInField($('#title'),title);
	this.selectItemInField(element(by.model('filterToAdd')),'option',field);
	this.selectItemInField(element(by.model('filter.operation')),'option',operator);
	this.selectItemInFieldType1(element(by.model('$select.search')),'div',criteria);
	this.clickOnButton('OK');
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-check').getWebElement());
}


CommonPage.prototype.addingFilterType1 = function(title,field,operator,criteria){	
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-cog').getWebElement());
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-plus').getWebElement());
	this.fillInField($('#title'),title);
	this.selectItemInField(element(by.model('filterToAdd')),'option',field);	
	this.selectItemInField(element(by.model('filter.operation')),'option',operator);	
	this.fillInField(element(by.model('filter.value.text')),criteria);	
	this.clickOnButton('OK');
	browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-check').getWebElement());	
}



CommonPage.prototype.deleteFilter = function(filter){
	var self = this;
	$('#filter_list').element(by.xpath('.//*[.="'+filter+'"]')).isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-cog').getWebElement());
			self.filterInFilter.each(function(filt){
				filt.$$('a').last().getText().then(function(filterName){
					if(filterName==filter){
						filterToClick = filt;
					}
				})
			}).then(function(){
				browser.executeScript("arguments[0].click();", filterToClick.$('.fa-times').getWebElement());
			});
			browser.executeScript("arguments[0].click();", $('#filter_list').$('.fa-check').getWebElement());
		}
	})	
}



CommonPage.prototype.switchToEditMode = function(){
	$('.fa-pencil-square').getCssValue('color').then(function(color){
		if(color != 'rgba(0, 234, 15, 1)'){
			browser.executeScript("arguments[0].click();", $('.fa-pencil-square').getWebElement());
		}
	})
}


CommonPage.prototype.switchToViewMode = function(){
	$('.fa-pencil-square').getCssValue('color').then(function(color){
		if(color != 'rgba(255, 255, 255, 1)'){
			browser.executeScript("arguments[0].click();", $('.fa-pencil-square').getWebElement());
		}
	})
}

CommonPage.prototype.switchToViewModeFromMapView = function(){
	$('[ng-click="switchViewMode()"]').isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", $('[ng-click="switchViewMode()"]').getWebElement());
		}
	})
}


CommonPage.prototype.listMode = function(){
	browser.executeScript("arguments[0].click();", this.listIcon.getWebElement());	
}


CommonPage.prototype.mapMode = function(){
	var self = this;
	this.mapView.isPresent().then(function(isPres){
		if(!isPres){
			browser.executeScript("arguments[0].click();", self.mapIcon.getWebElement());
		}
	})
}



CommonPage.prototype.closeMap = function(){
	$$('.map-buttons').each(function(btn){
		btn.$('.btn-map-left').getText().then(function(buttonLabel){
			if(buttonLabel.includes('Layers')){
				buttonToCLick = btn;
			}
		})
	}).then(function(){
		browser.actions().mouseMove(buttonToCLick).perform();
		browser.executeScript("arguments[0].click();", buttonToCLick.$('.btn-map-right').getWebElement());
	})
}


/**
 * Search in list only
 */
CommonPage.prototype.searchInList = function(name){
	var self=this;
	// this.tableList.click();
	this.searchBar.getText().then(function(text){
		if(text.length!=0){
			self.searchBarFill.click();
			self.searchField.clear();
		}
	}).then(function(){
		self.searchField.click().then(function(){
			self.searchField.clear()
			self.searchField.sendKeys(name);
			self.search.click();
		})
		
	})	
}


CommonPage.prototype.loadDetail = function( name ) {
	//In case the list is long we use the filter
	this.searchInList(name);
	var entitySearched = this.tableList.all(by.xpath(".//*[contains(text(),'"+name+"')]")).each(function(entity){
		entity.getText().then(function(text){
			if(text==name){
				entitySearched=entity;
			}
		})
	}).then(function(){
		var row = entitySearched.element(by.xpath("../../../.."));
		var link = row.$('a');
		browser.executeScript("arguments[0].click();", link.getWebElement());
		browser.sleep(1000);
	});
};


CommonPage.prototype.loadDetailType1 = function( name ) {
	//In case the list is long we use the filter
	this.searchInList(name);
	var entitySearched = this.tableList.all(by.xpath(".//*[contains(text(),'"+name+"')]")).each(function(entity){
		entity.getText().then(function(text){
			if(text==name){
				entitySearched=entity;
			}
		})
	}).then(function(){
		var row = entitySearched.element(by.xpath("../../../.."));
		var link = row.$$('.div-table-td').get(0);
		browser.executeScript("arguments[0].click();", link.getWebElement());
		browser.sleep(1000);
	});
};


CommonPage.prototype.isPresentInList = function( name ) {
	this.searchInList(name);
	return this.tableList.element(by.xpath(".//*[contains(text(),'"+name+"')]")).isPresent();	
};



CommonPage.prototype.clickOnDelete = function(elementName){
	var self = this;
	self.searchInList(elementName);
	self.tableList.all(by.xpath(".//*[contains(text(),'"+elementName+"')]")).each(function(entity){
		entity.getText().then(function(text){
			if(text==elementName){
				entitySearched=entity;
			}
		})
	}).then(function(){
		var row = entitySearched.element(by.xpath("../../../.."));
		var link = row.$('a');
		browser.executeScript('arguments[0].scrollIntoView(false)', row.getWebElement());
		browser.actions().mouseMove(row).perform().then(function(){
			var button = row.$('.fa-remove');
			browser.executeScript("arguments[0].click();", button.getWebElement());
		});
	});
}

CommonPage.prototype.deleteEntity = function(entity) {
	var self = this;
	this.isPresentInList(entity).then(function(isPres){
		if(isPres){
			browser.refresh();
			self.clickOnDelete(entity);
			self.validationDelete();
		}
	});
}


CommonPage.prototype.validationDelete = function() {
	var self = this;
	self.dialogBox.$('.btn-danger').click();
	browser.sleep(1000);
}

CommonPage.prototype.proceedAnywayIfAny = function() {
	var self = this;
	this.dialogBox.isPresent().then(function(isPres){
		if(isPres){
			var ok = self.dialogBox.$('[ng-click="ok(\'continue\')"]');
			browser.executeScript("arguments[0].click();", ok.getWebElement());
		}	
	})
}

//if true selected, adding existing relation, else adding new one
CommonPage.prototype.clickOnAddRelation = function(title,boolean){
	var panelToClick;
	this.panels.each(function(panel){
		panel.$('h4').getText().then(function(name){
			if(name.includes(title)){
				panelToClick = panel;
			}
		})
	}).then(function(){
		if(boolean == true){
			browser.executeScript("arguments[0].click();", panelToClick.$('.fa-link').getWebElement());
		}
		else{
			browser.executeScript("arguments[0].click();", panelToClick.$('.fa-plus').getWebElement());
		}
	})
}


CommonPage.prototype.saveForm = function(){
	this.saveFormButton.click();
	browser.sleep(1500);
}

CommonPage.prototype.edit = function(){
	this.editButton.click();
}


CommonPage.prototype.clickOnButton = function(label){
	this.button.each(function(btn){
		btn.getText().then(function(buttonLabel){
			if(buttonLabel.includes(label)){
				buttonToCLick = btn;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", buttonToCLick.getWebElement());
	})
}



CommonPage.prototype.isElementPresent = function(label){
		return element(by.xpath('.//*[.="'+label+'"]')).isPresent();
}


CommonPage.prototype.formGroupOptions = function(label,index){
	this.formGroup.each(function(group){
		browser.executeScript('arguments[0].scrollIntoView(false)', group.getWebElement());
		browser.actions().mouseMove(group).perform();
		group.$('label').getText().then(function(groupLabel){
			if(groupLabel.includes(label)){
				groupToSelect = group;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();",groupToSelect.$('input').getWebElement()).then(function(){
			browser.executeScript("arguments[0].click();",groupToSelect.$$('span').get(index).getWebElement());
		})
	})
}

CommonPage.prototype.getFormGroupData = function(label){
	return this.formGroup.each(function(group){
		group.$('label').getText().then(function(groupLabel){
			if(groupLabel.includes(label)){
				groupToSelect = group;
			}
		})
	}).then(function(){
		return groupToSelect.$('p').getText();
	})
}


CommonPage.prototype.Layer = function(){
	$$('.btn-map').each(function(btn){
		btn.getText().then(function(txt){
			if(txt=='Layers'){
				btnToClick = btn;
			}
		})
	}).then(function(){
		btnToClick.click();
	})
}

CommonPage.prototype.detailMapView = function(){
	var self = this;
	this.actionsBar.element(by.xpath(".//*[contains(text(),'Map')]")).isPresent().then(function(isPres){
		if(isPres){
			self.clickOnButton('Map');
		}
	})
}


CommonPage.prototype.mapGlobalIsAlreadyClicked = function() {
	return element(by.model('layerToEdit.global')).isSelected();
};


CommonPage.prototype.setMapGlobal = function(value) {
	var self = this;
	if(value==true){
		this.mapGlobalIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				var globalCheckbox = element(by.model('layerToEdit.global'));
				browser.executeScript("arguments[0].click();", globalCheckbox.getWebElement());
			}
		})
	}
	
};


CommonPage.prototype.mapPersonalIsAlreadyClicked = function() {
	return element(by.model('layerToEdit.personal')).isSelected();
};


CommonPage.prototype.setMapPersonal = function(value) {
	var self = this;
	if(value==true){
		this.mapPersonalIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				var personalCheckbox = element(by.model('layerToEdit.personal'));
				browser.executeScript("arguments[0].click();", personalCheckbox.getWebElement());
			}
		})
	}
	
};


CommonPage.prototype.checkboxIsAlreadyClicked = function(checkbox) {
	return checkbox.isSelected();
};


CommonPage.prototype.setCheckbox = function(checkbox,value) {

	if(value==true){
		this.checkboxIsAlreadyClicked(checkbox).then(function(isAlreadySelected){
			if(!isAlreadySelected){
				browser.executeScript("arguments[0].click();", checkbox.getWebElement());
			}
		})
	}
	else{
		this.checkboxIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected){
				browser.executeScript("arguments[0].click();", checkbox.getWebElement());
			}
		})
	}
	
};


CommonPage.prototype.collectionMapLayer = function(title,distance,source,filter,bool,existingLayer){
	var self = this;
	if(typeof(existingLayer)=='undefined'){
		existingLayer = null;
	};
	this.detailMapView();
	this.Layer();
	var edit = $('#legend-tab').element(by.xpath(".//*[contains(text(),'edit')]"));
	edit.isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", edit.getWebElement());
		}
	});
	if(bool==true){
		var ele = $('#legend-tab').element(by.xpath('.//*[.="'+existingLayer+'"]'));
		browser.executeScript("arguments[0].click();", ele.getWebElement());
	}
	else{
		var newButton = $('#legend-tab').element(by.xpath('.//*[contains(text(),"new")]'));
		browser.executeScript("arguments[0].click();", newButton.getWebElement());
	}
	this.fillInField(element(by.model('layerToEdit.title')),title);
	this.selectItemInField(element(by.model('layerToEdit.layerType')),'option','Collection');
	this.fillInField(element(by.model('layerToEdit.layerData.value')),distance);
	this.selectItemInField(element(by.model('layerToEdit.layerData.entityType')),'option',source);
	this.selectItemInField(element(by.model('layerToEdit.layerData.filterId')),'option',filter);

	var save = $('#legend-tab').element(by.xpath('.//*[contains(text(),"Save")]'));
	browser.executeScript("arguments[0].click();", save.getWebElement());
}


CommonPage.prototype.connectionLineIsAlreadyClicked = function() {
	return element(by.model('layerToEdit.layerData.lineGeodesic')).isSelected();
};


CommonPage.prototype.setConnectionLine = function(value) {
	var self = this;
	if(value==true){
		this.connectionLineIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				var connectionLine = element(by.model('layerToEdit.layerData.lineGeodesic'));
				browser.executeScript("arguments[0].click();", connectionLine.getWebElement());
			}
		})
	}
	
};


CommonPage.prototype.connectionMapLayer = function(title,relation,bool,existingLayer,connectionLine){
	var self = this;
	if(typeof(existingLayer)=='undefined'){
		existingLayer = null;
	};
	this.detailMapView();
	this.Layer();

	var edit = $('#legend-tab').element(by.xpath(".//*[contains(text(),'edit')]"))
	edit.isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", edit.getWebElement());
		}
	});
	if(bool==true){
		var existingLay = $('#legend-tab').element(by.xpath('.//*[.="'+existingLayer+'"]'));
		browser.executeScript("arguments[0].click();", existingLay.getWebElement());
	}
	else{
		var newButt = $('#legend-tab').element(by.xpath('.//*[contains(text(),"new")]'));
		browser.executeScript("arguments[0].click();", newButt.getWebElement());
	}
	this.fillInField(element(by.model('layerToEdit.title')),title);
	this.selectItemInField(element(by.model('layerToEdit.layerType')),'option','Connections');
	this.selectItemInField(element(by.model('layerToEdit.layerData.relation')),'option',relation);
	this.setConnectionLine(connectionLine);

	var save = $('#legend-tab').element(by.xpath('.//*[contains(text(),"Save")]'));
	browser.executeScript("arguments[0].click();", save.getWebElement());
}


CommonPage.prototype.zoneMapLayer = function(title,source,value,strokeOpacity,strokeWidth,fillOpacity,bool,existingLayer){
	var self = this;
	if(typeof(existingLayer)=='undefined'){
		existingLayer = null;
	};
	if(typeof(distance)=='undefined'){
		distance = null;
	};
	if(typeof(value)=='undefined'){
		value = null;
	};
	this.detailMapView();
	this.Layer();
	var edit = $('#legend-tab').element(by.xpath(".//*[contains(text(),'edit')]"));
	edit.isPresent().then(function(isPres){
		if(isPres){
			browser.executeScript("arguments[0].click();", edit.getWebElement());
		}
	});
	if(bool==true){
		var ele = $('#legend-tab').element(by.xpath('.//*[.="'+existingLayer+'"]'));
		browser.executeScript("arguments[0].click();", ele.getWebElement());
	}
	else{
		var newButton = $('#legend-tab').element(by.xpath('.//*[contains(text(),"new")]'));
		browser.executeScript("arguments[0].click();", newButton.getWebElement());
	}
	this.fillInField(element(by.model('layerToEdit.title')),title);
	this.selectItemInField(element(by.model('layerToEdit.layerType')),'option','Zone');
	this.selectItemInField(element(by.model('layerToEdit.layerData.input')),'option',source);
	if(source=='Static'){
		this.fillInField(element(by.model('layerToEdit.layerData.value')),value);
	}
	else{
		this.selectItemInField(element(by.model('layerToEdit.layerData.value')),'option',value);
	}
	this.fillInField(element(by.model('layerToEdit.layerData.strokeOpacity')),strokeOpacity);
	this.fillInField(element(by.model('layerToEdit.layerData.strokeWeight')),strokeWidth);
	this.fillInField(element(by.model('layerToEdit.layerData.fillOpacity')),fillOpacity);

	var save = $('[ng-click="saveLayer(layerToEdit)"]');
	browser.executeScript("arguments[0].click();", save.getWebElement());
}


CommonPage.prototype.deleteMapLayer = function(layerName){
	var self = this;
	this.detailMapView();
	this.Layer();
	var edit = $('#legend-tab').element(by.xpath(".//*[contains(text(),'edit')]"));
	edit.isPresent().then(function(isPres){
		if(isPres){	
			browser.executeScript("arguments[0].click();", edit.getWebElement());
		}
	});
	
	var layer = $('#legend-tab').element(by.xpath('.//*[.="'+layerName+'"]'));
	browser.executeScript("arguments[0].click();", layer.getWebElement());
	
	var del = $('#legend-tab').element(by.xpath('.//*[contains(text(),"Delete")]'));
	browser.executeScript("arguments[0].click();", del.getWebElement());
	this.validationDelete();
}



CommonPage.prototype.setACLWOCreate = function(item,Read,Write,Delete,Administer,Create){
	var self = this;
	var rowSelected;
	if(typeof(Create)=='undefined'){
		Create = null;
	};
	self.aclRows.each(function(row){
		row.$$('td').get(0).getText().then(function(name){
			if(name==item){
				rowSelected = row;
			}
		})
	}).then(function(){
		var read = rowSelected.element(by.model('authority.access.read'));
		var write = rowSelected.element(by.model('authority.access.write'));
		var del = rowSelected.element(by.model('authority.access.delete'));
		var administer = rowSelected.element(by.model('authority.access.administer'));
		var create = rowSelected.element(by.model('authority.access.create'));

		create.isPresent().then(function(isPres){
			if(isPres){
				if(Create==true){
					create.isSelected().then(function(isAlreadySelected){
						if(!isAlreadySelected){
							browser.executeScript("arguments[0].click();", create.getWebElement());
						}	
					})
				}
				else if(Create==false){
					create.isSelected().then(function(isAlreadySelected){
						if(isAlreadySelected){
							browser.executeScript("arguments[0].click();", create.getWebElement());
						}	
					})
				};
			}
		});

		if(Read==true){
			read.isSelected().then(function(isAlreadySelected){
				if(!isAlreadySelected){
					browser.executeScript("arguments[0].click();", read.getWebElement());
				}	
			})
		}
		else {
			read.isSelected().then(function(isAlreadySelected){
				if(isAlreadySelected){
					browser.executeScript("arguments[0].click();", read.getWebElement());
				}	
			})
		};

		if(Write==true){
			write.isSelected().then(function(isAlreadySelected){
				if(!isAlreadySelected){
					browser.executeScript("arguments[0].click();", write.getWebElement());
				}	
			})
		}
		else {
			write.isSelected().then(function(isAlreadySelected){
				if(isAlreadySelected){
					browser.executeScript("arguments[0].click();", write.getWebElement());
				}	
			})
		};

		if(Delete==true){
			del.isSelected().then(function(isAlreadySelected){
				if(!isAlreadySelected){
					browser.executeScript("arguments[0].click();", del.getWebElement());
				}	
			})
		}
		else {
			del.isSelected().then(function(isAlreadySelected){
				if(isAlreadySelected){
					browser.executeScript("arguments[0].click();", del.getWebElement());
				}	
			})
		};

		if(Administer==true){
			administer.isSelected().then(function(isAlreadySelected){
				if(!isAlreadySelected){
					browser.executeScript("arguments[0].click();", administer.getWebElement());
				}	
			})
		}
		else {
			administer.isSelected().then(function(isAlreadySelected){
				if(isAlreadySelected){
					browser.executeScript("arguments[0].click();", administer.getWebElement());
				}	
			})
		};	
	})	
};


CommonPage.prototype.setACL = function(item,Read,Write,Delete,Administer,Create){
	var self = this;
	var field = $('.ui-select-search');
	if(item == 'first'){	
		browser.executeScript('arguments[0].scrollIntoView(false)', field.getWebElement());
		browser.actions().mouseMove(field).perform();
		field.click();
		authorFirst = element.all(by.repeater('authority in $group.items')).first().getText();
		element.all(by.repeater('authority in $group.items')).first().click();
	} else if(item == 'last'){
		browser.executeScript('arguments[0].scrollIntoView(false)', field.getWebElement());
		browser.actions().mouseMove(field).perform();
		field.click();
		authorLast = element.all(by.repeater('authority in $group.items')).last().getText();
		element.all(by.repeater('authority in $group.items')).last().click();
	}else{
		this.selectItemInFieldType1($('.ui-select-search'),'div',item);
	}
	this.add.click();
	if(item == 'first'){
		authorFirst.then(function(item1){
			self.setACLWOCreate(item1,Read,Write,Delete,Administer,Create);
		})
	} else if(item=='last'){
		authorLast.then(function(item2){
			self.setACLWOCreate(item2,Read,Write,Delete,Administer,Create);
		})
	} else{
		self.setACLWOCreate(item,Read,Write,Delete,Administer,Create);
	}
};



CommonPage.prototype.setAclExistingEntities = function(bool){

	var box = element(by.model('form.propagate_acl_to_entities'));
	if(bool==true){
		box.isSelected().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				browser.executeScript("arguments[0].click();", box.getWebElement());
			}	
		})
	}
	else {
		box.isSelected().then(function(isAlreadySelected){
			if(isAlreadySelected){
				browser.executeScript("arguments[0].click();", box.getWebElement());
			}	
		})
	};
};


CommonPage.prototype.setRecursivelyToChildren = function(bool){
	
	var box = element(by.model('form.propagate_acl_to_entities_and_children'));

	if(bool==true){
		box.isSelected().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				browser.executeScript("arguments[0].click();", box.getWebElement());
			}	
		})
	}
	else {
		box.isSelected().then(function(isAlreadySelected){
			if(isAlreadySelected){
				browser.executeScript("arguments[0].click();", box.getWebElement());
			}	
		})
	};
					
};


CommonPage.prototype.isAclSelected = function(role,right){
	
	return element.all(by.repeater('authority in authorities.selected')).each(function(row){
		row.$$('td').get(0).getText().then(function(name){
			if(name==role){
				rowSelected = row;
			}
		})
	}).then(function(){
		if(right=='read'){
			return rowSelected.element(by.model('authority.access.read')).isSelected();
		}
		else if(right=='write'){
			return rowSelected.element(by.model('authority.access.write')).isSelected();
		}
		else if(right=='delete'){
			return rowSelected.element(by.model('authority.access.delete')).isSelected();
		}
		else if(right=='administer'){
			return rowSelected.element(by.model('authority.access.administer')).isSelected();
		}
	})			
};


CommonPage.prototype.selectDropdownItem = function(btn,type,item){
	$$('.btn-group').each(function(group){
		group.$(type).getText().then(function(name){
			if(name.includes(btn)){
				groupSelected = group;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", groupSelected.$('.caret').getWebElement()).then(function(){
			browser.executeScript("arguments[0].click();", groupSelected.element(by.xpath('.//*[.="'+item+'"]')).getWebElement());
		})
	})				
};

CommonPage.prototype.selectDropdownItemType1 = function(btn,type,item){
	$$('.btn-group').each(function(group){
		group.$(type).getText().then(function(name){
			if(name.includes(btn)){
				groupSelected = group;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", groupSelected.$('.caret').getWebElement()).then(function(){
			browser.executeScript("arguments[0].click();", $('.dropdown-menu').element(by.xpath('.//*[.="'+item+'"]')).getWebElement());
		})
	})				
};


CommonPage.prototype.isCaretPresent = function(btn,type){
	return $$('.btn-group').each(function(group){
		group.$(type).getText().then(function(name){
			if(name==btn){
				groupSelected = group;
			}
		})
	}).then(function(){
		return groupSelected.$('.caret').isPresent();
	})				
};


CommonPage.prototype.clickElementInPanel = function(title,item){
	var panelToClick;
	var ele;
	this.panels.each(function(panel){
		panel.$('h4').getText().then(function(name){
			if(name.includes(title)){
				panelToClick = panel;
			}
		})
	}).then(function(){
		if(item=='first'){
			ele = panelToClick.$$('[ng-click="editChild(row)"]').first();
			browser.executeScript("arguments[0].click();", ele.getWebElement());
		} else if(item=='last'){
			ele = panelToClick.$$('[ng-click="editChild(row)"]').last();
			browser.executeScript("arguments[0].click();", ele.getWebElement());
		} else{
			// panelToClick.element(by.xpath('.//*[.="'+item+'"]')).click();
			var ele = panelToClick.element(by.xpath('.//*[.="'+item+'"]'));
			browser.executeScript("arguments[0].click();", ele.getWebElement());
		}
		
	})
					
};

CommonPage.prototype.rowDeletion = function(rows,name){
	rows.each(function(row){
		row.$$('td').get(0).getText().then(function(rowName){
			if(rowName==name){
				rowToClick = row;
			}
		})
	}).then(function(){
		var remove = rowToClick.$('.fa-times');
		browser.actions().mouseMove(remove).perform();
		browser.executeScript("arguments[0].click();", remove.getWebElement());
		
	})
					
};

CommonPage.prototype.searchPopupWOSaveNClick = function(item){
	var self = this;
	self.searchField.click().then(function(){
		self.searchField.clear();
		self.searchField.sendKeys(item);
		browser.sleep(1000);
		self.search.click();
		
	})
					
};


CommonPage.prototype.searchPopupWOSave = function(item){
	this.searchPopupWOSaveNClick(item);
	this.dialogBox.element(by.cssContainingText('a',item)).click();				
};


CommonPage.prototype.searchPopup = function(item){
	if(item=='first'){
		browser.executeScript("arguments[0].click();", this.rows.first().$('a').getWebElement());	
	} else if(item=='last'){
		browser.executeScript("arguments[0].click();", this.rows.last().$('a').getWebElement());
	} else{
		this.searchPopupWOSaveNClick(item);
		this.dialogBox.element(by.cssContainingText('a',item)).click();
	}
	this.dialogBox.element(by.xpath('.//*[.="Save"]')).click();				
};

CommonPage.prototype.selectRowInPopup = function(index){
	browser.executeScript("arguments[0].click();", this.rows.get(index).$('a').getWebElement());
	this.dialogBox.element(by.xpath('.//*[.="Save"]')).click();				
};


CommonPage.prototype.isDeleteButtonPresent = function(elementName){
	var self = this;
	this.searchInList(elementName);
	return this.rows.each(function(row){
		row.all(by.css('.div-table-td')).get(0).getText().then(function(txt){
			if(txt==elementName){
				rowSelected = row;
			} else if(elementName=='first'){
				rowSelected = self.rows.first();
			} else if(elementName=='last'){
				rowSelected = self.rows.last();
			}
		})
	}).then(function(){
		var del = rowSelected.$('.fa-remove');
		return del.isPresent();
	})
}


CommonPage.prototype.isButtonDisplayed = function(label){
	return $$('.btn').each(function(btn){
		btn.getText().then(function(name){
			if(name==label){
				btnSelected = btn;
			}
		})
	}).then(function(){
		return btnSelected.isDisplayed();
	})				
};

CommonPage.prototype.isButtonPresent = function(label){
	return $$('.btn').each(function(btn){
		btn.getText().then(function(name){
			if(name==label){
				btnSelected = btn;
			}
		})
	}).then(function(){
		return btnSelected.isPresent();
	})				
};



CommonPage.prototype.sorting = function(bool){
	var self = this;
	if(bool==true){
		this.ascend.isPresent().then(function(isPres){
			if(!isPres){
				browser.executeScript("arguments[0].click();", self.descend.getWebElement());
				// self.descend.click();
			}
		})
	}
	else{
		this.descend.isPresent().then(function(isPres){
			if(!isPres){
				browser.executeScript("arguments[0].click();",self.ascend.getWebElement());
				// self.ascend.click();
			}
		})
	}

}


CommonPage.prototype.sortAscend = function(array) {
	var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
	return array.sort(collator.compare);
}

CommonPage.prototype.sortDescend = function(array) {
	return Promise.resolve(this.sortAscend(array)).then(function(arr){
		return arr.reverse();
	})
}


CommonPage.prototype.getHeader = function(){
	var self = this;
	var header = self.tableList.$('.div-table-header-tr').$$('a');
	return header.map(function(name){	
			return name.getText();
	});
}

CommonPage.prototype.getColumn = function(column){
	var self = this;
	return self.getHeader().then(function(headerTable){
		for(var i = 0 ; i<headerTable.length ; i++ ) {
			if(headerTable[i].includes(column)){
					index = i;
			}
		}
	}).then(function(){
		return self.rows.map(function(row){
			return row.$$(".div-table-td").get(index).getText();			
		});
	});
}


CommonPage.prototype.getHeaderInPopup = function(){
	var self = this;
	var header = self.dialogBox.$$('th');
	return header.map(function(name){	
		return name.getText();
	})	
}

CommonPage.prototype.getColumnInPopup = function(column){
	var self = this;
	return this.getHeaderInPopup().then(function(headerTable){
		for(var i = 0 ; i<headerTable.length ; i++ ) {
			if(headerTable[i] === column){
					index = i;
			}
		}
	}).then(function(){
		return self.rows.map(function(row){
			return row.$$("td").get(index).getText();			
		})
	});
}



/**
 * function which said if an element is a typeOf a css class
 */
var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;       
    });
};


CommonPage.prototype.moveToElement = function(element){
	browser.executeScript('arguments[0].scrollIntoView(false)', element.getWebElement());
	browser.actions().mouseMove(element).perform();	
}


CommonPage.prototype.getPanelTitle = function(){
	return this.panels.$$('h4').map(function(title){	
		return title.getText();
	});
}


CommonPage.prototype.getDataInPanel = function(title){
	var self = this;
	return self.getPanelTitle().then(function(panel){
		for(var i = 0 ; i<panel.length ; i++ ) {
			if(panel[i].includes(title)){
				index = i;
			}
		}
	}).then(function(){
		return self.panels.get(index).$$('[ng-click="editChild(row)"]').map(function(data){
			return data.getText();			
		});		
	});
}

CommonPage.prototype.getColumnInPanel = function(title,columnIndex){
	var self = this;
	return self.getPanelTitle().then(function(panel){
		for(var i = 0 ; i<panel.length ; i++ ) {
			if(panel[i].includes(title)){
				index = i;
			}
		}
	}).then(function(){
		return self.panels.get(index).all(by.repeater('row in entityData')).map(function(rows){
			return rows.all(by.repeater('field in formFields')).get(columnIndex).getText();
		})	
	});
}


CommonPage.prototype.getPanelIndex = function(title){
	var index;
	var self = this;
	return self.getPanelTitle().then(function(panel){
		for(var i = 0 ; i<panel.length ; i++ ) {
			if(panel[i] === title){
					index = i;
			}
		};
		return index;
	})
}


CommonPage.prototype.getPanel = function(title){
	var index;
	var self = this;
	return self.getPanelTitle().then(function(panel){
		for(var i = 0 ; i<panel.length ; i++ ) {
			if(panel[i].includes(title)){
				index = i;
			}
		}
	}).then(function(){
		return self.panels.get(index);
	})
}


CommonPage.prototype.isPresentInPanel = function(title,name,currentPage){
	var self = this;
	return self.getPanelIndex(title).then(function(index){
		return self.panels.get(index).element(by.xpath('.//a[.="'+name+'"]')).isPresent().then(function(isPres){
			if(isPres){
				self.panels.get(index).element(by.xpath('.//a[.="'+ 1 +'"]')).isPresent().then(function(isPres){
					if(isPres){
						self.panels.get(index).element(by.xpath('.//a[.="'+ 1 +'"]')).click();
					}
				})
				return true;
			}
			else{
				currentPage++;
				return self.panels.get(index).element(by.xpath('.//a[.="'+ currentPage +'"]')).isPresent().then(function(isPres){
					if(isPres){
						self.panels.get(index).element(by.xpath('.//a[.="'+ currentPage +'"]')).click();
						return self.isPresentInPanel(title,name,currentPage);
					}
					else{
						return false;
					}
				});
				browser.waitForAngular();
			}
		});
		browser.waitForAngular();
	})
}


CommonPage.prototype.actionToExecute = function(button,action){
	button.click().then(function(){
		element(by.xpath('.//*[.="'+action+'"]')).click();
	})
}


CommonPage.prototype.setImageAtIndex = function(value,index) {
	var absolutePath = require("path").resolve(__dirname, value);	
	var uploadInput = this.imageUploadInput.get(index);
	browser.executeScript('arguments[0].scrollIntoView(false)', uploadInput.getWebElement());
	browser.actions().mouseMove(uploadInput).perform();
	uploadInput.sendKeys(absolutePath);
	browser.executeScript("arguments[0].click();", this.imageUpload.get(index).getWebElement());
	//wait for uploading
	browser.sleep(25000);
	
}

CommonPage.prototype.uploadFromDiaglog = function(value) {
	var absolutePath = require("path").resolve(__dirname, value);		
	this.uploadButton.sendKeys(absolutePath);
	//wait for uploading
	browser.sleep(20000);	
}

CommonPage.prototype.getFileNameFromDirectory = function(folderPath) {
	var fs = require('fs');
    return fs.readdirSync(folderPath);
}

CommonPage.prototype.nbJSonDownloaded = function(){
	var glob = require("glob");
    var filesArray = glob.sync("test/Downloads/"+"*.json");
    return browser.driver.wait(function () {
        if (typeof filesArray !== 'undefined' && filesArray.length >= 0) {
            return filesArray;
        }
    }).then(function (filesArray) {
        return (filesArray.length+1);  
    })
}

CommonPage.prototype.nbfileDownloaded = function(fileExtension){
	var glob = require("glob");
    var filesArray = glob.sync("test/Downloads/*."+fileExtension);
    return browser.driver.wait(function () {
        if (typeof filesArray !== 'undefined' && filesArray.length >= 0) {
            return filesArray;
        }
    }).then(function (filesArray) {
        return (filesArray.length+1);  
    })
}

CommonPage.prototype.selectDateOnCalendar = function(index,dd,mm,yyyy) {
	var self = this;
	var month;
	yyyy = parseInt(yyyy,10);
	dd = parseInt(dd,10);
	mm = parseInt(mm,10);
	browser.executeScript("arguments[0].click();", self.calendar.get(index).getWebElement()).then(function(){
		browser.executeScript("arguments[0].click();", self.calendarHeader.getWebElement());
	});
	this.calendarHeader.getText().then(function(year){
		year = parseInt(year,10);
		if(year<yyyy){
			var duration = yyyy-year;
			for(var i=0;i<duration;i++){
				self.pullCalendarRight.click();
			};
		};
		if(year>yyyy){
			var duration = year-yyyy;
			for(var i=0;i<duration;i++){
				self.pullCalendarLeft.click();
			};
		};
		year=yyyy;
		if(year==yyyy){
			switch(mm){
				case 01: month = 'January'; break;
				case 02: month = 'February'; break;
				case 03: month = 'March'; break;
				case 04: month = 'April'; break;
				case 05: month = 'May'; break;
				case 06: month = 'June'; break;
				case 07: month = 'July'; break;
				case 08: month = 'August'; break;
				case 09: month = 'September'; break;
				case 10: month = 'October'; break;
				case 11: month = 'November'; break;
				case 12: month = 'December'; break;
			};
			self.monthButtons.each(function(monthElement){
				monthElement.getText().then(function(monthName){
					if(monthName==month){
						buttonToClick = monthElement;
					}
				})
			}).then(function(){
				buttonToClick.click();
			});
			var i =0;
			self.dateButtons.each(function(dateElement){
				dateElement.getText().then(function(dateName){
					if(dateName==dd){
						if(dd<20){
							if(i==0){
								buttonToClick = dateElement;
								i++;
							};
						}
						else{
							buttonToClick = dateElement;
						}
					}

				});
			}).then(function(){
				buttonToClick.click();
			});
		};
	})
}


CommonPage.prototype.getYesterdayDate = function(){
	var today = new Date();
	var yesterday = [];
	today.setDate(today.getDate() - 1);
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    yesterday[0]= dd;
    yesterday[1]= mm;
    yesterday[2]=yyyy;
   	return yesterday;
}

CommonPage.prototype.getTodayDate = function(){	
	var today = new Date();
	var todayArray =[];
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
   	todayArray[0]= dd;
    todayArray[1]= mm;
    todayArray[2]=yyyy;
   	return todayArray;
}

CommonPage.prototype.getTomorrowDate = function(){
	var today = new Date();
	var tomorrow =[];
	today.setDate(today.getDate() + 1);
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
   	tomorrow[0]= dd;
    tomorrow[1]= mm;
    tomorrow[2]=yyyy;
   	return tomorrow;
}


CommonPage.prototype.getOneMonthDate = function(){	
	var today = new Date();
	var nextMonth =[];
	today.setDate(today.getDate() + 31);
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
   	nextMonth[0]= dd;
    nextMonth[1]= mm;
    nextMonth[2]=yyyy;
   	return nextMonth;
}


CommonPage.prototype.clickElementInFormGroup = function(label,ele){
	this.formGroup.each(function(group){
		browser.executeScript('arguments[0].scrollIntoView(false)', group.getWebElement());
		browser.actions().mouseMove(group).perform();
		group.$('label').getText().then(function(groupLabel){
			if(groupLabel.includes(label)){
				groupToSelect = group;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", groupToSelect.$$('.selectize-input').get(0).getWebElement()).then(function(){
			if(ele=='first'){
				var elem = groupToSelect.all(by.repeater('option in $select.items')).first();
				// browser.actions().mouseMove(elem).perform();
				// elem.click();
				browser.executeScript("arguments[0].click();", elem.getWebElement());
			} else if(ele='last'){
				var elem = groupToSelect.all(by.repeater('option in $select.items')).last();
				// browser.actions().mouseMove(elem).perform();
				// elem.click();
				browser.executeScript("arguments[0].click();", elem.getWebElement());
			} else {
				var elem = groupToSelect.element(by.xpath(".//*[contains(text(),'"+ele+"')]"));
				// browser.actions().mouseMove(elem).perform();
				// elem.click();
				browser.executeScript("arguments[0].click();", elem.getWebElement());
			}
		})
		
	})
}

CommonPage.prototype.getElementInFormGroup = function(label){
	return this.formGroup.each(function(group){
		browser.executeScript('arguments[0].scrollIntoView(false)', group.getWebElement());
		browser.actions().mouseMove(group).perform();
		group.$('label').getText().then(function(groupLabel){
			if(groupLabel.includes(label)){
				groupToSelect = group;
			}
		})
	}).then(function(){
		return groupToSelect.$('.form-control-disabled').getText();
	})
}


CommonPage.prototype.checkboxIsAlreadyClicked = function(index) {
	return this.checkboxes.get(index).isSelected();
};

CommonPage.prototype.setCheckbox = function(value,index) {
	var self = this;
	if(value==true){
		this.checkboxIsAlreadyClicked(index).then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.checkboxes.get(index).click();
		})
	}
	else{
		this.checkboxIsAlreadyClicked(index).then(function(isAlreadySelected){
			if(isAlreadySelected)
				self.checkboxes.get(index).click();
		})
	}
};

CommonPage.prototype.checkboxType1IsAlreadyClicked = function(checkboxElement) {
	return checkboxElement.isSelected();
};

CommonPage.prototype.setCheckboxType1 = function(value,checkboxElement) {
	var self = this;
	if(value==true){
		this.checkboxType1IsAlreadyClicked(checkboxElement).then(function(isAlreadySelected){
			if(!isAlreadySelected)
				browser.executeScript("arguments[0].click();", checkboxElement.getWebElement());
		})
	}
	else{
		this.checkboxType1IsAlreadyClicked(checkboxElement).then(function(isAlreadySelected){
			if(isAlreadySelected)
				browser.executeScript("arguments[0].click();", checkboxElement.getWebElement());
		})
	}
};

CommonPage.prototype.moveElementTo = function(elem,target) {
	browser.executeScript('arguments[0].scrollIntoView(false)', elem.getWebElement());
	browser.actions().mouseMove(elem).
    mouseDown(elem).
    mouseMove(target).
    mouseUp(target).
    perform();
};



module.exports = CommonPage;