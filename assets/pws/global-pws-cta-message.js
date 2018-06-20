
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };
})(jQuery);
//------------------------------------------------------------------------------------

var alertint;

function setAlertAsRead(){
	$.cookie("msg" + data_message.message.id, "T", { path: '/' , expires: 7});
	}

function showTopAlert(){
	if(data_message.message.active == 1){
		if($.cookie("msg" + data_message.message.id) == 'T'){
			
			}
		else{
			alertint = setInterval(onAlertDelayComplete, 3000);
			}
		}
	}

function onAlertDelayComplete(){
	//$('#alert_info_txt').html(data_message.message.copy);
	
	if(data_message.message.importance == 'red'){
		//document.getElementById('alert_info').style.background = '#DE0A0A';
		}
	else if(data_message.message.importance == 'orange'){
		//document.getElementById('alert_info').style.background = '#FF9504';
		}
	else if(data_message.message.importance == 'green'){
		//document.getElementById('alert_info').style.background = '#5DA423';
		}
	
	$('#alert_info_new').slideDown();
	clearInterval(alertint);
	}

//----------------------------------------------------------------------------

function injectCTAparams(){
	if (current_location_key != "/uk/credit-cards/credit-card-compare.html" && current_location_key != "/uk/credit-cards/credit-card-list.html" && current_location_key != "/uk/credit-cards/index.html" && current_location_key != "/uk/credit-cards/business-visa-platinum-gold.html" && current_location_key != "/uk/credit-cards/gold-visa-mastercard.html" && current_location_key != "/uk/credit-cards/platinum-visa-mastercard.html" && current_location_key != "https://www.sc.com/preferred-banking-important-notice.html") {
		
	var loc = String(document.location);
	if(loc.indexOf('?')!= -1){
		loc = loc.split('?')[0];
		}
	
	var url = loc.split('https://www.sc.com/');
	var tmpstr = new Array();
	for(i=3;i<url.length;i++){
		tmpstr.push(url[i]);
		}
	
	var lastitem = tmpstr[tmpstr.length-1];
	
	if(lastitem == ''){
		tmpstr[tmpstr.length-1] = 'index.html';
		}
	tmpstr = tmpstr.join('https://www.sc.com/');
	
	for(btn in cta_data.urls[tmpstr]){
		if(document.getElementById(btn) != null){
			//console.log(btn+'_m');
			//if (checkuseragent(cta_data.urls[tmpstr][btn+'_m'])) {
				//var reHref = 'https://forms.online.standardchartered.com/public_website/hongkong/wap_ploandc_application/';
				//document.getElementById(btn).href = cta_data.urls[tmpstr][btn+'_m'];
			//} else {
				document.getElementById(btn).href = cta_data.urls[tmpstr][btn];
			//}
		}
	}
	} else {
	// current_location variable is set in the global-pws.js file and is scoped to be used globally
	for (btn in cta_data.urls[current_location_key]) {
		var $btn_element = $('#' + btn);
		//console.log($btn_element);
		if ($btn_element != null) {
		    var href;
            // Additional attributes need to be added for Apply Now cta's to handle the multiple URLs they can point to
		    if ($btn_element.hasClass('apply-now') && cta_data.urls[current_location_key][btn].apply_now != '' && cta_data.urls[current_location_key][btn].apply_now != undefined) {
		        href = cta_data.urls[current_location_key][btn].apply_now;
		        
		        if (cta_data.urls[current_location_key][btn].apply_now_existing != '' && cta_data.urls[current_location_key][btn].apply_now_existing != undefined) {
		            $btn_element.attr('data-apply-now-existing', cta_data.urls[current_location_key][btn].apply_now_existing);
		        }
		        if (cta_data.urls[current_location_key][btn].apply_now_b != '' && cta_data.urls[current_location_key][btn].apply_now_b != undefined) {
		            $btn_element.attr('data-apply-now-b', cta_data.urls[current_location_key][btn].apply_now_b);
		        }
		        if (cta_data.urls[current_location_key][btn].apply_now_existing_b != '' && cta_data.urls[current_location_key][btn].apply_now_existing_b != undefined) {
		            $btn_element.attr('data-apply-now-existing-b', cta_data.urls[current_location_key][btn].apply_now_existing_b);
		        }
		        if (cta_data.urls[current_location_key][btn].data_id != '') {
		            $btn_element.attr('data-id', cta_data.urls[current_location_key][btn].data_id);
		        }
				} else if ($btn_element.hasClass('cashone') && cta_data.urls[current_location_key][btn].apply_now != '') { // Additional attributes for cashone
						href = cta_data.urls[current_location_key][btn].apply_now;
						if (cta_data.urls[current_location_key][btn].apply_now_existing !== '') {
		            $btn_element.attr('data-apply-now-existing', cta_data.urls[current_location_key][btn].apply_now_existing);
		        }
				} else {
					// href = cta_data.urls[current_location_key][btn];
					
					if ((current_location_key == "uk/credit-cards/credit-card-compare.html" || current_location_key == "credit-cards/credit-card-list.html") && $btn_element.text() !="") {
							$btn_element.removeAttr('class href title');
							$btn_element.addClass('invite-only');
							$btn_element.text('By Invitation Only');
							$btn_element.changeElementType('p');
					} else
						href = cta_data.urls[current_location_key][btn];
		    }
			
			if (cta_data.urls[current_location_key][btn].apply_now == "NA") { 
				$btn_element.remove();
			} else {
		    	$btn_element.attr('href', href);
			}
		}
		if (current_location_key == "credit-cards/credit-card-compare.html") {
			$btn_element = $('#' + (btn.replace("-a", "-b")));
			
			if ($btn_element != null) {
				// Additional attributes need to be added for Apply Now cta's to handle the multiple URLs they can point to
				if ($btn_element.hasClass('apply-now') && cta_data.urls[current_location_key][btn].apply_now != '' && cta_data.urls[current_location_key][btn].apply_now != undefined) {
						href = cta_data.urls[current_location_key][btn].apply_now;
						
						if (cta_data.urls[current_location_key][btn].apply_now_existing != '' && cta_data.urls[current_location_key][btn].apply_now_existing != undefined) {
								$btn_element.attr('data-apply-now-existing', cta_data.urls[current_location_key][btn].apply_now_existing);
						}
						if (cta_data.urls[current_location_key][btn].apply_now_b != '' && cta_data.urls[current_location_key][btn].apply_now_b != undefined) {
								$btn_element.attr('data-apply-now-b', cta_data.urls[current_location_key][btn].apply_now_b);
						}
						if (cta_data.urls[current_location_key][btn].apply_now_existing_b != '' && cta_data.urls[current_location_key][btn].apply_now_existing_b != undefined) {
								$btn_element.attr('data-apply-now-existing-b', cta_data.urls[current_location_key][btn].apply_now_existing_b);
						}
						if (cta_data.urls[current_location_key][btn].data_id != '') {
								$btn_element.attr('data-id', cta_data.urls[current_location_key][btn].data_id);
						}
						//$btn_element.attr('href', href);
				} else {
							 // href = cta_data.urls[current_location_key][btn];
								//href = '#';

								if ($btn_element.text() !="") {
									$btn_element.removeAttr('class href title');
									$btn_element.addClass('invite-only');
									$btn_element.text('By Invitation Only')
									$btn_element.changeElementType('p');
								} else
									href = cta_data.urls[current_location_key][btn];
				}
				
				if (cta_data.urls[current_location_key][btn].apply_now == "NA") { 
					$btn_element.remove();
				} else {
		    		$btn_element.attr('href', href);
				}
			}
			
		}
	}
	}
	
	
	for(mnbtn in cta_data.urls["meganav"]){
		if(document.getElementById(mnbtn) != null){
			document.getElementById(mnbtn).href = cta_data.urls["meganav"][mnbtn];
			}
		}
	}

