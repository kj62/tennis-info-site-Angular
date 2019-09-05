import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'ytVideo',
    pure: false
})
@Injectable()
export class YtVideoPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
