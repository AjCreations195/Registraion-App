// import { Injectable } from '@angular/core';
// import {  docData, Firestore } from '@angular/fire/firestore';
// import { doc, setDoc, updateDoc } from 'firebase/firestore';
// import { from, Observable, of, switchMap } from 'rxjs';
// import { UserProfile } from '../models/user-profile.model';
// import { AuthenticationService } from './authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

  
//   constructor(private fireStore:Firestore,
//     private authenticationService:AuthenticationService) { }

//   addUser(user:UserProfile): Observable<any>{
//     const ref = doc(this.fireStore, 'users',user?.uid)
//     return from(setDoc(ref,user))
//   }

//   updateUser(user:UserProfile): Observable<any>{
//     const ref = doc(this.fireStore, 'users',user?.uid)
//     return from(updateDoc(ref,{...user}))
//   }

//   get currentUserProfile$():Observable<UserProfile |null >{
//     return this.authenticationService.currentUser$.pipe(
//       switchMap(user =>{
//         if(!user?.uid){
//           return of(null);
//         }
//         console.log(user);
        
//         const ref = doc(this.fireStore, 'users',user?.uid)
//      return docData(ref) as Observable<UserProfile>;
//       })
//     )
//   }
 
// }
