import {FormControl} from "@angular/forms";
import {DateValidators} from "./date-validators";
import {getTodayPlusNDays} from "../common/utils/fn";

describe('Validators', () => {

  it('debe ser una fecha invalida [2022-02-30]', () => {
    const control = new FormControl('2022-02-30');
    expect(DateValidators.dateValid(control)).not.toBeNull()
  })

  it('debe ser una fecha valida [2022-06-15]', () => {
    const control = new FormControl('2022-06-15');
    expect(DateValidators.dateValid(control)).toBeNull()
  })

  it('should return null when date is valid', () => {
    const control = new FormControl(getTodayPlusNDays(15),
      [DateValidators.maximumIncomeDateValid()]);
    expect(
      control.hasError('maximumIncomeDateValid')
    ).toBeFalsy()
  })

  it('should return true when date is invalid', () => {
    const control = new FormControl(getTodayPlusNDays(14),
      [DateValidators.maximumIncomeDateValid()]);
    expect(
      control.hasError('maximumIncomeDateValid')
    ).toBeTruthy()
  })
})
