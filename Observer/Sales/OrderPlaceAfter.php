<?php
namespace Iostpay\Iostpaymagento\Observer\Sales;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Event\Observer;

class OrderPlaceAfter implements ObserverInterface
{
    public function execute(Observer $observer){
        try {
            $order = $observer->getEvent()->getOrder();
            if($order->getPayment()->getMethod() == 'iostpay'){
                $orderState = \Magento\Sales\Model\Order::STATE_PROCESSING;
                $order->setState($orderState)->setStatus(\Magento\Sales\Model\Order::STATE_PROCESSING);
                $order->save();
            }
        } catch (\Exception $e) {
            $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/OrderPlaceAfterException.log');
            $logger = new \Zend\Log\Logger();
            $logger->addWriter($writer);
            $logger->info($e->getMessage());
        }
    }
}
