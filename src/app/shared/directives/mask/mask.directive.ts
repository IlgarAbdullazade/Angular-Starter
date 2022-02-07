import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[mask]',
  exportAs: 'mask'
})
export class MaskDirective implements OnInit {
  inputElement: HTMLInputElement;
  regex: RegExp = new RegExp('');
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  ngOnInit(): void {
    this.regex = new RegExp(this.inputElement.pattern);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey) || ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey) || ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey) || ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey) || ((e.key === 'a' || e.code === 'KeyA') && e.metaKey) || ((e.key === 'c' || e.code === 'KeyC') && e.metaKey) || ((e.key === 'v' || e.code === 'KeyV') && e.metaKey) || ((e.key === 'x' || e.code === 'KeyX') && e.metaKey) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    const newValue = this.forecastValue(e.key);
    if (!this.regex.test(newValue)) {
      e.preventDefault();
    }
  }

  private forecastValue(key: string): string {
    const selectionStart = this.inputElement.selectionStart ?? 0;
    const selectionEnd = this.inputElement.selectionEnd ?? 0;
    const oldValue = this.inputElement.value;
    const selection = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
      key +
      oldValue.substring(selectionStart);
  }
}
