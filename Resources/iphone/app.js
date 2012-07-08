/**
 * 
 * The test cases demonstrating the usage of code snippets
 * 
 */

var mainWnd = Titanium.UI.createWindow({  
    title: 'window title',
    backgroundColor:'#fff'
});


/*
 * DatePicker
 */
var datePickerTestBtn = Titanium.UI.createButton({
	title:'Test Date Picker View',
	width: 200,
	style:Ti.UI.iPhone.SystemButtonStyle.BORDERED,
	height: 62
});
datePickerTestBtn.addEventListener('click', function() {
	var DatePicker = require('DatePicker');
	var datePicker = new DatePicker(
		mainWnd, 
		function(d) {
			if ( (d !== undefined) && (typeof d == 'object') && (d.constructor == Date)) {
				Ti.API.warn('Date selected: ' + d.toString());
			}
		},
		new Date(1990,0,1),
		new Date(2030,0,1),
		new Date(2012,8,8)
	);
	datePicker.show();
	// datePicker.hide();
});
mainWnd.add(datePickerTestBtn);

// open the main window
mainWnd.open();
