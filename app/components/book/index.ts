import {Component, PLATFORM_DIRECTIVES, Input, bind, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Response} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router, OnActivate,
ComponentInstruction,
APP_BASE_HREF} from 'angular2/router';

@Component({
	selector: 'index',
	providers: [HTTP_PROVIDERS],
	templateUrl: './modules/paper-book/paper-book.html',
	bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class IndexCmp implements OnActivate {
	paperBook = {};
	log: string;
	router: any;
	constructor(http: Http,router:Router) {
		this.router = router;
		http.get('/api/index')
			.subscribe(res => {
				this.paperBook = res.json();
			});
	}
	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		this.log = `Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`;
		console.log(this.log)
	}

	gotoDescribe(id){
		this.router.navigate(['Book', { id: id }])
	}
	gotoUpBook(){
		this.router.navigate(['UpLoadPaperBook'])
	}
}
