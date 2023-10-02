import { Directive, ElementRef, HostListener } from "@angular/core";


@Directive({
  selector: '[appSpacing]'
})
export class SpacingDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    const inputValue = this.el.nativeElement.value;

    if (inputValue) {
      // Split the input value by periods ('.')
      const parts = inputValue.split('.');

      if (parts.length >= 4) {
        // Add hyphens as thousands separators in the fourth part (index 3)
        parts[3] = parts[3].replace(/\B(?=(\d{3})+(?!\d))/g, '-');

        // Join the parts back together with periods
        const formattedValue = parts.join('.');

        // Update the input field with the modified value
        this.el.nativeElement.value = formattedValue;
      }
    }
  }

}
