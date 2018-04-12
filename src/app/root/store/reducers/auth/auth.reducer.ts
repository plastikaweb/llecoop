import * as fromAuth from '../../actions';
import * as fromState from '../../state';

export function reducer(state = fromState.initialAuthState,
                        action: fromAuth.AuthActions): fromState.AuthState {
  switch (action.type) {
    case fromAuth.GET_AUTHENTICATION_FAIL:
    case fromAuth.AUTHENTICATE_FAIL:
    case fromAuth.LOGOUT: {
      return { ...state, authenticated: false };
    }
    case fromAuth.GET_AUTHENTICATION_SUCCESS:
    case fromAuth.AUTHENTICATE_SUCCESS: {
      return { ...state, authenticated: true };
    }
  }
  return state;
}

export const getIsAuthenticatedState = (state: fromState.AuthState) =>
  state.authenticated;
