import { Routes } from '@angular/router';
import { ReactiveParentComponent } from './components/parent/reactive-parent/reactive-parent.component';
import { TemplateParentComponent } from './components/parent/template-parent/template-parent.component';

export const routes: Routes = [
	{ path: 'template', component: TemplateParentComponent },
	{ path: 'reactive', component: ReactiveParentComponent },
	{ path: '**', redirectTo: 'reactive' },
];
