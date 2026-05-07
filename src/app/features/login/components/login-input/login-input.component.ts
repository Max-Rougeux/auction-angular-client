import {Component, forwardRef, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-login-input',
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './login-input.component.html',
  styles: `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 1000px transparent inset;
      -webkit-text-fill-color: #fff;
      transition: background-color 5000s ease-in-out 0s;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginInputComponent),
      multi: true
    }
  ]
})
export class LoginInputComponent {

  type = input.required<string>();
  name  = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  hasError = input.required<boolean>();

  value: string = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  writeValue(val: string)  { this.value = val ?? ''; };
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
}
