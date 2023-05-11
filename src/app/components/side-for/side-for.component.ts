import { AfterViewInit, Component } from '@angular/core';
import { toggleSidebar } from '../../../assets/js/scripts.js';
@Component({
  selector: 'app-side-for',
  templateUrl: './side-for.component.html',
  styleUrls: ['./side-for.component.css']
})
export class SideForComponent implements AfterViewInit{
  ngAfterViewInit() {
    toggleSidebar();
  }
  
}
