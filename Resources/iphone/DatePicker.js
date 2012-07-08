/**
 * @description: This is the iPhone version to create a slideup-ing view that holds a date picker on the fly  :-)
 *               This implementation is based on PickerView invented by Stephen G, https://gist.github.com/915540 ,  thanks
 * 
 * @author: Firebear2008atgmail.com from Beijing, China
 * @date:  07/08/2012
 * 
 * Example usage:
 * 
	var DatePicker = require('DatePicker');
	var datePicker = new DatePicker(
		win1,  // win1 is a window
		function(d) {
			if ( (d !== undefined) && (typeof d == 'object') && (d.constructor == Date)) {
				Ti.API.warn('Date selected: ' + d.toString());
			}
		},
		new Date(1990,0,1),	// minDate, optional
		new Date(2030,0,1),	// maxDate, optional
		new Date(2012,8,8)	// value (selected date), optional
	);
	datePicker.show();
	
	// datePicker.hide();

	// optional: define string 'cancel' and/or 'done' to replace the default values in English
 * 
 */

/**
 * create a slideup-ing view that holds a date picker
 * 
 * @param {Object}   wn		    [mandatory]	a reference to the window to add this picker view
 * @param {function} done		[mandatory]	The event to run when the user picks "done", function will be passed the Titaanium.UI.PickerRow choose
 * @param {Date}     _minDate	[optional]	the min date of the picker
 * @param {Date}     _maxDate	[optional]	the max date of the picker
 * @param {Date}     _value		[optional]	the default selected date of the picker
 * 
 * @return an object holds a date picker and functions of show and hide
 * 
 */
function DatePicker(_wn, _done, _minDate, _maxDate, _value) {
	
	// the object to created as DatePicker
	var ThisControl = {};	
	
	// the whole view height
	var viewHeight = 251; // TODO: magic number
	
	// The container view, which will be hidden along the bottom 
	ThisControl.View = Titanium.UI.createView({
		height: viewHeight,
		bottom: -viewHeight
	});

	// Show the view holding the picker 
	ThisControl.ShowAnimation =  Titanium.UI.createAnimation({bottom:0});
	ThisControl.show = function() {
		ThisControl.View.animate(ThisControl.ShowAnimation);
	};

	// Hide the view holding the picker 
	ThisControl.HideAnimation =  Titanium.UI.createAnimation({bottom:-viewHeight});
	ThisControl.hide = function() {
		ThisControl.View.animate(ThisControl.HideAnimation);
	};

	// cancel button
	ThisControl.Cancel =  Titanium.UI.createButton({
		title: L('cancel'),
		style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	// done button
	ThisControl.Done =  Titanium.UI.createButton({
		title: L('done'),
		style: Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	// spacer
	ThisControl.Spacer =  Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	// tool bar
	ThisControl.Toolbar =  Titanium.UI.createToolbar({
		top: 0,
		items: [ ThisControl.Cancel, ThisControl.Spacer, ThisControl.Done ]
	});
	
	var minDate = new Date(1900, 0, 1);
	if ( (_minDate !== undefined) && (typeof _minDate == 'object') && (_minDate.constructor == Date)) {
		minDate = _minDate;
	}
	var maxDate = new Date();
	if ( (_maxDate !== undefined) && (typeof _maxDate == 'object') && (_maxDate.constructor == Date)) {
		maxDate = _maxDate;
	}
	var value = new Date();
	if ( (_value !== undefined) && (typeof _value == 'object') && (_value.constructor == Date)) {
		value = _value;
	}

	// date picker
	ThisControl.Picker = Titanium.UI.createPicker({
		top	: 43,
	  	type:Ti.UI.PICKER_TYPE_DATE,
	  	minDate: minDate,
	  	maxDate: maxDate,
	  	value: value
	});
	
	ThisControl.Picker.selectionIndicator = true;

	// TODO: the date is unable to be changed if not listening to event 'change'
	ThisControl.Picker.addEventListener('change',function(e){
		// Ti.API.info("User selected date: " + e.value.toLocaleString());
	});

	ThisControl.Done.addEventListener('click', function() {
		ThisControl.hide();
		_done(ThisControl.Picker.getValue()); // return value : Date
	});
	
	ThisControl.Cancel.addEventListener('click', function() {
		ThisControl.hide();
	});
	
	ThisControl.View.add(ThisControl.Toolbar);

	ThisControl.View.add(ThisControl.Picker);

	ThisControl.View.zIndex = 1;

	_wn.add(ThisControl.View);
	
	return ThisControl;
};

/**
 * exports
 */
module.exports = DatePicker;
