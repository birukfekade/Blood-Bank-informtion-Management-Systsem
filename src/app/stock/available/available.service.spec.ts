/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AvailableService } from './available.service';

describe('AvailableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableService]
    });
  });

  it('should ...', inject([AvailableService], (service: AvailableService) => {
    expect(service).toBeTruthy();
  }));
});
