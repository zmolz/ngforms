import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ListValidators } from '../../../validators/list.validators';

@Component({
	selector: 'reactive-child',
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './reactive-child.component.html',
	styleUrl: './reactive-child.component.scss',
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
		const noWarmColors = ListValidators.noDisallowedWords(warmColors)
		const noTrailingComma = ListValidators.doesNotContainValueAtIndex(',', -1)

		this.form = this.fb.group({
			// control name: [ initial value, list of validators ]
			currValues: ['', [noWarmColors, noTrailingComma, ListValidators.minItems(5)]]
		})
	}

	submit() {
		const currValues: string[] = this.form.get('currValues')?.value.split(/\s*,\s*/)
		this.allValues = this.allValues.concat(currValues)
		this.form.get('currValues')?.patchValue('')

		// notify parent that value has changed -- pass the value we want to track
		console.log('updating control in parent, from child')
		this._onChange(this.allValues)
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