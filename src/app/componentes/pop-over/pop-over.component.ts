import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

  constructor(private router: Router,
              private popoverctrl: PopoverController) { }

  ngOnInit() {}
  Salir(){
    localStorage.clear()
    this.router.navigate(['home'])
    this.popoverctrl.dismiss();
  }
}
