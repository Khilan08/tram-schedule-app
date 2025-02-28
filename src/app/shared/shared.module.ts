import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [],
    imports: [
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        NgSelectModule,
        FormsModule
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        NgSelectModule,
        FormsModule
    ],
    bootstrap: []
})
export class SharedModule { }