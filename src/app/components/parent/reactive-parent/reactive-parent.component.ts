import { Component } from '@angular/core';
import { ReactiveChildComponent } from "../../child/reactive-child/reactive-child.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'reactive-parent',
	imports: [ReactiveFormsModule, ReactiveChildComponent],
	templateUrl: './reactive-parent.component.html',
	styleUrl: './reactive-parent.component.scss'
})
export class ReactiveParentComponent {
	form: FormGroup;
	show: boolean

	constructor(
		private readonly fb: FormBuilder
	) {
		this.form = this.fb.group({
			allValues: [],
		})

		this.show = false
	}

	nuke = () => this.form.get('allValues')?.patchValue('')

	showInputs = () => this.show = true
}
