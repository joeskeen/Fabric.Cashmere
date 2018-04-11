import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hc-data-grid',
    template: '<ng-content></ng-content>'
})
export class DataGridComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
