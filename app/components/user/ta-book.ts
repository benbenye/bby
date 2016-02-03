import {Component, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router, RouteParams} from 'angular2/router';

@Component({
  selector: 'ta-book',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/my-book.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class TaBookCmp {
  perinfor : any;
  router: any;
  constructor(http: Http, _router: Router, _routeParams: RouteParams) {
    this.router = _router;
    http.get('/api/user/' + _routeParams.get('id'))
      .subscribe(res => {
        this.perinfor = res.json();
      });
  }
  usergotoSerial(id) {
    this.router.navigate(['Serial', { id: id }])
  }
}
