 var FormField = require("./component/FormField");
 var CommonPage = require("../common/CommonPage");
 var World = require("../framework/World");
 
 var FormBuilderPage = function(world) {
 	this.world = world;
 
 	this.form = {};
 	this.form.form_fields = [];
 };
 
 FormBuilderPage.prototype.get = function() {
 
 	//tables, dialog related
	this.form.contentBox = $('#dataTable');
	this.form.allTr = this.form.contentBox.all(by.repeater('form in forms'));
	this.form.deleteConfirmation = $('.modal-content');
	this.form.dialogBox = $('.modal-content');
	

	//buttons
	this.newButton = $('.btn__formbuilder__addNewEntity');
	this.saveFormButton = $('.btn__formbuilder__saveForm');
	this.saveDiaglogButton = $('.modal-footer').$('[ng-click="ok()"]');

	//layout
	this.form.buttonAddRelationToLayout = $('.btn-group');
	this.form.layoutName = element(by.model('layout.name'));
	this.form.layoutRessourceName = element(by.model('layout.system_name'));
	this.form.layoutToApply = element(by.model('manager.layoutId'));
	this.form.defaultLayout = $('#formDefaultLayout');
	this.form.referenceField = $('#formTitleField');
	this.form.menu = $('.content-actionbar');
	this.form.layoutButtonGroup = this.form.menu.$$('.btn-group').get(0);
	this.form.layoutButton = this.form.menu.$$('.btn').get(3);
	this.form.layoutTr = this.form.contentBox.all(by.repeater('layout in list.layouts'));
	

	//fields related
	this.form.label = element(by.model('form.form_name'));
	this.form.type = element(by.model('form.form_type'));
	this.form.addNewField = $('.btn__formbuilder__addNewField');
	this.form.selectNewFieldType = element(by.model("addField.newFieldType"));
	this.form.fieldUnit = $('#fieldUnit');
	this.form.fieldCurrency = $('#fieldCurrency');

	//panels
	this.form.relation = $('#relations');

	//settings
	this.readOnly = element(by.model("panel.readOnly"));
	this.hideCreateIcon = element(by.model("panel.blockAdd"));
	this.enableImport = element(by.model("panel.allowImport"));
	this.editable = element(by.model("field.editable_in_grid"));
	this.association = element.all(by.model("association.selected"));
	this.listFilter = element(by.model("form.list_filters"));

 };

// FormBuilderPage.prototype.loadDetail = function(entityName){
// 	entity = element.all(by.xpath("//*[contains(text(),'"+entityName+"')]")).get(0);
// 	var row = entity.element(by.xpath("../.."));
// 	var link = row.element(by.css('a'));

// 	browser.actions().mouseMove(link).perform();
// 	link.click();
// }
 
 
FormBuilderPage.prototype.loadDetail = function(entityName){
 	this.form.allTr.each(function(row){
 		row.element(by.css('a')).getText().then(function(entity){
 			if(entity ==entityName){
 				entityToClick = row;
 			}
 		})
 	}).then(function(){
 		var ele = entityToClick.element(by.css('a'));
 		browser.executeScript("arguments[0].click();", ele.getWebElement());
 	})
}


FormBuilderPage.prototype.loadLayout = function(entityName){
 	this.form.layoutTr.each(function(row){
 		row.element(by.css('a')).getText().then(function(entity){
 			if(entity ==entityName){
 				entityToClick = row;
 			}
 		})
 	}).then(function(){
 		var ele = entityToClick.element(by.css('a'));
 		browser.executeScript("arguments[0].click();", ele.getWebElement());
 	})
 	
}
 
FormBuilderPage.prototype.isPresentInList = function( name ) {
	
	var isPresent = false;

	return this.form.contentBox.all(by.xpath(".//a[contains(text(),'"+name+"')]")).each(function(entity){
		entity.getText().then(function(text){
			if(text==name){
				isPresent=true;
			}
		})
	}).then(function(){
		return isPresent;
	})
	
};


