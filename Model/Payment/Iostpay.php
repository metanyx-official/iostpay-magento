<?php


namespace Iostpay\Iostpaymagento\Model\Payment;

class Iostpay extends \Magento\Payment\Model\Method\AbstractMethod
{

    protected $_code = "iostpay";
    protected $_isOffline = true;

    public function isAvailable(
        \Magento\Quote\Api\Data\CartInterface $quote = null
    ) {
        return parent::isAvailable($quote);
    }
}
