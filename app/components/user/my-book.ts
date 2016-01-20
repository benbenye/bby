import {Component, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';

@Component({
  selector: 'my-book',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/my-book.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class MyBookCmp {
  perinfor = {};
  constructor(http: Http) {
    http.get('/api/user/perInfo')
      .subscribe(res => {
        this.perinfor = res.json();
      });
  }

  switchNav(v){
    console.log(v)
  }
}