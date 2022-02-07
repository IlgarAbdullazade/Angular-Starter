import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {AvailableLangs, TranslocoService} from '@ngneat/transloco';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent implements OnInit, OnDestroy {
  languageForm!: FormGroup;

  availableLangs!: AvailableLangs;
  activeLang!: string;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _translocoService: TranslocoService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this._translocoService.getAvailableLangs();

    // Subscribe to language changes
    this._translocoService.langChanges$.subscribe((activeLang) => {

      // Get the active lang
      this.activeLang = activeLang;

    });

    // Create the form
    this.languageForm = this._formBuilder.group({
        lang: [this.activeLang],
      }
    );

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveLang(lang: string): void {
    // Set the active lang
    this._translocoService.setActiveLang(lang);
  }


}
