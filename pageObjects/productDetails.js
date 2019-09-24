import { Header } from './components/header';
import { Footer } from './components/footer';

export class ProductsDetails {
    header = new Header();
    footer = new Footer();

    open(productPath) {
        browser.url(productPath);
        browser.maximizeWindow();
    }

    addToCart() {
        const currentItemsInCart = this.header.headerCart.getQuantity();
        $('button[name="add_cart_product"]').click();
        browser.waitUntil(() => { 
            return this.header.headerCart.getQuantity() > currentItemsInCart;
        }, null, `Expected items in cart to be changed. 
        Current items: ${this.header.headerCart.getQuantity()} items before ${currentItemsInCart}`);
    }

    getProductName() {
        return $('h1.title').getText();
    }

    getProductPrice() {
       return parseFloat($('#box-product').getAttribute('data-price'));
    }

    getDiscountPrice() {
        return parseFloat($('strong.campaign-price').getText());
    }

    getStatus() {
        return $('#box-product .stock-status .value').getText();
    }

    isButtonActiveAddToCart() {
        return $('.btn[name="add_cart_product"]')
        .waitForEnabled(1000, false, "Button is not active.");           
    }

    changeSize(size) {
        let sizeProduct = $('select[name="options[Size]"]'); 
        sizeProduct.selectByAttribute('value', 'Medium');
        if (size === sizeProduct.getValue()) {
           return this.getProductPrice() + 50;
        }

        sizeProduct.selectByAttribute('value', 'Large');
        if (size === sizeProduct.getValue()) {
            return this.getProductPrice() + 100;
        }
        return this.getProductPrice();
        
    }
} 
