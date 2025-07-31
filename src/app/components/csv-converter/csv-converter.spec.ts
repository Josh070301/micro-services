import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvConverter } from './csv-converter';

describe('CsvConverter', () => {
  let component: CsvConverter;
  let fixture: ComponentFixture<CsvConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvConverter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
