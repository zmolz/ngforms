import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CsvValidators } from '../../../validators/csv.validators';

@Component({
	selector: 'reactive-child',
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './reactive-child.component.html',
	styleUrl: './reactive-child.component.scss',
	// this is how we let angular know we implemented cva
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: ReactiveChildComponent,
		multi: true
	}]
})
export class ReactiveChildComponent implements ControlValueAccessor {
	form: FormGroup
	allValues: string[] = []

	// cva methods
	_onChange: (_: any) => void = () => { }
	_onTouched: (_: any) => void = () => { }

	constructor(
		private readonly fb: FormBuilder
	) {
		const warmColors = new Set(['red', 'orange', 'yellow'])
		const noWarmColors = CsvValidators.noDisallowedWords(warmColors)
		const noTrailingComma = CsvValidators.doesNotContainValueAtIndex('', -1) // empty space means last el was ','

		this.form = this.fb.group({
			// control name: [ initial value, list of validators ]
			currValues: ['', [noWarmColors, noTrailingComma, CsvValidators.minItems(5)]]
		})
	}

	submit() {
		const currValues: string[] = this.form.get('currValues')?.value.split(/\s*,\s*/)
		this.allValues = this.allValues.concat(currValues)

		// notify parent that value has changed -- pass the value we want to track
		console.log('updating control in parent, from child')
		this._onChange(this.allValues)
		this.form.get('currValues')?.patchValue('')
	}

	// implicitly called by parent when form value changes in parent, to update child component
	writeValue(value: string[]): void {
		console.log('writing value to child, from parent')
		if (value) {
			this.allValues = value
		} else {
			this.allValues = []
		}
	}

	registerOnChange(fn: (_: any) => void) {
		this._onChange = fn
	}

	registerOnTouched(fn: (_: any) => void) {
		this._onTouched = fn
	}
}