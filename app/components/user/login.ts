import {Component, PLATFORM_DIRECTIVES, Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/login.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class SerialCmp {
  login = {};
  constructor(http: Http) {
    http.get('/api/user/login')
      .subscribe(res => {
        this.login = res.json();
      });
  }
}