import { TestBed } from '@angular/core/testing';

import { ProductNodeService } from './product-node.service';

describe('ProductNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductNodeService = TestBed.get(ProductNodeService);
    expect(service).toBeTruthy();
  });
});
