import {Component, PLATFORM_DIRECTIVES, Pipe, provide, Injector} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, BaseRequestOptions} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';

import {MockBackend} from 'angular2/http/testing';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/login.html',
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class LoginCmp {
  login = {
    
  };
  model={
    name:'',
    password:''
  }
  invalid = true;
  constructor(http: Http) {
    http.get('/api/user/login')
      .subscribe(res => {
        this.login = res.json();
      });
  }

  onSubmit(){
  }
}