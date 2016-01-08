import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {HTTP_PROVIDERS,Http} from 'angular2/http';

import {Book} from '../../routers/book'
import {User} from '../../routers/user';
import {LoginCmp} from '../user/login';
// import {ReviewerCmp} from '../reviewer/reviewer';
// import {LoginCmp} from '../login/login';
// import {registerCmp} from '../register/register';
let routers = (<any[]>Book).concat(User)

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
export class AppCmp {
	user = {err:{
		text:'未接受到数据',
		field:'notgetData'
	}};
	http: any;
	logoutres: any;
	router: any;
	everySecond() { console.log('second'); }
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
				if (!this.logoutres.err) this.router.navigate(['Index']);
			})
	}
}