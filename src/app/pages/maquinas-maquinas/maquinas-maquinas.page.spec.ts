import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaquinasMaquinasPage } from './maquinas-maquinas.page';

describe('MaquinasMaquinasPage', () => {
  let component: MaquinasMaquinasPage;
  let fixture: ComponentFixture<MaquinasMaquinasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinasMaquinasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaquinasMaquinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
