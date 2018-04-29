import {
    animate, animateChild, group, query, style, transition, trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  routeAnimation,
  Theme,
  WarningTypeConfig,
  WarningTypes,
  WarningTypesConfigList
} from '../../../shared';
import { AppSandbox } from '../../app.sandbox';

@Component({
  selector: 'app-root',
  template: `
  <div [class]="theme$ | async">
    <!-- loading bar -->
    <app-progress-bar></app-progress-bar>
    <!-- warning alert -->
    <app-alert [type]="warningType"></app-alert>
    <!-- router outlet -->
    <div [@routeAnimation]="getRouterState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  </div>`,
  animations: [routeAnimation]
})
export class AppComponent {
  theme$: Observable<Theme> = this.sandBox.theme$;
  warningType: WarningTypeConfig = WarningTypesConfigList[WarningTypes.Error];

  constructor(private sandBox: AppSandbox) {}

  getRouterState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
