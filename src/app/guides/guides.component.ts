import {Component, OnInit, OnDestroy} from '@angular/core';
import {GuidesService} from './guides.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'hc-guides',
    templateUrl: './guides.component.html'
})
export class GuidesComponent implements OnInit, OnDestroy {
    thisPage = '';
    selectOptions: Array<string> = [];
    private unsubscribe = new Subject<void>();

    constructor(public guidesService: GuidesService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        // Listen for vertical tab bar navigation and update the select component
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                for (let entry of this.guidesService.guides) {
                    if (event.url === `/guides/${entry.route}`) {
                        this.thisPage = entry.title;
                        break;
                    }
                }
            }
        });

        // Populate the responsive select component with the router information
        for (let entry of this.guidesService.guides) {
            this.selectOptions.push(entry.title);
        }
    }

    // Handle changes to the select component and navigate
    selectUpdate(event: any) {
        for (let entry of this.guidesService.guides) {
            if (event === entry.title) {
                this.router.navigate(['/guides/' + entry.route]);
                break;
            }
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
