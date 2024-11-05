import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentInput } from './investment-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, UserInputComponent, InvestmentResultsComponent ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  resultsData?: {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalAmountInvested: number;
  }[];
  // Method 
  onCalculateInvestmentResults(data: 
    /*{ // We can pass as parameters or as an object. {} is used to pass as an object
    initialInvestment:number, 
    duration:number, 
    annualInvestment:number, 
    expectedReturn:number}*/ InvestmentInput) 
    {
    // JavaScript destructuring syntax. {}=data;
    const {initialInvestment, duration, annualInvestment, expectedReturn} = data;
    const annualData = [];
    let investmentValue = initialInvestment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
  
    this.resultsData = annualData;
  }
}
