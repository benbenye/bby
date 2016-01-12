import {Component, PLATFORM_DIRECTIVES,Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'book',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/serial/serials.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

@Pipe({ name: 'subStr' })

export class SerialsCmp {
  book = {};
 
  constructor(http: Http) {
      http.get('/api/book/serial')
          .subscribe(res => {
              this.book = res.json();
          });
  } 

  transform(str) {
    return str.length > 20 ? str.substr(0, 17) + '...' : str;
  }
}