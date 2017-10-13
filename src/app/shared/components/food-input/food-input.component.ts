import { Component, ElementRef, Input, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { MetaService } from '../../../core/meta/meta.service';

@Component({
  selector: 'dd-food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FoodInputComponent),
      multi: true
    }
  ]
})
export class FoodInputComponent implements ControlValueAccessor {
  @Input() public placeholder: string = 'Enter desired food';
  public isLink: boolean = false;
  public linkDescription: string = '';

  private innerValue: string;
  private descriptionSubscription: Subscription;

  @ViewChild('input') private inputElement: ElementRef;

  private onChange: any = () => { };
  private onTouched: any = () => { };
  get value() { return this.innerValue; }
  set value(val: string) {
    this.innerValue = val;
    this.updateIsLink(val);
    this.refreshDescription(val);
    this.onChange(val);
  }

  constructor(private metaService: MetaService) { }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  public focus() {
    this.inputElement.nativeElement.focus();
  }

  private updateIsLink(value: string) {
    const isLink = value && (value.startsWith('http://') || value.startsWith('https://'));
    this.isLink = isLink;
  }

  private refreshDescription(value: string) {
    if (this.descriptionSubscription) {
      this.descriptionSubscription.unsubscribe();
    }

    if (this.isLink) {
      this.descriptionSubscription = this.metaService.getMeta(value).subscribe(meta => {
        this.linkDescription = meta.title || 'Link...';
      }, (error) => {
        this.linkDescription = 'Link...';
      });
    } else {
      this.linkDescription = '';
    }
  }
}
