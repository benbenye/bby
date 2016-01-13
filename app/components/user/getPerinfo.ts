import {Component, PLATFORM_DIRECTIVES, Input, bind, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Response} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';

var injector = Injector.resolveAndCreate([
  HTTP_BINDINGS
]);
var http = injector.get(Http);
export var httpTool = {
	getPerinfo: function(){
		http.get('/api/user/perInfo').subscribe(res => {
			console.log('first person', res.json()[0]);
		});
	}
}