
import {bind, Injector} from 'angular2/core';
import {HTTP_BINDINGS, Http, Response, XHRBackend} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing'

var people = [{ name: 'Jeff' }, { name: 'Tobias' }];

var injector = Injector.resolveAndCreate([
		HTTP_BINDINGS,
		MockBackend,
		bind(XHRBackend).toAlias(MockBackend)
]);
var http = injector.get(Http);
var backend = injector.get(MockBackend);

// Listen for any new requests


http.get('/api/user/perInfo').subscribe(res => {
				// Response came from mock backend
				console.log('first person', res.json()[0].name);
		}
);
