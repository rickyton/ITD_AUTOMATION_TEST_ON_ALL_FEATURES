var CommonPage = require("../common/CommonPage");
var World = require("../framework/World");

var ReportPage = function(world) {
	this.world = world;
	this.report = {};
};

ReportPage.prototype.get = function() {

	//buttons
	this.button = $$('.btn');
	this.newButton = $$('.btn-primary').get(0);
	this.modeButton = $('.toggle');
	this.confirmButton = $('[ng-click="confirmChanges()"]');
		
	//toggles
	this.showHideButton = $('.fa-caret-down');
	
	//fields and sections
	this.sourceField = $('#entityType');
	this.viewField = $('.selectize-input');

	this.fieldRemove = $$('[ng-click="removeField($index)"]');
	this.filterRemove = $$('[ng-click="removeAllFilter(filter.reference, $index)"]');
	this.groupingRemove = $$('[ng-click="removeGrouping($index)"]');
	this.havingRemove = $$('[ng-click="removeHaving($index)"]');
	
	this.reportSection = $$('.report-section');
	this.columnSection = $$('.report-section-row').get(0);

	this.filterLines = element.all(by.repeater('filter in report.data.filters'));
	this.havingLines = element.all(by.repeater('having in report.data.having'));
	this.filterOperatorField = this.filterLines.last().$$('.input-inline').get(0);
	this.filterContentField = this.filterLines.last().$$('.input-inline').get(1);
	this.filterContentField1 = this.filterLines.last().$$('.input-inline').get(2);
	this.havingOperatorField = this.havingLines.last().$$('.input-inline').get(0);
	this.havingContentField = this.havingLines.last().$$('.input-inline').get(1);
	this.havingContentField1 = this.havingLines.last().$$('.input-inline').get(2);
	
	this.fieldData = element.all(by.repeater('field in report.data.fields'));

	//tables
	this.table = $('.table-responsive');
	this.rows = element.all(by.repeater('row in data.value'));
	this.tableData = this.rows.$$('td');

	//dropdown
	this.dropdown = $('.ui-select-dropdown');
	this.options = element.all(by.repeater('option in $select.items'));

	//graph
	this.graph = $('#chartDisplay');

	//checkBox
	this.distinct = element(by.model('data.distinct'));
	this.percentage = element(by.model('data.percentage'));


};

ReportPage.prototype.source = function(entity){
	this.newButton.click();
	this.selectItemType1('option',entity);
	browser.sleep(1000);
}

ReportPage.prototype.clickModeButton = function(){
	browser.executeScript("arguments[0].click();", this.modeButton.getWebElement());
}


ReportPage.prototype.sourceAndView = function(entity,view){
	var self = this;
	this.source(entity);
	this.clickModeButton();
	this.viewField.click().then(function(){
		var ele = self.dropdown.element(by.cssContainingText('span',view));
		browser.executeScript("arguments[0].click();", ele.getWebElement());
	})
}


ReportPage.prototype.selectItem = function(field,type,item){
	var ele = field.element(by.cssContainingText(type,item));
	browser.actions().mouseMove(ele).perform();
	ele.click();
}

ReportPage.prototype.selectItemInItem = function(field,type,item,fatherItem){
	
	if(fatherItem==='undefined'){		
		fatherItem = null;
	};
	if(fatherItem!='null'){		
		this.selectItem(field,type,fatherItem);
	};
	this.selectItem(field,type,item);
}

ReportPage.prototype.selectItemType1 = function(type,item){
	var ele = element(by.xpath('//'+type+'[.="'+item+'"]'));
	browser.actions().mouseMove(ele).perform();
	ele.click();
}


ReportPage.prototype.selectItemInField = function(field,type,item){
	var self = this;
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		self.selectItem(field,type,item);
	})
}

ReportPage.prototype.selectItemInFieldType1 = function(field,type,item){
	var self = this;
	browser.executeScript("arguments[0].click();", field.getWebElement()).then(function(){
		self.selectItemType1(type,item);
	})
}

ReportPage.prototype.addItem = function(section,index){
	this.reportSection.each(function(rs){
		rs.$('span').getText().then(function(legend){
			if(legend.includes(section)){
				sectionSelected = rs;
			}
		})
	}).then(function(){
		browser.executeScript("arguments[0].click();", sectionSelected.$$('.fa-plus').get(index).getWebElement());
	})
}

