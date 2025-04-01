import { Component, computed, EventEmitter, Input, Output, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'template-child',
  imports: [FormsModule],
  templateUrl: './template-child.component.html',
  styleUrl: './template-child.component.scss'
})
export class TemplateChildComponent {


  currValues: WritableSignal<string> = signal('')
  currValuesList: Signal<string[]> = computed(() => this.currValues().split(/\s*,\s*/))
  canAddValues: Signal<boolean> = computed(() => {
    const warmColors = new Set(['red', 'orange', 'yellow'])

    // no trailing commas
    if (this.currValuesList().at(-1) === '') return false
    // min 5 items
    if (this.currValuesList().length < 5) return false
    // no warm colors
    if (this.currValuesList().some(v => warmColors.has(v))) return false

    return true
  })
  @Input() allValues: string[] = []
  // the fact that this works really grinds my gears! THIS FEATURE DEPENDS ON HOW YOU NAME YOUR VARIABLES
  @Output() allValuesChange = new EventEmitter<string[]>();
  
  submit() {
    this.allValues = this.allValues.concat(this.currValuesList())
    
    console.log('writing value to parent, from child')
    this.allValuesChange.emit(this.allValues)
    this.currValues.set('')
  }
}