# Bootstrap Json Form
-------------------


## Instal

Install the package (original)

npm:
```bash
npm i ng-json-form-bootstrap
```

Import it in your module file
```ts
import { NgJsonFormModule} from 'ng-json-form';

@NgModule({
  declarations: [ ... ],
  imports: [ 
    NgJsonFormModule, /* <--inside of imports */
    ...
  ]
})

```

## Usage
All you need to do is provide an object for each Field in your form, following the interface below:

In your component, declare the questions Object:
```ts

interface Question {
  [field:string]: Object<ControlType>
  
}
```


#### Example 1: Single text field
In your component, declare the questions Object:
```ts
/* Minimum setup */
public questions = {
  "favorite-color": { /* Question Key */
    "label": "Favorite color?", /* <param-name> :  <param-value> */
  }
}

constructor(){}

// Handle the form value
onFormValueChanged(formValue) {
    console.log(formValue)
}
```

In your template.html add the component and bind the questions and the output to an method
```html
<ng-json-form 
  [questions]="questions" 
  (valueChanged)="handleChanges($event)" >
</ng-json-form>
```

And you've got:

<img src="/projects/ng-json-form-bootstrap/src/assets/img/example-field.png" width="300px">

#### Example 2: Complex form
In your component, declare the questions Object:
```ts
public questions = {
  textboxExample: {
    key: 'textboxExample',
    controlType: 'textbox',
    label: 'Textbox Question',
    helpText: 'Please provide all information',
    required: false,
    order: 1,
    disabled: true,
    size: 12,
    type: 'text',
    value: 'The house of sunshine',
    
  },
  rangeExample: {
    key: 'rangeExample',
    controlType: 'range',
    label: 'Range question',
    step: 1,
    min: 50,
    max: 100,
    value: 25,
    order: 2,
    required: true,
    helpText: 'Please provide all information',
    readonly: false,
    disabled: false,
    size: 12,
    placeholder: ''
  },
  DropdownExample: {
    key: 'DropdownExample',
    controlType: 'dropdown',
    label: 'Dropdown question',
    required: true,
    order: 4,
    trackKey: 'id',
    viewValue: 'label',
    helpText: 'Please provide all information',
    value: {
      label: 'Apartament',
      id: 1
    },
    options: [
      {
        label: 'Apartament',
        id: 1
      },
      {
        label: 'House',
        id: 2
      },
      {
        label: 'Flat',
        id: 3
      }
    ]
  },
  RadioExample: {
    key: 'RadioExample',
    controlType: 'radio',
    label: 'Radio Question',
    required: true,
    order: 4,
    trackKey: 'id',
    viewValue: 'label',
    value: 2,
    options: [
      {
        label: 'radio option 01',
        id: 1
      },
      {
        label: 'radio option 02',
        id: 2
      },
      {
        label: 'radio option 03',
        id: 3
      }
    ],
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  CheckBoxExampleA: {
    key: 'CheckBoxExampleA',
    controlType: 'checkbox',
    label: 'Checkbox item A',
    required: true,
    order: '8',
    value: null,
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  CheckBoxExampleB: {
    key: 'CheckBoxExampleB',
    controlType: 'checkbox',
    label: 'Checkbox item B',
    required: true,
    order: '10',
    value: null,
    readonly: false,
    disabled: false,
    size: null,
    helpText: '',
    placeholder: ''
  },
  TextAreaExample: {
    key: 'TextAreaExample',
    controlType: 'textarea',
    label: 'Textarea question',
    rows: 3,
    order: 8,
    required: true,
    minLength: 2,
    maxLength: 100,
    readonly: false,
    disabled: false,
    size: 12,
    helpText: 'Hello, leave a cool message',
    placeholder: 'My Placeholder'
  }
}

constructor(){}

// Handle the form value
onFormValueChanged(formValue) {
    console.log(formValue)
}
```

In your template.html add the component and bind the questions and the output to an method
```html
<ng-json-form 
  [questions]="questions" 
  (valueChanged)="handleChanges($event)" >
</ng-json-form>
```

And you've got:

<img src="/projects/ng-json-form-bootstrap/src/assets/img/example-complex.png">

###### IMPORTANT: The Questions Object is Immutable, the component it'self doesn't change the object, instead it emmits a new value from the output binding everytime the form changes

