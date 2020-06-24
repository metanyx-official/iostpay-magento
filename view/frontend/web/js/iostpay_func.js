requirejs(['IOST', 'jquery', 'mage/url'], function( IOST, $, url  ){
	 
	   

}); 
  
	
	
	
	function getWallet( iost_price, url ){
	
		IWalletJS.enable().then(function(account) {
			const iost = IWalletJS.newIOST(IOST);
		
	   iost_price = '1' ;
			
	   const tx = iost.callABI("token.iost", "transfer", ["iost", account, window.checkoutConfig.iostpay_account_id, iost_price, "dapp test memo"]);
      
	   tx.addApprove("iost", iost_price);

         console.log(tx.getApproveList());
			
		 iost.signAndSend(tx).on('pending', function(txid) {
              log("txid: " + txid);
			  
			  jQuery('.iotpay_statuscode').text('We are processing your order...');
			  jQuery('#overlay').fadeIn().delay(16000).fadeOut();	
			  
				GetTxnStatus( txid, url ) ;	
				
			})
          .on('success', function(result) {
              log("res: " + JSON.stringify(result));
			})
           .on('failed', function(failed) {
              log("failed: " + JSON.stringify(failed));
			})
				
			})
			
			
	}
	
	

	function GetTxnStatus( txid, url ){
		
		setTimeout(function() {	
	
			var GetTxnStatusURL = 	url.build("iostpaymagento/Index/GetTxnStatus") 	;
				
				jQuery.ajax({
					 url: GetTxnStatusURL,
					 type: 'POST',
					 data:{
						 txnid : txid,
					 },
				success: function(json) {    
					
					console.log( "getTxn:-"+json );   
				 if (json !== '') {  
					
					const obj = JSON.parse(json);
                    var message = obj.message
                    var status_code = obj.status_code
					
					 jQuery('.iotpay_statuscode').text(message);
						
	ShowDialogBox('Success', message+"",'Ok','', 'GoToAssetList',null);
					 
						setTimeout(function() {	 
								placeOrder() ;
						}, 2000);
				 }
			},
			error: function (xhr, status, errorThrown) {
							console.log('Error happens. Try again.'+errorThrown);
					}
				});
		}, 15000);
   
	}
	
	
	function placeOrder(  ){
		jQuery(".checkoutplaceorder").click()
	}
	
	function log(msg) {
		console.log( msg ) ;
	 }


			
   function ShowDialogBox(title, content, btn1text, btn2text, functionText, parameterList) {
                var btn1css;
                var btn2css;

                if (btn1text == '') {
                    btn1css = "hidecss";
                } else {
                    btn1css = "showcss";
                }

                if (btn2text == '') {
                    btn2css = "hidecss";
                } else {
                    btn2css = "showcss";
                }
                jQuery("#lblMessage").html(content);

                jQuery("#dialog").dialog({
                    resizable: false,
                    title: title,
                    modal: true,
                    width: '400px',
                    height: 'auto',
                    bgiframe: false,
                    hide: { effect: 'scale', duration: 400 },

                    buttons: [
                                    {
                                        text: btn1text,
                                        "class": btn1css,
                                        click: function () {
                                             
											location.reload(true);

                                        }
                                    },
                                    {
                                        text: btn2text,
                                        "class": btn2css,
                                        click: function () {
                                            window.location = url.build("") ;
                                        }
                                    }
                                ]
                });
            }	