import {Component, PLATFORM_DIRECTIVES} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouterOutlet, RouterLink} from 'angular2/router';


@Component({
  selector: 'index',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/paper-book/paper-book.html',
  bindings: [HTTP_BINDINGS]
})
export class IndexCmp {
  paperBook: any;
  constructor(http: Http) {
      http.get('/api/index')
      .subscribe(res => {
        this.paperBook = res.json();
      });
  }
}