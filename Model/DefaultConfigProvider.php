<?php

namespace Iostpay\Iostpaymagento\Model;

use Magento\Store\Model\ScopeInterface;

class DefaultConfigProvider extends \Magento\Checkout\Model\DefaultConfigProvider
{
    public function getConfig()
    {
        $output = parent::getConfig();
        $output['iostpay_account_id'] = $this->scopeConfig->getValue(
                    'payment/iostpay/iostpay_account_id',
                    ScopeInterface::SCOPE_STORE
                );
				

        return $output;
    }
}