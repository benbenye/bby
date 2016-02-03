import {Component, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'my-book',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/my-book.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class MyBookCmp {
  perinfor = {};
  router: any;
  constructor(http: Http, router: Router) {
    this.router = router;
    http.get('/api/user/perInfo')
      .subscribe(res => {
        this.perinfor = res.json();
      });
  }
  usergotoSerial(id) {
    this.router.navigate(['Serial', { id: id }])
  }
}
console.log(MyBookCmp)