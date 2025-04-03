# Reactive vs Template-driven forms in Angular

this is a simple angular application that demonstrates the difference between template-driven and reactive forms.  
i have implemented the same form in each style, in hopes to easily compare and contrast the two methods.  
the form that i have implemented is specified as follows  

__in child component__
* capture text input of comma separated values, using forms
* on submit, append those values to a list of all values. 
* only allow submission when 3 conditions are true
	* there are 5 or more values in the current list
	* red, orange, and yellow are not values in the list
	* there is no trailing comma

__in parent component__
* the parent component maintains a form in which the child component is to be used
* successfully propagate the value from the child form to the parent
* successfully propagate updates from the parent to the child

npm start, then go to localhost:4200/template or localhost:4200/reactive

