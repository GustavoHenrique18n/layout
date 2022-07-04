import { Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-termodecoleta-cadastro',
  templateUrl: './termodecoleta-cadastro.component.html',
  styleUrls: ['./termodecoleta-cadastro.component.css']
})
export class TermoDeColetaComponent implements OnInit {

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
