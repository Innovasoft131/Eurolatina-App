import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanchadoEnProcesoPage } from './planchado-en-proceso.page';

describe('PlanchadoEnProcesoPage', () => {
  let component: PlanchadoEnProcesoPage;
  let fixture: ComponentFixture<PlanchadoEnProcesoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanchadoEnProcesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanchadoEnProcesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
