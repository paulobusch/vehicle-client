import { SnackbarService } from 'ngx-snackbar';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackService {
   constructor(private snackbarService: SnackbarService) {}

    open(msg: string, timeout: number = 3000) {
        this.snackbarService.add({
            msg,
            timeout,
            customClass: 'snack-bar',
            action: {
                text: 'OK',
                onClick: () => {}
            },
            onAdd: () => {},
            onRemove: () => {}
        });
    }
}
