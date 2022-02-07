import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'landing-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit, OnDestroy {
  /**
   * Constructor
   */
  constructor() {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

}
