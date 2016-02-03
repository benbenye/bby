import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Headers} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router} from 'angular2/router';

import {TaBookCmp} from './ta-book'
/*import {TaWishCmp} from './ta-wish'
import {TaReadingCmp} from './ta-reading'
import {TaReadedCmp} from './ta-readed'
import {TaEditAvatarCmp} from './ta-edit-avatar'
import {TaEditPerinfoCmp} from './ta-edit-perinfo'*/

@Component({
		templateUrl: './modules/user/ta-center.html',
		directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/:id', name: 'TaBook', component: TaBookCmp, useAsDefault: true }
/*	{ path: '/wish', name: 'TaWish', component: TaWishCmp },
	{ path: '/reading', name: 'TaReading', component: TaReadingCmp },
	{ path: '/readed', name: 'TaReaded', component: TaReadedCmp },
	{ path: '/edit-avatar', name: 'TaEditAvatar', component: TaEditAvatarCmp },
	{ path: '/edit-perinfo', name: 'TaEditPerinfo', component: TaEditPerinfoCmp }*/
])
export class UserTaCenterCmp { }