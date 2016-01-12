import {Component, PLATFORM_DIRECTIVES,Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

@Component({
  selector: 'book',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/serial/serial.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

@Pipe({ name: 'subStr' })

export class SerialCmp {
  book = {};
  user = {}; 
  constructor(http: Http, _router: Router, _routeParams: RouteParams) {
    http.get('/api/serial/' + _routeParams.get('id'))
      .subscribe(res => {
        this.book = res.json().book;
        this.user = res.json().user || {};
      });
  }

  transform(str) {
    return str.length > 20 ? str.substr(0, 17) + '...' : str;
  }
}