FormBuilderPage.prototype.clickOnDelete = function(elementName){
	var self = this;
	var entityToClick;
	 this.form.allTr.each(function(tr){
		tr.$$('td').get(1).getText().then(function(entityName){
			if(entityName==elementName){
				entityToClick=tr;
			}
		})
	}).then(function(){
		var button = entityToClick.$('.fa-remove');
		browser.executeScript("arguments[0].click();", button.getWebElement());
	});
}

FormBuilderPage.prototype.validationDelete = function() {
	var self = this
	var buttonConfirm = self.form.deleteConfirmation.$('.btn-danger');
	buttonConfirm.click();
}


FormBuilderPage.prototype.isRelationPresent = function(relation) {
	var isPresent = false;
	return this.form.relation.$$('tr').each(function(row){
		row.$('a').getText().then(function(txt){
			if(txt==relation){
				isPresent = true;
			}
		})
	}).then(function(){
		return isPresent;
	})
};


FormBuilderPage.prototype.deleteRelation = function(relation) {	
	var self = this;
	this.isRelationPresent(relation).then(function(isPres){
		if(isPres){
			self.form.relation.$$('tr').each(function(row){
				row.$('a').getText().then(function(relationName){
					if(relationName==relation){
						rowSelected = row;
					}
				})
			}).then(function(){
				browser.executeScript("arguments[0].click();", rowSelected.$('.fa-remove').getWebElement());
				self.validationDelete();
			})
		}
	})
};

FormBuilderPage.prototype.deleteLinkField = function() {	
	element.all(by.repeater('field in form.form_fields')).each(function(formField){
		formField.$('#fieldType').getAttribute('value').then(function(fieldType){
			if(fieldType=='string:linkedValue'){
				browser.executeScript("arguments[0].click();",formField.$('.fa-remove').getWebElement());
			}
		})
	})
};


FormBuilderPage.prototype.deleteForm = function(form) {
	var self = this;
	this.isPresentInList(form).then(function(isPres){
		if(isPres){
			self.clickOnDelete(form);
			self.validationDelete();
		}
	});
}

FormBuilderPage.prototype.checkAndDeleteForm = function(form) {
	var self = this;
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();

	this.isPresentInList(form).then(function(isPres){
		if(isPres){
			self.loadDetail(form);
			self.deleteLinkField();
			self.saveForm();
			commonPage.clickOnButton('Cancel');
			self.clickOnDelete(form);
			self.validationDelete();
		}
	})
}


FormBuilderPage.prototype.saveForm = function(){
	this.saveFormButton.click();
	browser.sleep(1000);
}

FormBuilderPage.prototype.createFormName = function(formLabel,formType) {
	browser.executeScript("arguments[0].click();", this.newButton.getWebElement());
	// this.newButton.click();
	this.form.label.sendKeys(formLabel);
	this.form.type.sendKeys(formType);
};


FormBuilderPage.prototype.addFormField = function(formFieldType,label,index,editable,editMode){
	if(typeof(editable)=='undefined'){
		editable = null;
	};
	if(typeof(editMode)=='undefined'){
		editMode = null;
	};
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var field = new FormField(index);
	field.setType(formFieldType);
	field.setTitle(label);
	field.setLongList(true);
	field.setShortList(true);
	field.setDetail(true);
	if(editable==true){
		field.setEditableMode(true);
	}
	if(editMode==true){
		field.setEditMode(true);
	}

	this.saveForm();
};


FormBuilderPage.prototype.addFileFormField = function(label){
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var field = new FormField(0);
	field.setType('File');
	field.setTitle(label);
	field.setDetail(true);
	this.saveForm();
};


FormBuilderPage.prototype.addImageFormField = function(label){
	var self = this;
	browser.executeScript("arguments[0].click();", element(by.model('addField.newFieldType')).getWebElement()).then(function(){
		var ele = element(by.xpath(".//option[contains(text(),'Image')]"));
		browser.actions().mouseMove(ele).perform();
		ele.click();
	})
	browser.executeScript("arguments[0].click();", self.form.addNewField.getWebElement());
	var field = new FormField(0);
	field.setTitle(label);
	field.setDetail(true);
	field.setCardView(true);
	this.saveForm();
};


