export class Header {
    
    get container () {
        return $('#header');
    }

    constructor() {
        this.headerCart = new HeaderCart(() => this.container);
    }
}

class HeaderCart {
    get container() {
        return this.header().$('#cart');
    }

    constructor(header) {
        this.header = header;
    }

    getQuantity () {
        let quantity = this.container.$('.quantity').getText();
        return parseInt(quantity);
    }
}

 