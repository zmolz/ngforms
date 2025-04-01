import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ListValidators {

	static readonly minItems = (num: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
		if (typeof control.value !== 'string') {
			return {
				invalidType: typeof control.value
			}
		}

		let csv = control.value.split(',')

		return csv.length >= num && csv[num - 1].trim() !== '' ?
			null : { invalidLength: `list given needs ${num - csv.length} more item${csv.length == num - 1 ? '' : 's'}` }
	}

	static readonly doesNotContainValueAtIndex = (value: string, index: number): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
		if (typeof control.value !== 'string') {
			return {
				invalidType: typeof control.value
			}
		}

		let csv = control.value.split(/\s*,\s*/)

		if (index >= csv.length || index * -1 > csv.length) {
			return {
				invalidIndex: `index ${index} out of bounds`
			}
		}

		return csv.at(index) === value ?
			{ invalidValueAtIndex: '' }
			: null
	}



	static readonly noDisallowedWords = (disallowed: Set<string>): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
		if (typeof control.value !== 'string') {
			return {
				invalidType: typeof control.value
			}
		}

		let csv = control.value.split(/\s*,\s*/)

		let culprit;
		if (csv.some(v => {
			culprit = v;
			return disallowed.has(v)
		})) {
			return {
				invalidColor: `${culprit} is a disallowed word`
			}

		}

		return null
	}
}
