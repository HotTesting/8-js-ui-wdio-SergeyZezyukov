import { ProductsDetails } from '../../pageObjects/productDetails';
import { Checkout } from '../../pageObjects/checkout';
import { OrderSuccess } from '../../pageObjects/order_success';
import { expect } from 'chai';

describe("Order", function() {  
    
    afterEach(function() {
        browser.reloadSession();
    });

   it("is successful for regular item", function() {    
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1/red-duck-p-3');
        const productPrice = product.getProductPrice();
        product.addToCart();

        const checkout = new Checkout();
        checkout.open('checkout');
        checkout.isItemsInCart();

        let productPriceInCart = checkout.shoppingCart.items[0].getProductPrice();

        expect(productPriceInCart).to.equal(productPrice);

        checkout.customerDetails.setDataToCustomeDetails();

        const orderSuccess = new OrderSuccess();
        
        expect(orderSuccess.successMassage()).to.include('is successfully completed!');
   });

    it("is successful for discounted item", function() {
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1//rubber-ducks-c-1/blue-duck-p-4');
        const producDiscountPrice = product.getDiscountPrice();
        product.addToCart();

        const checkout = new Checkout();
        checkout.open('checkout');
        checkout.isItemsInCart();

        let productPriceInCart = checkout.shoppingCart.items[0].getProductPrice();

        expect(productPriceInCart).to.not.equal(producDiscountPrice);

        checkout.customerDetails.setDataToCustomeDetails();

        const orderSuccess = new OrderSuccess();
        expect(orderSuccess.successMassage()).to.have.string('is successfully completed!');
    });

    it("is successful for sold out item", function() {
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1/purple-duck-p-5');
        let status = product.getStatus();
        expect(status == 'Temporary Sold Out').to.be.true;
        product.isButtonActiveAddToCart();
    });

    it("is successful for 2 same items in card", function() {
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1/red-duck-p-3');
        product.addToCart();
        product.addToCart();

        const checkout = new Checkout();
        checkout.open('checkout');
        checkout.isItemsInCart();

        let item = checkout.shoppingCart.items[0];
        let productPriceInCart = item.getProductPrice();

        let quantity = item.getQuantity();
        let productSum = item.getProductSum();

        expect('$' + productPriceInCart * quantity).to.equal(productSum);

        checkout.customerDetails.setDataToCustomeDetails();
    });

    it("is successful for 2 different items in card", function() {
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1/red-duck-p-3');
        product.addToCart();
        product.open('rubber-ducks-c-1/blue-duck-p-4');
        product.addToCart();

        const checkout = new Checkout();
        checkout.open('checkout');
        checkout.isItemsInCart();

        let productsPrice = checkout.shoppingCart.items.map(item => {
            return item.getProductPrice();
        });
        let productsPriceSum = productsPrice.reduce((prev, current) => {
            return prev + current;
        });
        productsPriceSum = String(productsPriceSum);        

        let subTotal = checkout.shoppingCart.getSubTotal();

        expect('$' + productsPriceSum).to.equal(subTotal);
        checkout.customerDetails.setDataToCustomeDetails();        
    });

    it("is successful for items with parameters", function() {
        const product = new ProductsDetails();

        product.open('rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6');

        let size = 'Large';
        let sizeProduct = product.changeSize(size);
        product.addToCart();

        const checkout = new Checkout();
        checkout.open('checkout');
        checkout.isItemsInCart();

        let item = checkout.shoppingCart.items[0];
        let productPriceInCart = item.getProductPrice();
        let optionProduct = item.getOptionProduct();
        
        expect(productPriceInCart).to.equal(sizeProduct);
        expect('Size: ' + size).to.equal(optionProduct);

        checkout.customerDetails.setDataToCustomeDetails();
    });
});