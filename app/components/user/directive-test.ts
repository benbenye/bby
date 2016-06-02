import {Component, PLATFORM_DIRECTIVES, Pipe, Directive, Output, ElementRef, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, HTTP_BINDINGS, Headers} from 'angular2/http';
import {RouterOutlet, RouterLink, ROUTER_DIRECTIVES, Router} from 'angular2/router';
@Directive({
  selector: '[login-directive]',
  outputs: ['clicks:myClick']
})

export class MyClickDirective2 {
  clicks = new EventEmitter<string>();
  constructor(el: ElementRef) {
    el.nativeElement
      .addEventListener('click', (event: Event) => {
        this.clicks.emit('ClickAA!');
      });
  }
}