import { Component } from '@angular/core';
import { TemplateChildComponent } from "../../child/template-child/template-child.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-parent',
  imports: [FormsModule, TemplateChildComponent],
  templateUrl: './template-parent.component.html',
  styleUrl: './template-parent.component.scss'
})
export class TemplateParentComponent {
  allValues: string[]

  constructor() {
    this.allValues = []
  }

  nuke = () => this.allValues = []
}
