define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'iostpay',
                component: 'Iostpay_Iostpaymagento/js/view/payment/method-renderer/iostpay-method'
            }
        );
        return Component.extend({});
    }
);