//-----------------------------------------------------------------------------------------

var discLnk;

function popDisclaimer(obj){
	discLnk = obj;
	$('#dest_url').html(obj.href);
	$('#disclaimerModalNew').reveal({animation: 'fade', closeOnBackgroundClick: true});
	}

function acceptDisclaimer(){
	$('#disclaimerModalNew').trigger('reveal:close');
	window.open(discLnk, '_blank');
	}

function captureDisclainerLinks(){
	var aList = document.getElementsByTagName('a');
	
	for(ai=0;ai<aList.length;ai++){
		clsarr = String(aList[ai].className).split(' ');
		
	if(clsarr.indexOf('disclaimer') > -1){
		//aList[ai].onclick = testclick;
		aList[ai].onclick = (function(obj){popDisclaimer(this); return false});
		}
	}
}

function setDisclaimerClickEvent() {
	$('.disclaimer_insure').unbind('click').click(function (ev) {
		ev.preventDefault();
		var dest = ($(this).attr('href') != null) ? $(this).attr('href') : '';
		$('.accept-disclaimer').unbind('click').click(function (ev) {
			ev.preventDefault();
			$(this).trigger('reveal:close');
			window.open(dest, "_blank");
		});
    $('#disclaimerPopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
				
    });
}
	
function setCashOneLinkClickEvent() {
	$('.cashone').unbind('click').click(function (ev) {
		ev.preventDefault();
		var applynow = ($(this).attr('href') != null) ? $(this).attr('href') : '';
    var applynowexisting = ($(this).attr('data-apply-now-existing') != null) ? $(this).attr('data-apply-now-existing') : '';

    $('#cashone-exisiting-customer-next').unbind('click').click(function (ev) {
        ev.preventDefault();
        var is_existing_customer = $('input[name=cashone-existingCardHolder]:checked', '#cashone-existingCustomerPopup').val();

        if (is_existing_customer == null || is_existing_customer == '') {
            alert('Please select yes or no');
            return;
        } else if (is_existing_customer == 'YES') {
            launchCashOneChangeOfIncomePopup(applynow, applynowexisting);
        } else if (is_existing_customer == 'NO') {
            $(this).trigger('reveal:close');
			window.open(applynow, "_form");
        }
    });

    $('#cashone-existingCustomerPopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
				
    });
}

function launchCashOneChangeOfIncomePopup(applynow, applynowexisting) {
    $('#cashone-changed-income-proceed').unbind('click').click(function (ev) {
        ev.preventDefault();
        var has_changed_income = $('input[name=cashone-changedIncome]:checked', '#cashone-changedIncomePopup').val();

        if (has_changed_income == null || has_changed_income == '') {
            alert('Please select yes or no');
            return;
        } else if (has_changed_income == 'YES') {
			$(this).trigger('reveal:close');
			window.open(applynow, "_form");
        } else if (has_changed_income == 'NO') {
			$(this).trigger('reveal:close');
			window.open(applynowexisting, "_form");
        }
    });

    $('#cashone-changedIncomePopup').reveal({ animation: 'fade', closeOnBackgroundClick: true });
}

// Function for calling a disclaimer popup for internal links. Sends the user to the given destination
// if they click on the 'I Accept' button
function popInternalDisclaimer(disclaimerId, destination, external) {
    var disclaimer = $('#' + disclaimerId);
    disclaimer.reveal({ animation: 'fade', closeOnBackgroundClick: true });

    var accept_link = $('.accept-disclaimer', disclaimer);
    accept_link.attr('href', destination);
    if (external) {
        accept_link.attr('target', '_blank');
    }
    accept_link.click(function () {
        disclaimer.trigger('reveal:close');
    });

    $('.decline-disclaimer', disclaimer).click(function(ev) {
        ev.preventDefault();
        disclaimer.trigger('reveal:close');
    });
}

function captureCustomDisclaimerLinks() {
    $('.custom-disclaimer').click(function (ev) {
        ev.preventDefault();
        var is_external = ($(this).attr('target') == '_blank') ? true : false;
        popInternalDisclaimer($(this).attr('data-disclaimer-id'), $(this).attr('href'), is_external);
    });
	
	$('.banner-container .twelve.columns').on('click', '.custom-disclaimer', function(ev) {
		ev.preventDefault();
		var is_external = ($(this).attr('target') == '_blank') ? true : false;
        popInternalDisclaimer($(this).attr('data-disclaimer-id'), $(this).attr('href'), is_external);
	});
	
}

//-----------------------------------------------------------------------------------------
$(document).ready(function(){
	showTopAlert();
	captureCustomDisclaimerLinks();
});

$(window).load(function () {
		
	injectCTAparams();
	
	captureDisclainerLinks();
	setCashOneLinkClickEvent();
	setDisclaimerClickEvent();
});