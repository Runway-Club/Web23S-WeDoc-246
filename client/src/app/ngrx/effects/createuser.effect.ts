import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as CreateUser from '../actions/createuser.action';

@Injectable()
export class CreateUserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[User] Create User'),
      switchMap((action: any) => {
        return this.userService.post(action.user);
      }),
      map((user) => {
        return CreateUser.createUserSuccess({ user: <UserModel>user });
      }),
      catchError((error) => of(CreateUser.createUserFailure({ error })))
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[User] Get User'),
      switchMap((action: any) => this.userService.getProfile(action.id)),
      map((user) => {
        return CreateUser.getUserSuccess({ user: <UserModel>user });
      }),
      catchError((error) => of(CreateUser.getUserFailure({ error })))
    );
  });

  getUserByGmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[User] Get User'),
      switchMap((action: any) => this.userService.getProfileByEmail(action.email)),
      map((user) => {
        return CreateUser.getUserSuccess({ user: <UserModel>user });
      }),
      catchError((error) => of(CreateUser.getUserFailure({ error })))
    );
  });
}
