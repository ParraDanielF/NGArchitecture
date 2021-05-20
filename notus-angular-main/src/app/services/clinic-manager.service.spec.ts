import { TestBed } from '@angular/core/testing';

import { ClinicManagerService } from './clinic-manager.service';

describe('ClinicManagerService', () => {
  let service: ClinicManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
