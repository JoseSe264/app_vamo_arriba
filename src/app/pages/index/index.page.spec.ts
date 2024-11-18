import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexPage } from './index.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment} from 'src/environments/environment'



describe('IndexPage', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;

  beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports :[
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule
    ],
    declarations: [IndexPage],
  }).compileComponents();


    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
