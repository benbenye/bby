import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Headers} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router} from 'angular2/router';

import {MyBookCmp} from './my-book'
import {MyWishCmp} from './my-wish'
import {MyReadingCmp} from './my-reading'
import {MyReadedCmp} from './my-readed'
import {MyEditAvatarCmp} from './my-edit-avatar'
import {MyEditPerinfoCmp} from './my-edit-perinfo'

@Component({
		templateUrl: './modules/user/perinfo.html',
		directives: [RouterOutlet, ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/', name: 'MyBook', component: MyBookCmp, useAsDefault: true },
	{ path: '/wish', name: 'MyWish', component: MyWishCmp },
	{ path: '/reading', name: 'MyReading', component: MyReadingCmp },
	{ path: '/readed', name: 'MyReaded', component: MyReadedCmp },
	{ path: '/edit-avatar', name: 'MyEditAvatar', component: MyEditAvatarCmp },
	{ path: '/edit-perinfo', name: 'MyEditPerinfo', component: MyEditPerinfoCmp }
])
export class UserCenterCmp { }