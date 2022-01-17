import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextareaQuestionInterface } from '../../models';
import { JsonConditionsService } from '../../services/json-conditions.service';

@Component({
  selector: 'lib-question-textarea',
  templateUrl: './question-textarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionTextareaComponent {

  @Input() form: FormGroup;
  @Input() field: TextareaQuestionInterface;
  @Input() touched: boolean;
  @Input() dirty: boolean;
  @Input() errors: any;

  constructor(public jsonConditionsService: JsonConditionsService) { }

}
