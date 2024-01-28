import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  @Input() public total: number = 0;
  @Input() public section: string = ''

  @Output() itemSelected = new EventEmitter<any>();

  options: any[] = [];

  ngOnInit() {
    this.options = this.generateOptions();
  }

  generateOptions() {
    const options = [];
    for (let i = 1; i <= this.total; i++) {
      options.push({
        value: i,
        label: `${i}`
      });

    }
    return options;
  }

  onSelect(event: any) {
    console.log('EVENTO')
    const selectedItem = event.target.value;
    console.log(selectedItem)
    this.itemSelected.emit(selectedItem);
  }
}
