import { TestBed } from '@angular/core/testing';
import { combineReducers, select, Store, StoreModule } from '@ngrx/store';

import * as fromActions from '../../actions';
import * as fromReducers from '../../reducers';
import * as fromState from '../../state';
import * as fromSelectors from './progress-bar.selectors';

describe('ProgressBar selectors', () => {
  let store: Store<fromReducers.ActivityState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'activity': combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('ProgressBar selector for visibility: ', () => {
    it('should return visible property value', () => {
      let result;

      store.pipe(select(fromSelectors.getProgressBarVisible))
        .subscribe(value => (result = value));

      expect(result).toEqual(fromState.initialProgressBarState.visible);

      store.dispatch(new fromActions.ProgressbarVisibility(true));
      expect(result).toBeTruthy();

      store.dispatch(new fromActions.ProgressbarVisibility(false));
      expect(result).toBeFalsy();
    });
  });

});
