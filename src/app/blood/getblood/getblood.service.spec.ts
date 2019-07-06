/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetbloodService } from './getblood.service';

describe('GetbloodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetbloodService]
    });
  });

  it('should ...', inject([GetbloodService], (service: GetbloodService) => {
    expect(service).toBeTruthy();
  }));
});