FormBuilderPage.prototype.addNumericField = function(label,editable,cardView,unit,minValue,maxValue){
	if(typeof(editable)=='undefined'){
		editable = null;
	};
	if(typeof(cardView)=='undefined'){
		cardView = null;
	};
	if(typeof(unit)=='undefined'){
		unit = null;
	};
	if(typeof(minValue)=='undefined'){
		minValue = null;
	};
	if(typeof(maxValue)=='undefined'){
		maxValue = null;
	};
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var field = new FormField(0);
	field.setType('Numeric');
	field.setTitle(label);
	field.setLongList(true);
	field.setShortList(true);
	field.setDetail(true);
	if(editable==true){
		field.setEditableMode(true);
	}
	if(cardView==true){
		field.setCardView(true);
	}
	if(unit!=null){
		field.selectUnitField(unit);
	}
	if(minValue!=null){
		field.fillInField(field.min,minValue);
	}
	if(maxValue!=null){
		field.fillInField(field.max,maxValue);
	}
	this.saveForm();
};



FormBuilderPage.prototype.addLinkField = function(label,relation,reference,constraint){
	if(typeof(constraint)=='undefined'){
		constraint = null;
	};
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var field = new FormField(0);
	field.setType('Link');
	field.setTitle(label);
	field.setLongList(true);
	field.setShortList(true);
	field.setDetail(true);
	field.setEditMode(true);
	field.addLinkFieldReference(relation,reference);
	if(constraint != null){
		field.addLinkFieldConstraint(constraint);
	}
	this.saveForm();
};

FormBuilderPage.prototype.addTerminologyField = function(labelTitle,terminology) {
	var self = this;
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var flow = browser.controlFlow();
	flow.execute(function() {
		var field = new FormField(0);
		field.setType('Terminology');
		field.setTitle(labelTitle);
		field.setLongList(true);
		field.setShortList(true);
		field.setDetail(true);
		self.particulareFieldCase(0,terminology,true);
	});
	this.saveForm();
};


FormBuilderPage.prototype.addRadioDropdownFieldSample = function(type,labelTitle) {
	var self = this;
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var flow = browser.controlFlow();
	flow.execute(function() {
		var field = new FormField(0);
		field.setType(type);
		field.setTitle(labelTitle);
		field.setShortList(true);
		field.setDetail(true);
		field.setCardView(true);
		self.particulareFieldCase(0);
	});
	this.saveForm();
};

FormBuilderPage.prototype.addAutoIncrementField = function(labelTitle,delimeter,prefixType,prefix) {
	var self = this;
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var flow = browser.controlFlow();
	flow.execute(function() {
		var field = new FormField(0);
		field.setType('Autoincrement');
		field.setTitle(labelTitle);
		field.setLongList(true);
		field.setShortList(true);
		field.setDetail(true);
		field.setCardView(true);
	});
	browser.executeScript("arguments[0].click();", $('#fieldDelimiter').getWebElement()).then(function(){
		if(delimeter=='first'){
			var firstOption = $('#fieldDelimiter').$$('option').first();
			browser.actions().mouseMove(firstOption).perform();
			firstOption.click();
		} else if(delimeter=='last'){
			var lastOption = $('#fieldDelimiter').$$('option').last();
			browser.actions().mouseMove(lastOption).perform();
			lastOption.click();
		} else {
			var ele = element(by.xpath(".//option[contains(text(),'"+delimeter+"')]"));
			browser.actions().mouseMove(ele).perform();
			ele.click();
		}
	})

	if(prefixType=='none'){
		browser.executeScript("arguments[0].click();", $('[value="none"]').getWebElement());
	} else if(prefixType=='terminology'){
		browser.executeScript("arguments[0].click();", $('[value="terminology"]').getWebElement());
		if(prefix=='first'){
			browser.executeScript("arguments[0].click();", $('#fieldPrefixTerminology').getWebElement()).then(function(){
				var firstOption = $('#fieldPrefixTerminology').$$('option').first();
				browser.actions().mouseMove(firstOption).perform();
				firstOption.click();
			})
		} else if(prefix=='last'){
			browser.executeScript("arguments[0].click();", $('#fieldPrefixTerminology').getWebElement()).then(function(){		
				var lastOption = $('#fieldPrefixTerminology').$$('option').last();
				browser.actions().mouseMove(lastOption).perform();
				lastOption.click();
			})
		} else{
			var ele = element(by.xpath(".//option[contains(text(),'"+prefix+"')]"));
			browser.actions().mouseMove(ele).perform();
			ele.click();
		}
	} else if(prefixType=='string'){
		browser.executeScript("arguments[0].click();", $('[value="string"]').getWebElement());
		commonPage.fillInField($('#fieldStringPrefix'),prefix);
	}
	
	this.saveForm();
};


