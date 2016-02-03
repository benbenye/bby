import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | cutString:exponent
 * Example:
 *   {{ 2 |  cutString:10}}
 *   formats to: 1024
*/
@Pipe({name: 'cutString'})
export class CutStringPipe implements PipeTransform {

  transform(value:string, args:number[]) : any {
		let num = args[0] || 20;
		return value.length > num ? value.substr(0, (num-3)) + '...' : value;
  }
}