import {Component, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/perinfo.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class PerinfoCmp {
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