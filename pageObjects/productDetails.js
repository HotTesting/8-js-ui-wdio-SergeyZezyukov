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
        $('button[name="add_cart_product"]').click();
        browser.pause(2000);
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
        if($('.btn[name="add_cart_product"]').isEnabled()) {
            return console.log('Button is not active because duck is sold');
        } else {
            return false;
        }
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
        browser.pause(5000);
    }
}