FormBuilderPage.prototype.addCurrencyField = function(labelTitle,currency) {
	var self = this;
	browser.executeScript("arguments[0].click();", this.form.addNewField.getWebElement());
	var flow = browser.controlFlow();
	flow.execute(function() {
		var field = new FormField(0);
		field.setType('Currency');
		field.setTitle(labelTitle);
		field.setLongList(true);
		field.setShortList(true);
		field.setDetail(true);
		field.setCardView(true);
	});
	browser.executeScript("arguments[0].click();", $('#fieldCurrency').getWebElement()).then(function(){
		if(currency=='first'){
			var firstOption = $('#fieldCurrency').$$('option').first();
			browser.actions().mouseMove(firstOption).perform();
			firstOption.click();
		} else if(currency=='last'){
			var lastOption = $('#fieldCurrency').$$('option').last();
			browser.actions().mouseMove(lastOption).perform();
			lastOption.click();
		} else{
			var ele = element(by.xpath(".//option[contains(text(),'"+currency+"')]"));
			browser.actions().mouseMove(ele).perform();
			ele.click();
		}
	})
	
	this.saveForm();
};



FormBuilderPage.prototype.selectOptionInField = function(field,valueAttribute) {
	var self = this;
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		self.selectOption(valueAttribute);
	})
	
};

FormBuilderPage.prototype.selectOption = function(valueAttribute){
	element.all(by.css('option')).each(function(opt){
		opt.getAttribute('value').then(function(value){
			if(value.includes(valueAttribute)){
				optionToClick = opt;
			}
		})
	}).then(function(){
		browser.actions().mouseMove(optionToClick).perform();
		optionToClick.click();
		// browser.executeScript("arguments[0].click();", optionToClick.getWebElement());
	})
};


FormBuilderPage.prototype.selectItemInFormgroup = function(label,item) {
	var self = this;
	$$('.form-group').each(function(group){
		group.$('label').getText().then(function(name){
			if(name.includes(label)){
				groupSelected = group;
			}
		})
	}).then(function(){
		var field = groupSelected.$('.selectize-input');
		browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
			var ele = $('.optgroup').element(by.xpath(".//*[contains(text(),'"+item+"')]"));
			browser.executeScript("arguments[0].click();", ele.getWebElement())
		});
	})
};


FormBuilderPage.prototype.editForm = function(formLabel, formType) {
	
	var label = this.form.label;

	browser.executeScript("arguments[0].click();", label.getWebElement());
	this.form.label.clear();
	this.form.label.sendKeys(formLabel);

	var type = this.form.type;
	
	browser.executeScript("arguments[0].click();", type.getWebElement());
	this.form.type.clear();
	this.form.type.sendKeys(formType);
	
	this.saveForm();
};


FormBuilderPage.prototype.fieldUnitContains = function(unitName){
	return this.form.fieldUnit.element(by.xpath(".//option[contains(text(),'"+unitName+"')]")).isPresent();
	
}


