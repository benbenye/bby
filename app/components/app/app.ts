import {Component, PLATFORM_DIRECTIVES, Input, bind, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Response} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router, OnActivate,
ComponentInstruction,
APP_BASE_HREF} from 'angular2/router';

import {Book} from '../../routers/book'
import {User} from '../../routers/user';
import {LoginCmp} from '../user/login';
// import {ReviewerCmp} from '../reviewer/reviewer';
// import {LoginCmp} from '../login/login';
// import {registerCmp} from '../register/register';
let routers = (<any[]>Book).concat(User)

var injector = Injector.resolveAndCreate([
  HTTP_BINDINGS
]);
var http = injector.get(Http);
@Component({
		selector: 'app',
		templateUrl: './modules/left.html',
		providers: [HTTP_PROVIDERS],
		// encapsulation: ViewEncapsulation.None,
		directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES, 
			LoginCmp]
})
@RouteConfig(
	routers
)
export class AppCmp{
	user = {err:{
		text:'未接受到数据',
		field:'notgetData'
	}};
	http: any;
	logoutres: any;
	router: any;
	log: any;
	constructor(http:Http, router: Router){
		this.router = router;
		this.http = http;
		http.get('/api/user/perInfo')
			.subscribe(res => {
				this.user = res.json()
			})
	}
	logout(){
		this.http.get('/api/user/logout')
			.subscribe(res => {
				this.logoutres = res.json()

				http.get('/api/user/perInfo')
				.subscribe(res=>{
					this.user = res.json();
				})
				if (!this.logoutres.err) this.router.navigate(['Index']);
			})
	}
}