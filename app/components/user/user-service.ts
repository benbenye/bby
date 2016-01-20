import {Component, PLATFORM_DIRECTIVES, Input, bind, Injector, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Response} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink} from 'angular2/router';
// import {Observable} from '@reactivex/rxjs/dist/cjs/Observable';
import {Observable} from '@reactivex/rxjs/dist/cjs/Rx';

var injector = Injector.resolveAndCreate([
  HTTP_BINDINGS
]);
var http = injector.get(Http);

export var currentUser: Observable<any>;
// currentUser = {
//   error: {
//     text: '未接受到数据',
//     field: 'notgetData'
//   }
// };

http.get('/api/user/perInfo').subscribe(res=> {
  currentUser = res.json();
});
