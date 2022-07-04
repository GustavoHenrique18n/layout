import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-registro-amostra',
  templateUrl: './registro-amostra.component.html',
  styleUrls: ['./registro-amostra.component.css']
})
export class RegistroAmostraComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  constructor() { }


  ngOnInit(): void {
  }

}
