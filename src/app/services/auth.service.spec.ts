import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthStub: Partial<AngularFireAuth>;

  beforeEach(() => {
    afAuthStub = {
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve()),
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve()),
    };

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
      ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthStub }, // Mock de AngularFireAuth
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debe registrar un usuario correctamente', async () => {
    const user = { email: 'test@example.com', password: '123456' };
    await service.register(user);
    expect(afAuthStub.createUserWithEmailAndPassword).toHaveBeenCalledWith(user.email, user.password);
  });
  it('debe iniciar sesión correctamente', async () => {
    const email = 'test@example.com';
    const password = '123456';
    await service.login(email, password);
    expect(afAuthStub.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });
  
});
