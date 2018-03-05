

var ImportPage = function(world) {
	this.world = world;

	this.import = {};

};


ImportPage.prototype.get = function() {
	this.tableList = $('#viewTable');
	this.targetEntity = $('#targetEntity');
	this.importType =$('#importType');
	this.sourceFile = $('[ng-click="openFile(import.fileInfo)"]');
	this.reportInfo = $('[ng-if="helper.status == \'DONE\'"]');
	this.resultBox = $('.boxed');
	this.resultStatus = $('.text-success');
	this.showHideSection = $('[ng-click="showHideSection(\'mapping\');"]');
	this.showList = $('.fa-bars');
	this.showMore = $('[ng-click="changeLimitTo(\'more\', \'created\')"]');
	this.showLess = $('[ng-click="changeLimitTo(\'reset\', \'created\')"]');
};


module.exports = ImportPage;