FormBuilderPage.prototype.fieldCurrencyContains = function(currencyName){
	return this.form.fieldCurrency.element(by.xpath(".//option[contains(text(),'"+currencyName+"')]")).isPresent();
}


FormBuilderPage.prototype.clickOnAddRelation = function(){
	var panelToClick;
	$$('.box-header').each(function(panel){
		panel.$('h4').getText().then(function(name){
			if(name.includes('Relations')){
				panelToClick = panel;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", panelToClick.$('.fa-plus').getWebElement());
	})
}

FormBuilderPage.prototype.createRelation = function(source,relationType,target,resourceName,relationLabel,min,max){
	if(typeof(min)=='undefined'){
		min = null;
	};
	if(typeof(max)=='undefined'){
		max = null;
	};
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	this.clickOnAddRelation();
	commonPage.selectItemInField($('#source_id'),'option',source);
	commonPage.selectItemInField($('#relation_type'),'option',relationType);
	commonPage.selectItemInField($('#target_id'),'option',target);		
	commonPage.fillInField($('#system_name'),resourceName);
	commonPage.fillInField($('#relation_label'),relationLabel);
	if(min != null){
		commonPage.fillInField($('#min'),min);
	}
	if(max != null){
		commonPage.fillInField($('#max'),max);
	}
	if(relationType=='Parent-Child'){
		browser.executeScript("arguments[0].click();", $('#deleteChildren').getWebElement());
		browser.executeScript("arguments[0].click();", $('#inheritAcl').getWebElement());
	}
	this.saveDialog();
}

FormBuilderPage.prototype.saveDialog = function(){
	browser.executeScript("arguments[0].click();", this.saveDiaglogButton.getWebElement());
	browser.sleep(1500);
}



FormBuilderPage.prototype.getElementsInPanel = function(panel){
	return panel.$$('a').map(function(rows){
		return rows.getText();
	});
}


FormBuilderPage.prototype.selectElementsInPanel = function(panel,ele){
	var index;
	var self = this;
	this.getElementsInPanel(panel).then(function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i].includes(ele)){
				index= i;
			}
		}
	}).then(function(){
		var eleToClick = panel.$$('a').get(index);
		browser.executeScript('arguments[0].scrollIntoView(false)', eleToClick.getWebElement());
		browser.actions().mouseMove(eleToClick).perform().then(function(){
			eleToClick.click();
		});
	})
}


FormBuilderPage.prototype.fillInField = function(field,content){
	field.click().then(function(){
		field.clear();
		field.sendKeys(content);
	});
}


FormBuilderPage.prototype.isLayoutPresent = function(layoutName) {
	var isPresent = false;
	return this.form.layoutTr.each(function(row){
		row.$('a').getText().then(function(txt){
			if(txt==layoutName){
				isPresent = true;
			}
		})
	}).then(function(){
		return isPresent;
	})
};


FormBuilderPage.prototype.openNewLayoutOrEditLayout = function(layoutName,resourceName){
	var self = this;
	browser.executeScript("arguments[0].click();", this.form.layoutButton.getWebElement());
	browser.executeScript("arguments[0].click();", this.form.layoutButtonGroup.$$('.pointer').get(0).getWebElement());
	this.isLayoutPresent(layoutName).then(function(isPres){
		if(isPres){
			self.form.layoutTr.each(function(row){
				row.$('a').getText().then(function(txt){
					if(txt==layoutName){
						rowSelected = row;
					}
				})
			}).then(function(){
				// rowSelected.$('a').click();
				browser.executeScript("arguments[0].click();", rowSelected.$('a').getWebElement());
			})
			element.all(by.model('layout.column2.panels')).each(function(gridListWidget){
				gridListWidget.$('.fa-remove').isPresent().then(function(isPres){
					if(isPres){
						browser.executeScript("arguments[0].click();", gridListWidget.$('.fa-remove').getWebElement());
					}
				})
			})				
		} else{
			browser.executeScript("arguments[0].click();", self.form.menu.$('.btn').getWebElement());
		}
	});
	this.setTitleToLayout(layoutName,resourceName);
}


