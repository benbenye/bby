import {AppCmp} from './components/app/app';
import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router'

bootstrap(AppCmp, [
  ROUTER_PROVIDERS
]);