import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS,Headers} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Router} from 'angular2/router';

@Component({
  selector: 'reviewer',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/reviewer.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class ReviewerCmp {
  rv = {};
  http: any;
  router: any;
  invalid = false;
  
  constructor(http: Http,router:Router) {
    this.http = http;
    this.router = router;
    http.get('/api/user/reviewer')
      .subscribe(res => {
        this.rv = res.json();

      });
    
  }
}