FormBuilderPage.prototype.openExistingLayout = function(layout){
	this.form.layoutButton.click();
	this.form.layoutButtonGroup.$$('.pointer').get(0).click();
	this.loadLayout(layout);
}

FormBuilderPage.prototype.getRelationInWidget  = function(type){
	
	var link = $$('.box-primary').get(0).$('.fa-plus');
	browser.executeScript("arguments[0].click();", link.getWebElement());
	$$('.box-primary').get(0).$$('li').each(function(row){
		row.getText().then(function(typeName){
			if(typeName==type){
				rowToClick = row;
			}
		})
	}).then(function(){
		rowToClick.click();
	});
	this.form.dialogBox.$('#relationId').click();
	return $('#relationId').$$('option').map(function(option){
		return option.getText();
	})
}


FormBuilderPage.prototype.setTitleToLayout  = function(layoutName,resourceName){
	var self = this;
	self.form.layoutName.click().then(function(){
		self.form.layoutName.clear();
		self.form.layoutName.sendKeys(layoutName);
	});
	self.form.layoutRessourceName.click().then(function(){
		self.form.layoutRessourceName.clear();
		self.form.layoutRessourceName.sendKeys(resourceName);
	})
}


FormBuilderPage.prototype.addGridListWidget  = function(panelName,relationName,widgetType){
	var self = this;
	var link = $$('.box-primary').get(0).$('.fa-plus');
	browser.executeScript("arguments[0].click();", link.getWebElement());
	$$('.box-primary').get(0).$$('li').each(function(row){
		row.getText().then(function(typeName){
			if(typeName=='Related entities as grid/list'){
				rowToClick = row;
			}
		})
	}).then(function(){
		rowToClick.click();
	})
	
	self.form.dialogBox.$('#panelName').sendKeys(panelName);
	// self.form.dialogBox.$('#relationId').click();
	var relationField = self.form.dialogBox.$('#relationId');
	browser.executeScript("arguments[0].click();", relationField.getWebElement()).then(function(){
		var ele = self.form.dialogBox.$('#relationId').element(by.xpath('.//*[.="'+relationName+'"]'));
		browser.actions().mouseMove(ele).perform();
		ele.click();
	})
	browser.executeScript("arguments[0].click();", self.form.dialogBox.$('#showAs').getWebElement());
	if(widgetType=='Grid'){
		self.form.dialogBox.$('#showAs').$$('option').get(1).click();
	} else if(widgetType=='List'){
		self.form.dialogBox.$('#showAs').$$('option').get(2).click();
	}
	this.saveDialog();
}



FormBuilderPage.prototype.addDistantNodeSample  = function(panelName,relation,subRelation){
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	var self = this;
	var link = $$('.box-primary').get(0).$('.fa-plus');
	browser.executeScript("arguments[0].click();", link.getWebElement());
	$$('.box-primary').get(0).$$('li').each(function(row){
		row.getText().then(function(typeName){
			if(typeName=='Distant node'){
				rowToClick = row;
			}
		})
	}).then(function(){
		rowToClick.click();
	})
	
	self.form.dialogBox.$('#panelName').sendKeys(panelName);
	var distantIcon = self.form.dialogBox.$('.fa-sitemap');
	browser.executeScript("arguments[0].click();", distantIcon.getWebElement()).then(function(){
		$$('li').each(function(row){
			row.getText().then(function(txt){
				if(txt.includes(relation)){
					rowSelected = row;
				}
			})
		}).then(function(){
			rowSelected.$('.tree-branch-head').click();
		})
		commonPage.selectItem($('.modal-content'),'span',subRelation);
	})
	this.saveDialog();
}

FormBuilderPage.prototype.addImageGallery  = function(panelName){
	var self = this;
	var link = $$('.box-primary').get(0).$('.fa-plus');
	browser.executeScript("arguments[0].click();", link.getWebElement());
	$$('.box-primary').get(0).$$('li').each(function(row){
		row.getText().then(function(typeName){
			if(typeName=='Image gallery'){
				rowToClick = row;
			}
		})
	}).then(function(){
		rowToClick.click();
	})
	
	self.form.dialogBox.$('#panelName').sendKeys(panelName);
	browser.executeScript("arguments[0].click();", element(by.model('field.selected')).getWebElement());
	this.saveDialog();
}

