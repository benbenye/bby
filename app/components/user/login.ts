import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS,Headers} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Router} from 'angular2/router';

@Component({
  selector: 'login',
  providers: [HTTP_PROVIDERS],
  templateUrl: './modules/user/login.html',
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
  invalid = false;
  @Output('everySecond') everySecond: EventEmitter<any> = new EventEmitter();
  constructor(http: Http,router:Router) {
    this.http = http;
    this.router = router;
    http.get('/api/user/login')
      .subscribe(res => {
        this.login = res.json();

      });
    
  }

  onSubmit(){
    var creds = "name=" + this.model.name.value + "&password=" + this.model.password.value;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('/api/user/login', creds,{
      headers:headers
    } )
      .subscribe(res => {
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
          setInterval(() => this.everySecond.emit(null), 1000);
          this.router.navigate(['Index'])
        }
      });
  }
}

