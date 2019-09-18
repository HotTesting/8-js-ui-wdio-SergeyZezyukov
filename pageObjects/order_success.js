import { Header } from './components/header';
import { Footer } from './components/footer';

export class OrderSuccess {
    get container() {
        return $('#box-order-success');
    }

    header = new Header();
    footer = new Footer();

    successMassage() {
        if(this.container.$('h1.title')) {
            return this.container.$('h1.title').getText();
        } else {
            return false;
        }
    }

    
}