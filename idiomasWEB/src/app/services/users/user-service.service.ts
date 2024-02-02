import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore
) {
      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
     }

   public getListUsersBloq(){
    let b = this.dbf.collection<User>('/users',ref => ref.where("bloqued","==",1));
    return b.valueChanges();
   }

   public getListUsersNoBloq(){
    let b = this.dbf.collection<User>('/users',ref => ref.where("bloqued","==",0));
    return b.valueChanges();
   }

   public getListUsersAdmin(){
    let b = this.dbf.collection<User>('/users',ref => ref.where("role_id","==","1"));
    return b.valueChanges();
   }

   public getListUsersNoAdmin(){
    let b = this.dbf.collection<User>('/users',ref => ref.where("role_id","==","2"));
    return b.valueChanges();
   }

   public getUserByUsernameandPass(email,pass){
    let b = this.dbf.collection<User>('/users',ref => ref.where("email","==",email).where("password","==",pass).limit(1));
     return b.valueChanges();
   }


  public getUser(id:string){
    let a=new User();
     let af= this.dbf.doc<User>(`users/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data().id;
      a.email=arg.payload.data().email;
      a.password=arg.payload.data().password;
      a.username=arg.payload.data().username;
      a.bloqued=arg.payload.data().bloqued;
      a.role_id=arg.payload.data().role_id;
    });
    return a;
  }
  public getLoggedUser(){
    return this.ngFireAuth.currentUser;
  }

  public login(email:string,pass:string){
    return this.ngFireAuth.signInWithEmailAndPassword(email, pass);
   
  }
   // Reset Forggot password
   ForgotPassword(passwordResetEmail: string) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async changePass(pass){
    let u=await this.ngFireAuth.currentUser;
    u.updatePassword(pass);
  }

  bloquearUser(id,tipoBloqueo){
    this.dbf.doc(`users/${id}`).set({
      bloqued: tipoBloqueo,
    },{merge:true});
  }

  AdminUser(id,rol){
    this.dbf.doc(`users/${id}`).set({
      role_id: rol,
    },{merge:true});
  }

  public editUser(id:string, username:string,pass:string,email:string){
    this.dbf.doc(`users/${id}`).set({
      username: username,
      password: pass,
      email:email
    },{merge:true});
  }

  public async deleteUser(id:string){
   let a= await this.ngFireAuth.currentUser;
   a.delete();
    let af= this.dbf.doc<User>(`users/${id}`);
    af.delete();
  }

  public async createUser(username:string,pass:string,email:string,rol){
    const userAuth = await this.ngFireAuth.createUserWithEmailAndPassword(email, pass);
    var user = {
      username: username,
      password: pass,
      email: userAuth.user.email,
      id: userAuth.user.uid
  }
  let u=new User();
  u.email=email;
  u.password=pass;
  u.username=username;
  u.id=userAuth.user.uid;
  u.bloqued=0;
  u.role_id=rol;
  this.SetUserData(user);
  return u;
  }


// Returns true when user is looged in
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return user !== null ? true : false;
}
// Sign in with Gmail
// GoogleAuth() {
//   return this.AuthLogin(new auth.GoogleAuthProvider());
// }
// Auth providers
AuthLogin(provider) {
  return this.ngFireAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error);
    });
}
// Store user in localStorage
SetUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
    `users/${user.id}`
  );
  const userData: User = {
    id: user.id,
    email: user.email,
    username: user.username,
    password: user.password,
    bloqued:0,
    role_id:user.role_id
  };
  return userRef.set(userData, {
    merge: true,
  });
}
// Sign-out
SignOut() {
  return this.ngFireAuth.signOut().then(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoginRegister');
    localStorage.removeItem('rol_Id');
    this.router.navigate(['login']);
  });
}
}
export class User{
  id:string;
  username:string;
  password:string;
  email:string;
bloqued:number;
role_id:string;
 }