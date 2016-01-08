import {Component, PLATFORM_DIRECTIVES, Input} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';
import {getPerInfo} from  '../user/getPerInfo'

@Component({
  selector: 'index',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/paper-book/paper-book.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class IndexCmp {
  @Input() user: any;
  paperBook = {};
  constructor(http: Http) {
    http.get('/api/index')
      .subscribe(res => {
        this.paperBook = res.json();
      });
  }

}