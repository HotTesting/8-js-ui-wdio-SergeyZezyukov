import { ProductsDetails } from '../../pageObjects/productDetails';
import { Checkout } from '../../pageObjects/checkout';
import { expect } from 'chai';

describe('Cart', function() {
    it('can add item', function() {
        const product = new ProductsDetails();
        product.open('rubber-ducks-c-1/red-duck-p-3');
        product.addToCart();

        const checkout = new Checkout();
        checkout.open();
        expect(checkout.isItemsInCart()).to.be.true;
    });

    it.only('can add correct item', function() {
        const product = new ProductsDetails();
        product.open('rubber-ducks-c-1/red-duck-p-3');
        const productName = product.getProductName();
        const productPrice = product.getProductPrice();
        console.log(productName);
        console.log(productPrice);

        product.addToCart();

        const checkout = new Checkout();
        checkout.open();
        expect(checkout.isItemsInCart()).to.be.true;

        let productNameInCart = checkout.shoppingCart.items[0].getProductName();
        let productPriceInCart = checkout.shoppingCart.items[0].getProductPrice();

        console.log(productPriceInCart);
        console.log(productNameInCart);

        expect(productNameInCart).to.equal(productName);
        expect(productPriceInCart).to.equal(productPrice);
    });
});