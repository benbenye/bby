import {Component, PLATFORM_DIRECTIVES, Input} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router, RouteParams} from 'angular2/router';

@Component({
  selector: 'book-describe',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/paper-book/describe.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class DescribeCmp {
  describe = {};
  constructor(http: Http, _router: Router, _routeParams: RouteParams) {

    http.get('/api/paperbook/' + _routeParams.get('id'))
      .subscribe(res => {
        this.describe = res.json();
      });
  }

}