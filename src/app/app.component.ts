import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dl-practice';

  // constructor(private authService: AuthService) {
  // }

  ngOnInit(): void {
    console.log('app component called');
    // this.authService.autoLogin();
  }
}
