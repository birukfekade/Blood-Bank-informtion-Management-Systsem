/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransferbloodService } from './transferblood.service';

describe('TransferbloodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferbloodService]
    });
  });

  it('should ...', inject([TransferbloodService], (service: TransferbloodService) => {
    expect(service).toBeTruthy();
  }));
});
