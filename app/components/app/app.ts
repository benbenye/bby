import {Component, PLATFORM_DIRECTIVES, Input, bind, Injector, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Response} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router, OnActivate,
ComponentInstruction,
APP_BASE_HREF} from 'angular2/router';

import {Book} from '../../routers/book'
import {User} from '../../routers/user';
import {currentUser} from '../user/user-service';

let routers = (<any[]>Book).concat(User)

@Component({
		selector: 'app',
		templateUrl: './modules/left.html',
		providers: [HTTP_PROVIDERS],
		directives: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})
@RouteConfig(
	routers
)
export class AppCmp{
	currentUser = currentUser;
	http: any;
	logoutres: any;
	router: any;

	constructor(http:Http, router: Router){
		this.router = router;
		this.http = http;
		http.get('/api/user/perInfo')
			.subscribe(res => {
				this.currentUser = res.json()
			})
	}
	logout(){
		this.http.get('/api/user/logout')
			.subscribe(res => {
				this.logoutres = res.json()

				this.http.get('/api/user/perInfo')
					.subscribe(res=> {
						var s = res.json();
            for (var i in s) {
              this.currentUser[i] = s[i];
              currentUser[i] = s[i];
            }
				})
					console.log(this.currentUser)
					console.log(currentUser);
				if (!this.logoutres.err) this.router.navigate(['Index']);
			})
	}
}
