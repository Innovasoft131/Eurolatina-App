import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaquinasEnProcesoPage } from './maquinas-en-proceso.page';

describe('MaquinasEnProcesoPage', () => {
  let component: MaquinasEnProcesoPage;
  let fixture: ComponentFixture<MaquinasEnProcesoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinasEnProcesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaquinasEnProcesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