ReportPage.prototype.showHideReport = function(){
	var showHideButton = this.showHideButton;
	browser.executeScript('arguments[0].scrollIntoView(false)',showHideButton.getWebElement());
	browser.actions().mouseMove(showHideButton).perform();
	browser.executeScript("arguments[0].click();", showHideButton.getWebElement());
}

ReportPage.prototype.listSearch = function(field,repeater,type,item){
	browser.executeScript('arguments[0].scrollIntoView(false)',field.getWebElement());
	browser.actions().mouseMove(field).perform();
	field.click().then(function(){
		repeater.each(function(line){
			line.$(type).getText().then(function(text){
				if(text==item){
					lineToSelect = line;
				}
			})
		}).then(function(){
			browser.executeScript("arguments[0].click();", lineToSelect.getWebElement());
		})
	});
}


ReportPage.prototype.criteria = function(operatorField,op,contentField,content,contentField1,content1){
	var self = this;
	if(content1==='undefined'){
		content1 = content;
	}

	else if(content==='undefined' && content1==='undefined'){
		content = null;
		content1 = null;
	}

	if(contentField1==='undefined'){
		contentField1 = null;
	}

	else if(contentField==='undefined' && contentField1==='undefined'){
		contentField = null;
		contentField1 = null;
	}

	this.operator(operatorField,op);

	if(contentField!=null){
		browser.actions().mouseMove(contentField).perform();
		contentField.click().then(function(){
			contentField.clear();
			contentField.sendKeys(content);
		})
	}
	

	if(contentField1!=null){
		contentField1.click().then(function(){
			contentField1.clear();
			contentField1.sendKeys(content1);
		})
	}
	
}


ReportPage.prototype.operator = function(operatorField,op){
	browser.executeScript('arguments[0].scrollIntoView(false)', operatorField.getWebElement());
	browser.actions().mouseMove(operatorField).perform();
	operatorField.click();
	element.all(by.xpath('//option[.="'+op+'"]')).last().click();
}


ReportPage.prototype.selectColumn = function(aggregate,field,type,item,fatherItem){
	
	if(aggregate!=null||aggregate!=''||aggregate!='no'){
		this.selectItemInField($('#aggregate'),'option',aggregate);
	};
	this.selectItemInItem(field,type,item,fatherItem);
}

ReportPage.prototype.setcheckBox = function(model,bool){
	if(bool==true){
		model.isSelected().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				browser.executeScript("arguments[0].click();", model.getWebElement());
			}	
		})
	}
	else {
		model.isSelected().then(function(isAlreadySelected){
			if(isAlreadySelected){
				browser.executeScript("arguments[0].click();", model.getWebElement());
			}	
		})
	};
					
};

ReportPage.prototype.addAggregateToColumn = function(columnArray,column,aggregate,model1,percentage,model,distant){
	var index;
	var self = this;
	if(model=='undefined'){
		model = null;
	}
	if(model1=='undefined'){
		model1 = null;
	}
	if(distant=='undefined'){
		distant = null;
	}
	if(percentage=='undefined'){
		percentage = null;
	}
	for(var i=0;i<columnArray.length;i++){
		if(columnArray[i]==column){
			index = i;
		}
	};
	var addAggregate = this.columnSection.$$('[ng-click="editColumn(field)"]').get(index);
	browser.executeScript("arguments[0].click();", addAggregate.getWebElement()).then(function(){
		self.selectItemInField($('#aggregate'),'option',aggregate);
		if(model!=null && distant!=null){
			browser.sleep(1000);
			self.setcheckBox(model,distant);
		}
		if(model1!=null && percentage!=null){
			browser.sleep(1000);
			self.setcheckBox(model1,percentage);
		};
		self.clickOnButton('OK');
	})
	
}


ReportPage.prototype.selectFilterProperty = function(aggregate,relation,filter,operatorField,op,contentField,content,contentField1,content1){

	this.selectFilterPropertyWOOperator (aggregate,relation,filter);	
	this.criteria(operatorField,op,contentField,content,contentField1,content1);

}

ReportPage.prototype.selectDateProperty = function(aggregate,relation,filter,operatorField,op,index1,dd1,mm1,yyyy1,index2,dd2,mm2,yyyy2){

	this.selectFilterPropertyWOOperator (aggregate,relation,filter);	
	this.selectDate(operatorField,op,index1,dd1,mm1,yyyy1,index2,dd2,mm2,yyyy2);

}


