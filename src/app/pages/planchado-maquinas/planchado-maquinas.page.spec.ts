import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanchadoMaquinasPage } from './planchado-maquinas.page';

describe('PlanchadoMaquinasPage', () => {
  let component: PlanchadoMaquinasPage;
  let fixture: ComponentFixture<PlanchadoMaquinasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanchadoMaquinasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanchadoMaquinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
