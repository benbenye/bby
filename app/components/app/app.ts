import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Book} from '../../routers/book'
import {User} from '../../routers/user';
// import {BookCmp} from '../serial/book';
// import {ReviewerCmp} from '../reviewer/reviewer';
// import {LoginCmp} from '../login/login';
// import {registerCmp} from '../register/register';
let routers = [];
routers = (<any[]>Book).concat(User)

@Component({
		selector: 'app',
		templateUrl: './modules/left.html',
		providers: [HTTP_PROVIDERS],
		// template: '<h1>My First Angular 2 App</h1>'
		// styleUrls: ['./components/app/app.css'],
		encapsulation: ViewEncapsulation.None,
		directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]

})
@RouteConfig(
	routers
)
export class AppCmp {
	constructor(){
	}
}