ReportPage.prototype.selectFilterPropertyWOOperator = function(aggregate,relation,filter){

	this.addItem('Filters',0);	
	if(aggregate!=null||aggregate!=''||aggregate!='no'){
		this.selectItemInField($('#aggregate'),'option',aggregate);
	};	
	if(relation!=null||relation!=''||relation!='no'){
		this.selectItem($('.modal-content'),'span',relation);
	};
	this.selectItem($('.modal-content'),'span',filter);
	this.clickOnButton('OK');	
}


ReportPage.prototype.selectDate = function(operatorField,op,index1,dd1,mm1,yyyy1,index2,dd2,mm2,yyyy2){

	if(index2=='undefined' && dd2=='undefined' && mm2=='undefined' && yyyy2=='undefined'){
		index2 = dd2 = mm2 = yyyy2 = null;
	};
	this.operator(operatorField,op);

	//commonPage	
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	commonPage.selectDateOnCalendar(index1,dd1,mm1,yyyy1);
	commonPage.calendar.get(index2).isPresent().then(function(isPres){
		if(isPres){
			commonPage.selectDateOnCalendar(index2,dd2,mm2,yyyy2);
		}
	})
}

ReportPage.prototype.groupOrHavingOrSort= function(type,repeat,item){
	// var ele = this.columnSection.$$('[ng-click="editColumn(field)"]').get(index);
	browser.executeScript("arguments[0].click();", type.getWebElement());
	this.selectItemInRange(repeat,item);
	browser.executeScript("arguments[0].click();", this.confirmButton.getWebElement());

}


ReportPage.prototype.clickOnButton = function(label){
	this.button.each(function(btn){
		btn.getText().then(function(buttonLabel){
			if(buttonLabel==label){
				buttonToCLick = btn;
			}
		})
	}).then(function(){
		// browser.actions().mouseMove(buttonToCLick).perform();
		// buttonToCLick.click();
		browser.executeScript("arguments[0].click();", buttonToCLick.getWebElement());
	})
}


ReportPage.prototype.selectItemInRange = function(repeat,item){
	repeat.each(function(it){
		it.getText().then(function(label){
			if(label.includes(item)){
				itemToClick = it;
			}
		})
	}).then(function(){
		// browser.actions().mouseMove(itemToClick).perform();
		// itemToClick.click();
		browser.executeScript("arguments[0].click();", itemToClick.getWebElement());
	})
}


ReportPage.prototype.getHeader = function(){
	var header = this.table.$$('th');
	return header.map(function(name){
		return name.getText();
	});
}



ReportPage.prototype.getColumn =function(column){
	var self = this;
	return this.getHeader().then(function(headerTable){
		for(var i = 0 ; i<headerTable.length ; i++ ) {
			if(headerTable[i] === column){
					index = i;
			}
		}
	}).then(function(){
		return self.rows.map(function(rows){
			return rows.$$('td').get(index).getText();
		});
	});
}


ReportPage.prototype.isCapitalizeFirstLetter = function(str){
	if(str.charAt(0)=== str.charAt(0).toUpperCase()){
		return true;
	}
	return false;
}


ReportPage.prototype.isSortMonth = function(monthArray,bool){
	var monthArr =[];
	for(var i=0;i<monthArray.length;i++){
		if(monthArray[i]!=0 && monthArray[i]!= 'undefined' && monthArray[i]!=''){
			if(monthArray[i]=='January'){monthArr[i]=1;}
			else if(monthArray[i]=='February'){monthArr[i]=2;}
			else if(monthArray[i]=='March'){monthArr[i]=3;}
			else if(monthArray[i]=='April'){monthArr[i]=4;}
			else if(monthArray[i]=='May'){monthArr[i]=5;}
			else if(monthArray[i]=='June'){monthArr[i]=6;}
			else if(monthArray[i]=='July'){monthArr[i]=7;}
			else if(monthArray[i]=='August'){monthArr[i]=8;}
			else if(monthArray[i]=='September'){monthArr[i]=9;}
			else if(monthArray[i]=='October'){monthArr[i]=10;}
			else if(monthArray[i]=='November'){monthArr[i]=11;}
			else if(monthArray[i]=='December'){monthArr[i]=12;}
		}
	}
	for(var i=0;i<monthArr.length-1;i++){
		if(bool==true){
			if(monthArr[i]>monthArr[i+1]){
				return false;
			}
			else{
				return true;
			}
		}
		else{
			if(monthArr[i]<monthArr[i+1]){
				return false;
			}
			else{
				return true;
			}
		}
	}
	
}




module.exports = ReportPage;
