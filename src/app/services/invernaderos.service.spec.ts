import { TestBed } from '@angular/core/testing';

import { InvernaderosService } from './invernaderos.service';

describe('InvernaderosService', () => {
  let service: InvernaderosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvernaderosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