// FormBuilderPage.prototype.addGridList  = function(panelName,relationName,widgetType){
// 	var self = this;
// 	var link = $$('.box-primary').get(0).$('.fa-plus');
// 	browser.executeScript("arguments[0].click();", link.getWebElement());
// 	$$('.box-primary').get(0).$$('li').each(function(row){
// 		row.getText().then(function(typeName){
// 			if(typeName=='Related entities as grid/list'){
// 				rowToClick = row;
// 			}
// 		})
// 	}).then(function(){
// 		rowToClick.click();
// 	})
// 	self.form.dialogBox.$('#panelName').sendKeys(panelName);
// 	var relationField = self.form.dialogBox.$('#relationId');
// 	browser.executeScript("arguments[0].click();", relationField.getWebElement()).then(function(){
// 		self.form.dialogBox.$('#relationId').$$('option').each(function(option){
// 			option.getAttribute('label').then(function(label){
// 				if(label==relationName){
// 					optionSelected = option;
// 				}
// 			})
// 		}).then(function(){
// 			browser.actions().mouseMove(optionSelected).perform();
// 			optionSelected.click();
// 		})
// 	})
// 	browser.executeScript("arguments[0].click();", self.form.dialogBox.$('#showAs').getWebElement());
// 	if(widgetType=='Grid'){
// 		self.form.dialogBox.$('#showAs').$$('option').get(1).click();
// 	} else if(widgetType=='List'){
// 		self.form.dialogBox.$('#showAs').$$('option').get(2).click();
// 	}
	
// 	this.saveDialog();
// }


FormBuilderPage.prototype.linkToLayout = function(layoutName){
	var self = this;
	var defaultLayoutField = this.form.defaultLayout.$('.selectize-input');
	browser.executeScript("arguments[0].click();", defaultLayoutField.getWebElement()).then(function(){
		element.all(by.repeater('layout in $select.items')).each(function(row){
			row.getText().then(function(layout){
				if(layout==layoutName){
					rowSelected = row;
				}
			})
		}).then(function(){
			browser.actions().mouseMove(rowSelected).perform();
			rowSelected.click();
		})
	})
}

FormBuilderPage.prototype.referenceField = function(fieldName){
	var self = this;
	var referenceField = this.form.referenceField.$('.selectize-input');
	browser.executeScript("arguments[0].click();", referenceField.getWebElement()).then(function(){
		element.all(by.repeater('field in $select.items')).each(function(row){
			row.getText().then(function(field){
				if(field==fieldName){
					rowSelected = row;
				}
			})
		}).then(function(){
			browser.actions().mouseMove(rowSelected).perform();
			rowSelected.click();
		})
	})
}



FormBuilderPage.prototype.openLayoutManager = function(){
	this.form.layoutButton.click();
	this.form.layoutButtonGroup.$$('.pointer').get(1).click();
}


FormBuilderPage.prototype.clickOnDeleteLayout = function(elementName){
	var self = this;
	var entityToClick;
	
	 this.form.layoutTr.each(function(tr){
		tr.$('a').getText().then(function(entityName){
			if(entityName==elementName){
				entityToClick=tr;
			}
		})
	}).then(function(){
		var button = entityToClick.$('.btn-danger');
		browser.executeScript("arguments[0].click();", button.getWebElement());
		self.validationDelete();
	});
}


