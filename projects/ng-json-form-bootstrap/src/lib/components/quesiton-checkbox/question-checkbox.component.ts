import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CheckboxQuestionInterface } from '../../models';
import { JsonConditionsService } from '../../services/json-conditions.service';

@Component({
  selector: 'lib-question-checkbox',
  templateUrl: './question-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCheckboxComponent {

  @Input() form: FormGroup;
  @Input() field: CheckboxQuestionInterface;
  @Input() touched: boolean;
  @Input() dirty: boolean;
  @Input() errors: any;

  constructor(public jsonConditionsService: JsonConditionsService) { }


}
