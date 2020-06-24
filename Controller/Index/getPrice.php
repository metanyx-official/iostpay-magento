<?php
namespace Iostpay\Iostpaymagento\Controller\Index;
use \Magento\Framework\App\Action\Context;
use \Iostpay\Iostpaymagento\Helper\Data as SKHelper;

class GetPrice extends \Magento\Framework\App\Action\Action
{
 	protected $_skHelper;

    public function __construct( 
			Context $context,
			SKHelper $skHelper
    ) {    
     	$this->_skHelper = $skHelper;
		parent::__construct($context);
    }

    public function execute(){
		
		$CMC_KEY	=	 $this->_skHelper->getConfig("payment/iostpay/cmc_api_key");

		$objectManager = \Magento\Framework\App\ObjectManager::getInstance(); 
		$cart = $objectManager->get('\Magento\Checkout\Model\Cart');    
		$grandTotal = $cart->getQuote()->getGrandTotal();

		$storeManager = $objectManager->get('Magento\Store\Model\StoreManagerInterface'); 
		$currencyCode = $storeManager->getStore()->getCurrentCurrencyCode(); 
		$requrl = 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion';


			 $parameters = [
				  'symbol' => $currencyCode,
				  'amount' => $grandTotal,
				  'convert' => 'IOST'
			   ];
			
			 $headers = [
					  'Accepts: application/json',
					  'X-CMC_PRO_API_KEY: '.$CMC_KEY
					 ];
					 
			$qs = http_build_query($parameters); 
			$request = $requrl.'?'.$qs; 
			
			$curl = curl_init(); 
       
			   curl_setopt_array($curl, array(
				  CURLOPT_URL => $request,           
				  CURLOPT_HTTPHEADER => $headers,    
				  CURLOPT_RETURNTRANSFER => 1        
				));
		
			$response = curl_exec($curl);
			$response	=	json_decode($response, true) ;
			
			if( isset( $response ) ){
				
				$iostPrice       =        $response['data']['quote']['IOST']['price'] ; 
				
				 $iost_amount    =   number_format((float)$iostPrice, 2, '.', '');
					
				echo $iost_amount ;
			 
			 }		
		
			exit;
    }
}
