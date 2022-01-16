import { Observable } from 'rxjs';
import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface DropdownQuestionInterface extends QuestionBaseInterface {
    // tslint:disable-next-line:max-line-length
    options?: Observable<{ key?: number | string, value?: any, [kkey: string]: any }[]> | { key?: number | string, value?: any, [kkey: string]: any }[];
    trackKey?: string;
    viewValue?: string;
    
    //new
    selectSize?: number;
    multiple?: boolean;
    class?:string;
}

export class DropdownQuestion extends QuestionBase<string> {
    readonly controlType = QuestionsEnum.DROPDOWN;
    // tslint:disable-next-line:max-line-length
    options: Observable<{ key?: number | string, value?: any, [kkey: string]: any }[]> | { key?: number | string, value?: any, [kkey: string]: any }[];
    trackKey = 'key';
    viewValue = 'value';

    //new
    selectSize?: number;
    multiple?: boolean;
    class?:string;

    constructor(options: DropdownQuestionInterface = {}) {
        super(options);
        this.options = options.options || [];
        this.trackKey = options.trackKey || 'key';
        this.viewValue = options.viewValue || 'value';
        //new
        this.selectSize = options.selectSize || null;
        this.multiple = options.multiple || null;
        this.class = options.class || '';
    }
}
