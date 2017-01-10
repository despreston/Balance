'use strict';

/*
 * action types
 */

export const ADD_USER = "ADD_USER";

/*
 * action creators
 */

export function addUser(user) {
  console.log(user);
	return { type: ADD_USER, user };
};