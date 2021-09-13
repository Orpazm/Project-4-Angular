// import { Pipe, PipeTransform } from '@angular/core';
import { Component, NgModule, VERSION, Pipe, PipeTransform} from '@angular/core'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Pipe({
  name: 'highllight'
})
export class HighllightPipe implements PipeTransform {

   constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    const result = value.replace(regex, "<mark>" + match[0] + "</mark>");
    return this.sanitizer.bypassSecurityTrustHtml(result);

    // return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }

}
