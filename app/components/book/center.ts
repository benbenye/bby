import {Component, PLATFORM_DIRECTIVES, Input} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';
import {IndexCmp} from  '../book/index'
import {DescribeCmp} from  '../book/describe'

@Component({
  providers: [HTTP_PROVIDERS],
  templateUrl: '<router-outlet></router-outlet>',
  directives: [RouterOutlet]
})

@RouteConfig(
  [
    { path: '/', component: IndexCmp, as: 'Ss', useAsDefault: true },
    { path: '/:id', component: DescribeCmp, as: 'Book' }
  ]
)

export class Center { }