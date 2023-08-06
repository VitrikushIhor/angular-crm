import {ElementRef} from '@angular/core';

declare var M: any

export interface materialInstance {
  open?(): void

  destroy?(): void

  close?(): void
}


export interface MaterialDatepicker extends materialInstance {
  date?: Date
}


export class MaterialServices {


  static toast(message: string) {
    M.toast({html: message})
  }

  static initialLizeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): materialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): materialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    })
  }

  static initTapTarget(ref: ElementRef): materialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }
}
