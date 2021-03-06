<?php
/**
 * @package   SK\StoreConfig
 * @author    Kishan Savaliya <kishansavaliyakb@gmail.com>
 */
 
namespace Iostpay\Iostpaymagento\Helper;
use Magento\Framework\App\Helper\AbstractHelper;
class Data extends AbstractHelper
{    
    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        $this->scopeConfig = $scopeConfig;
    }
    public function getConfig($configPath)
    {
        return $this->scopeConfig->getValue(
            $configPath,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }
}