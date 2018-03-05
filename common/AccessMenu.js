var AccessMenu = function() {
	this.menu = element(by.css(".content-actionbar"));
	this.popup = element(by.css(".modal-content"));
	this.activityButton = this.menu.all(by.css(".btn-info")).get(0);
	this.activityButtonArrow = this.menu.all(by.css(".dropdown-toggle")).get(1);
	this.activityButtonGroup = this.menu.all(by.css(".btn-group ")).get(1);
	this.activityButtonArrowDropDown = this.activityButtonGroup.element(by.css(".dropdown-menu"));
	this.userOrRoleSearch = this.popup.element(by.model("$select.search"));
	

	this.popupAddButton= this.popup.element(by.css(".btn-primary"));
	this.popupCloseButton = this.popup.element(by.css(".btn-default"));
	
    
};

AccessMenu.prototype.addARole = function(roleName,read,write,delet,admin) {
	
	
	this.clickOnAccessControlList();
	var roleUserRow;
	var self=this;

	this.rightContainsRole(roleName).then(function(contains){
		if(!contains){
			self.addARoleToRight(roleName);
		}
	}).then(function(){
		self.popup.all(by.css(".text-left")).each(function(td){
			td.getText().then(function(text){
				if(text==roleName){
					roleUserRow=td.element(by.xpath(".."));
					roleUserRow.all(by.css(".iCheck-helper")).then(function(allCheckBox){
						if(read)
							allCheckBox[0].click();
						if(write)
							allCheckBox[1].click();
						if(delet)
							allCheckBox[2].click();
						if(admin)
							allCheckBox[3].click();
					});
				}
			});
		}).then(function(){
		
			self.popupCloseButton.click();
			
		})
		
	})
};


AccessMenu.prototype.clickOnAccessControlList = function() {
	this.activityButtonArrow.click();
	
	this.activityButtonArrowDropDown.all(by.css(".pointer")).then(function(allPointer){
		allPointer[0].click();
	})
}


AccessMenu.prototype.rightContainsRole = function(roleName){
	return element(by.xpath("//*[contains(text(),'"+roleName+"')]")).isPresent();
}

AccessMenu.prototype.addARoleToRight = function(roleName){
	this.popup.element(by.css(".ui-select-search")).sendKeys(roleName);
	this.popup.all(by.css(".ui-select-choices-row-inner")).get(0).click();
	this.popupAddButton.click();
}




module.exports = AccessMenu;