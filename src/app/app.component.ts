import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Rick and Morty';
}
