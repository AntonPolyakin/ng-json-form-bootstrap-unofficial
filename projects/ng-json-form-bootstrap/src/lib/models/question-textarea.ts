import { QuestionBase, QuestionBaseInterface } from './question-base';
import { QuestionsEnum } from './question.enum';

export interface TextareaQuestionInterface extends QuestionBaseInterface {
    minLength?: number;
    maxLength?: number;
    rows?: number;
    spellcheck?: boolean;
}

export class TextareaQuestion extends QuestionBase<string> {
    readonly controlType = QuestionsEnum.TEXTAREA;
    minLength: number;
    maxLength: number;
    rows?: number;
    spellcheck?: boolean;

    constructor(options: TextareaQuestionInterface = {}) {
        super(options);
        this.minLength = options.minLength || null;
        this.maxLength = options.maxLength || null;
        this.rows = options.rows || null;
        this.value = options.value || '';
        this.spellcheck = options.spellcheck || false;
    }
}
