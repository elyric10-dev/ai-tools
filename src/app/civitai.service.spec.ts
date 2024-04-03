import { TestBed } from '@angular/core/testing';

import { CivitaiService } from './civitai.service';

describe('CivitaiService', () => {
  let service: CivitaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CivitaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
