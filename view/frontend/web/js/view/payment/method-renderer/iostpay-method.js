define(
    [
        'Magento_Checkout/js/view/payment/default',
		'mage/url','IOST', 'jquery'
    ],
    function ( Component, url, IOST, $ ) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Iostpay_Iostpaymagento/payment/iostpay'
            },
            getMailingAddress: function () {
                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },
            getInstructions: function () {
                return '';
            },
	transfer: function () {

			alert(  ) ;
		
				if ( typeof IWalletJS === 'undefined' ) {

	ShowDialogBox('Warning','iwallet extension not found!','Try again!', 'Cancel', 'GoToAssetList',null);
		
						 // location.reload(true);
							return false;
					}
					
				if (IWalletJS.account.name == null ) {

					
	ShowDialogBox('Warning','Please Unlock iwallet Extension!','Try again!', 'Cancel', 'GoToAssetList',null);
						 // location.reload(true);
							return false;
				}					
				

				jQuery('#overlay').fadeIn().delay(2000).fadeOut();	
				
				jQuery(".checkoutiostpay").attr("disabled", "disabled")	;

				var getpriceURL = 	url.build("iostpaymagento/Index/GetPrice") 	;
						
							
					jQuery.ajax({
							url: getpriceURL,
							type: 'POST',
							success: function( iostprice ) {    
								console.log( iostprice );   
								getWallet( iostprice, url ) ; 
							},
							error: function (xhr, status, errorThrown) {
								console.log('Error happens. Try again.'+errorThrown);
							}
						}); 
            },
			
        });
    }
);