FormBuilderPage.prototype.particulareFieldCase = function(index,value,bool){
	if(typeof(value)=='undefined'){
		value = null;
	};
	if(typeof(bool)=='undefined'){
		bool = null;
	};
	var field = new FormField(index);
	field.fieldType.getAttribute('value').then(function (selectValue) {
		selectValue=selectValue.split(":")[1];
		switch(selectValue) {
		    case "terminology":
		    	field.setMultiSelect(bool);
		    	field.setFacet(bool);
		    	field.setCardView(bool);
		    	field.setEditableMode(bool);
		    	field.setTerminology(value);
		        break;
		    case "linkedValue":
		    	field.setFieldKey(value);
		    	break;
		    case "currency":
		    	field.setCurrency("EUR");
		    	break;
		    case "radio":
		    case "dropdown":
		    	field.addOption("option1");
		    	field.addOption("option2");
		    	break;
		    default:
		    	break;
		}
	});
}


FormBuilderPage.prototype.setFieldValue = function(index, value) {
	var field = new FormField(index);
	browser.executeScript('arguments[0].scrollIntoView(false)', field.getDetailWebelement().getWebElement());
	field.setTitle(value);
	field.longListIsPresent().then(function(result){
		if(result)
			field.setLongList(true);
	});	
	field.shortListIsPresent().then(function(result){
		if(result)
			field.setShortList(true);
	});
	field.setDetail(true);
};


FormBuilderPage.prototype.addTextFieldToPanel = function(){
	var boxPanel = $(".cells");
	var cell = $$(".cell");
	
	var boxAvailableField = $$(".box").get(1);

	cell.each(function(cellFilled){
	   var field = boxAvailableField.all(by.repeater("field in fields")).get(0).$("div");
	   field.isPresent().then(function(isPres){
		   	if(isPres){
		   		browser.executeScript('arguments[0].scrollIntoView(false)', field.getWebElement());
		   	    browser.actions().mouseMove(field).
		        mouseDown(field).
		        mouseMove(cellFilled).
		        mouseUp(cellFilled).
		        perform();
		   	}
	   })
	   
	})	
}

FormBuilderPage.prototype.addPanel = function(){
	var self = this;
	var link = $$('.box-primary').get(0).$('.fa-plus');
	browser.executeScript("arguments[0].click();", link.getWebElement());
	$$('.box-primary').get(0).$$('li').each(function(row){
		row.getText().then(function(typeName){
			if(typeName=='Panel'){
				rowToClick = row;
			}
		})
	}).then(function(){
		rowToClick.click();
	})
}
 

FormBuilderPage.prototype.readOnlyIsAlreadyClicked = function() {
	return this.readOnly.isSelected();
};

FormBuilderPage.prototype.hideCreateIconIsAlreadyClicked = function() {
	return this.hideCreateIcon.isSelected();
};

FormBuilderPage.prototype.editableInGridIsAlreadyClicked = function() {
	return this.editable.isSelected();
};

FormBuilderPage.prototype.associationIsAlreadyClicked = function(index) {
	return this.association.get(index).isSelected();
};
 
FormBuilderPage.prototype.setReadOnly = function(value) {
	var self = this;
	if(value==true){
		this.readOnlyIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				self.readOnly.click();
			}
				
		})
	}
	else{
		this.readOnlyIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected){
				self.readOnly.click();
			}
		})
	}
	
};

FormBuilderPage.prototype.setHideCreateIcon = function(value) {
	var self = this;
	if(value==true){
		this.hideCreateIconIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.hideCreateIcon.click();
		})
	}
	else{
		this.hideCreateIconIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected)
				self.hideCreateIcon.click();
		})
	}
	
};

FormBuilderPage.prototype.setEditableInGrid = function(value) {
	var self = this;
	if(value==true){
		this.editableInGridIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.editable.click();
		})
	}
	else{
		this.editableInGridIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected)
				self.editable.click();
		})
	}
	
};

FormBuilderPage.prototype.setAssociation = function(index,value) {
	var self = this;
	if(value==true){
		this.associationIsAlreadyClicked(index).then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.association.click();
		})
	}
	else{
		this.associationIsAlreadyClicked(index).then(function(isAlreadySelected){
			if(isAlreadySelected)
				self.association.click();
		})
	}
	
};



 
 
 module.exports = FormBuilderPage;