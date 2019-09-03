const assert = require ("assert");

describe("Items search", () => {
    it("should show results in case multiple items matches", () => {
        browser.url('/');
        const search = $('form[name="search_form"] .form-control');
        search.setValue('duck');
        browser.keys(['Enter']);
        const products = $$('.products .product');

        console.log(products.length);
        browser.pause(5000);
    });

  
    it("should redirect to item page in case only one result matches", () => {
        browser.pause(5000);
        
        const search = $('form[name="search_form"] .form-control');
        search.setValue('RD003');
        browser.keys(['Enter']);

        const titleProduct = $('h1.title').getText();
        console.log(titleProduct);
        assert(titleProduct.includes('Red Duck'), 'Something went wrong');

        const currentUrl = browser.getUrl();
        console.log(currentUrl);
        assert(currentUrl.includes('red-duck'), 'This URL isn`t you need');
        browser.pause(5000);
    });
  
    it("should redirect to 'no matching results' in case no items matched", () => {
        const search = $('form[name="search_form"] .form-control');
        search.setValue('abcd');
        browser.keys(['Enter']);

        const msgNotFound = $('#box-search-results').getText();
        assert(msgNotFound.includes('No matching results'), 'This text isn`t present on the page');
        browser.pause(5000);
    });
});
  
//   Each implemented test gives you 20 points (max total - 40)
describe("Search results sorting", () => {
    it("correctly arranges items when using 'by price' sorting", () => {
        
        const search = $('form[name="search_form"] .form-control');
        search.setValue('duck');
        browser.keys(['Enter']);

        $$('.btn-group a').map((sort) => {
            if (sort.getText() == 'Price') {
                sort.click();
            }
        });

        let arrProduct = $$('.products .product');
        const allPrices = arrProduct.map((price) => {    
            return price.getAttribute('data-price');        
        });

        console.log(allPrices);
        assert(allPrices === allPrices.sort(), 'Products didn`t sorting by price');
        
        browser.pause(5000);

    });
  
    it("correctly arranges items when using 'by name' sorting", () => {
        
        const search = $('form[name="search_form"] .form-control');
        search.setValue('duck');
        browser.keys(['Enter']);

        $$('.btn-group a').map((sort) =>{
            if (sort.getText() == 'Name') {
                sort.click();
            }
        });

        let arrProduct = $$('.products .product');
        const allNamesProduct = arrProduct.map((name) => {    
            return name.getAttribute('data-name');        
        });

        console.log(allNamesProduct);
        assert(allNamesProduct === allNamesProduct.sort(), 'Products didn`t sorting by name');
        
        browser.pause(5000);
    });
});
  
// BONUS LEVEL - this test gives you 15 points
describe("Contact us form", () => {
    it("must send messages to shop administration", () => {
        browser.url('/customer-service-s-0');
        const contactUs = $('form[name="contact_form"]');
        const name = contactUs.$('input[name="name"]').setValue('Name');
        const email = contactUs.$('input[name="email"]').setValue(`moderngk.c${new Date().getTime() / 1000}@list.ru`);
        const subject = contactUs.$('input[name="subject"]').setValue('test');
        const msg = contactUs.$('textarea[name="message"]').setValue('test');
        const btnSend = contactUs.$('.btn').click();
        browser.pause(5000);
        const msgSuccess = $('#notices .alert-success').getText();
        assert(msgSuccess.includes('Your email has successfully been sent'), 'You wasn`t sent the email');
       // assert(msg.includes('Your customer account has been created.'), 'Message is invalid about crating account');
        
    });
});