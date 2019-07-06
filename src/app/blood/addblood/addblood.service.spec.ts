/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddbloodService } from './addblood.service';

describe('AddbloodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddbloodService]
    });
  });

  it('should ...', inject([AddbloodService], (service: AddbloodService) => {
    expect(service).toBeTruthy();
  }));
});