### Input Types 
All inputs extends [Base Configuration](#base-input-default-configuration)

#### Textbox
| Property      | Type                               | Description                                                                                                                     | 
|---------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `type`        | _string_ \| [Type](#type) | Define the input type. Default: `textbox`
| `minLength`   | _number_                           | Min length of the field. Default `null`
| `maxLength`   | _number_                           | Max length of the field. Default `null`
| `pattern`     | _RegExp_ \| _string_               | Pattern  of the field. Default `null`

#### Textarea
| Property      | Type     |  Description                                                                                                                                         |
|---------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `minLength`   | _number_ | Min length of the field. Default `null`
| `maxLength`   | _number_ | Max length of the field. Default `null`
| `rows`        | _number_ | Number of rows. Default `null`

#### Range
| Property      | Type     |  Description                                                                                                                                         |
|---------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `step`        | _number_ |  Distance between each step. Default `1`
| `min`         | _number_ |  Min value of the scale. Default `0`
| `max`         | _number_ |  Maximum value of the scale. Default `10`
| `iconStart`   | _string_ |  Icon class of the icon in the beggining of the scale. Default: `fa fa-plus`
| `iconEnd`     | _string_ |  Icon class of the icon in the ending of the scale. Default: `fa fa-minus`

#### Radio
| Property      | Type                 |  Description                                                                                                                                         |
|---------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`     | Array\<Object\>      |  Options available to be chosen. Default `[]`
| `trackKey`    | _string_             |  Whick key of option list should be used as value. Default `id`
| `viewValue`   | _string_             |  Whick key of option list should be used as label. Default `label`
| `value`       | _string_ \| _number_ |  Value. Default: `''`

#### Dropdown
| Property      | Type            |  Description                                                                                                                                         |
|---------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`     | Array\<Object\>      |  Options available to be chosen. Default `[]`
| `trackKey`    | _string_             |  Whick key of option list should be used as value. Default `id`
| `viewValue`   | _string_             |  Whick key of option list should be used as label. Default `label`
| `value`       | _Object_ |  Value. Default: `''`

#### Checkbox
| Property      | Type            |  Description                                                                                                                                         |
|---------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `trackKey`    | _string_  |  Whick key of option list should be used as value. Default `id`
| `viewValue`   | _string_  |  Whick key of option list should be used as label. Default `label`
| `value`       | _boolean_ |  Value. Default: `false`


#### Base input default configuration
| Property      | Type                                     |  Description                                                                                                                                         |
|---------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `controlType` | [ControlType](#controltype)              | Define which input will be rendered: Options available: ["checkbox", "radio", "dropdown", "range", "textarea", "textbox", "list"] Default: `textbox` |
| `disabled`    | _boolean_                                | Disabled status of the field Default: `false`                                                                                                        |
| `helpText`    | _string_                                 | Short text describing the field, appears below the field and below above  the errors messages Default: `''`                                          |
| `key`         | _string_                                 | Unique ID, Default: Object key or `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`                                                                      |
| `label`       | _string_                                 | Label of the input, shown on top of the field Default: `''`                                                                                          |
| `order`       | _number_                                 | Define which position in the order the field should be displayed Default: `1`                                                                        |
| `placeholder` | _string_                                 | Value of the field placeholder, shown when there is no value in the field. Default: `label` value                                                    |
| `readonly`    | _boolean_                                | Define if the field is text only or not;  Default: `false`;                                                                                          |
| `required`    | _boolean_                                | Define if the field is mandatory or not; Default:  `false`;                                                                                          |
| `size`        |_number_                                  | Value of bootstrap grid, from 1(8.5%) to 12 (100%) Default: `null`                                                                                     |
| `value`       | _string_ \| _number_                     | Value of the field Default:`null`                                                                                                                     |
| `class`       | _string_                                 | Custom CSS class (as a string); Default: `''` |
| `hidden`       | _boolean_ \| _Settings_ (see: [json-conditions](https://github.com/raisely/json-conditions)   | Define if the field is hidden or not; Default: `false` |

### Enums
##### ControlType
| Values        |
|---------------|
| `text`        | 
| `password`    |
| `email`       |
| `number`      |
| `search`      |
| `tel`         |
| `file`        |
| `image`       |
| `url`         |

##### Type
| Values        |
|---------------|
| `checkbox`    |
| `radio`       |
| `dropdown`    |
| `range`       |
| `textarea`    |
| `textbox`     |
| `list`        |


# Advantages of the unofficial version:
- Removed BrowserModule, which in some cases did not allow the library to be imported into the Angular module
- Support for the [class] attribute via the "class" property
- Support for [size] attribute of dropdown menu via "selectSize" property
- Support for multiple selections in dropdown menus via the "multiple" property
- Added the "hidden" field

# NgDynamicForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

