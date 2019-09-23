
export class Checkout {
    constructor() {
        this.shoppingCart = new ShoppingCart();
        this.customerDetails = new CustomerDetails();
    }

    isNoItemsInCart() {
        if($('.cart.wrapper em').isDisplayed()) {
            return $('.cart.wrapper em').getText()
            .includes('There are no items in your cart.');
        } else {
            return false;
        }
    }

    isItemsInCart() {
        return !this.isNoItemsInCart();
    }

    open() {
        browser.url('/checkout');
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
    }
}

//Components
class ShoppingCart {
    get container() {
        return $('#box-checkout-cart');
    }

    get items() {
        return $$('table.items tr.item').map(item => {
            return new Item(item);
        });
    }

    getSubTotal() {
        return $('table tfoot td.subtotal strong').getText();
    }
}



class Item {
    constructor(itemContainer) {
        this.conteiner = itemContainer;
    }

    getProductName() {
        return this.conteiner.getAttribute('data-name');
    }

    getProductPrice() {
        return parseFloat(this.conteiner.getAttribute('data-price'));
    }

    getQuantity() {
        return parseFloat(this.conteiner.getAttribute('data-quantity'));   
    }

    getProductSum() {
        return this.conteiner.$('td:nth-child(5)').getText();
    }

    getOptionProduct () {
        return this.conteiner.$('td div.options').getText();
    }
}

class CustomerDetails {
    get container() {
        return $('.customer #box-checkout-customer');
    }

    setDataToCustomeDetails() {
        this.setCompany();
        this.setTax();
        this.setFirstName();
        this.setLastname();
        this.setAddress1();
        this.setAddress2();
        this.setPostCode();
        this.setCity();
        this.setEmail();
        this.setPhone();
        this.saveChanges();
        this.confirmOrder();

    }

    setCompany() {
        return $('.address input[name="company"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }

    setTax() {
        return $('.address input[name="tax_id"]').setValue(`${Math.random().toString(36).substring(7)}`);
    } 
    
    setFirstName() {
        return $('.address input[name="firstname"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }
    
    setLastname() {
        return $('.address input[name="lastname"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }

    setAddress1() {
        return $('.address input[name="address1"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }

    setAddress2() {
        return $('.address input[name="address2"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }

    setPostCode() {
        return $('.address input[name="postcode"]').setValue(`${Math.floor(Math.random() * 100) + 100000}`);
    }

    setCity() {
        return $('.address input[name="city"]').setValue(`${Math.random().toString(36).substring(7)}`);
    }
    
    setEmail() {
        let mail = $('.address input[name="email"]');
        mail.click();
        mail.clearValue();
        return mail.setValue(`moderngk.c${new Date().getTime() / 1000}@list.ru`);
    }

    setPhone() {
        return $('.address input[name="phone"]').setValue(`+7${parseInt(Math.random()*100*15*14784874)}`);
    }

    saveChanges() {
        const btnSaveChanges = $('button.btn[name="save_customer_details"]');
        btnSaveChanges.click();
        browser.waitUntil(() => {
            return btnSaveChanges.getAttribute('disabled')        
        }, null, 'The saving changes is not successfull');
    }

    confirmOrder() {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        $('button.btn[name="confirm_order"]').click();       
    }
}