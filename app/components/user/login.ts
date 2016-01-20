import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS,Headers} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router} from 'angular2/router';

import {currentUser} from '../user/user-service';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/login.html',
  // outputs: ['deleted'],导致subscribe报错
  bindings: [RouterOutlet, RouterLink, ROUTER_DIRECTIVES]
})

export class LoginCmp {
  login = {};
  model = {
    name:{
      value:'',
      valid:true
    },
    password:{
      value:'',
      valid:true
    }
  };
  http: any;
  router: any;
  currentUser = currentUser;
  constructor(http: Http,router:Router) {
   console.log(this.currentUser)
    this.http = http;
    this.router = router;
    http.get('/api/user/login').subscribe(res => {
        this.login = res.json();
      });
  }

  onSubmit(){
    var creds = "name=" + this.model.name.value + "&password=" + this.model.password.value;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('/api/user/login', creds,{
      headers:headers
    }).subscribe(res => {
        var resObj = res.json();
        if(resObj.err){
          if(resObj.err.field == 'name'){
            this.model.name.valid = false;
            this.model.password.valid = true;
          }else{
            this.model.name.valid = true;
            this.model.password.valid = false;
          }
        }else{

          this.http.get('/api/user/perInfo').subscribe(res=>{
            var s = res.json();
            for(var i in s){
              this.currentUser[i] = s[i];
              currentUser[i] = s[i];
            }
            console.log(this.currentUser)
            console.log(currentUser);
          })
            this.router.navigate(['Index'])
        }
      });
  }
}

