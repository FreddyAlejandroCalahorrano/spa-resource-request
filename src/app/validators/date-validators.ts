import {AbstractControl, ValidatorFn} from "@angular/forms";
import {validateDate} from "../common/utils/validate-date";
import {getTodayPlusNDays} from "../common/utils/fn";

export class DateValidators {

  static dateValid(c: AbstractControl) {
    return validateDate(c.value, 'boolean', 'yyyy-mm-dd') ? null : {date: true}
  }

  static maximumIncomeDateValid(): ValidatorFn {

    return (c: AbstractControl): any => {

      if (c.value < getTodayPlusNDays(15)) {
        return {maximumIncomeDateValid: true}
      }

      return null;
    };

  }

}
