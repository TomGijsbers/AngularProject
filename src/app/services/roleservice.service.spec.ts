import { TestBed } from '@angular/core/testing';

import { RoleService } from './roleservice.service';

describe('RoleserviceService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
