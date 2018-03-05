var AdministrationPage = function(world) {
	this.world = world;
	this.administration = {};
};

AdministrationPage.prototype.get = function() {	
	url = this.world.defaultBase() + "#!/administration";
	browser.get(url);
	this.saveForm = element(by.css(".btn-primary"));
};

module.exports = AdministrationPage;