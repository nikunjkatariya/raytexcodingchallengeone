import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loancalculation';

  LoanCalculator:any;
  constructor(private fb:FormBuilder,private ds:DataService){}
  ngOnInit(): void {
    this.LoanCalculator=this.fb.group({
      Amount:['',Validators.required],
      Years:['',Validators.required],
      InterestRate:['',Validators.required],
      InterestType:[1,Validators.required]
    });

  }

  showtable=false;
  YearlyAmount=0;
  YearlyInterest=0;
  Balance=0;
  RemainingBalance=0;
  Year=1;

  Calculation:any;

  onSubmit(data:FormGroup){
    this.showtable=true;
    if(data.value.InterestType==1)
    {
      for(let Year=1;Year<=Number(data.value.Years); Year++)
      {
        this.YearlyAmount=Number(data.value.Amount)*Math.pow((1+Number(data.value.InterestRate)/1),(1*Year));
        console.log(this.YearlyAmount);
      }
    }
    if(data.value.InterestType==2)
    { 
      this.YearlyAmount=Number(data.value.Amount)/Number(data.value.Years);         
      this.YearlyInterest=data.value.Amount*(Number(data.value.InterestRate)/100);  
      this.Balance=Number(data.value.Amount)+Number(this.YearlyInterest*Number(data.value.Years));

      // var arrsize=Number(data.value.Years);
      // let CalculateInterest:string[arrsize][];
      for(let Year=1;Year<=Number(data.value.Years); Year++)
      {
        this.RemainingBalance=this.Balance-this.YearlyInterest-this.YearlyAmount;
        console.log("Year: "+Year+" Balance: "+ this.Balance+" Interest: "+this.YearlyInterest +" Principal: "+this.YearlyAmount+" Remaining Balance: "+this.RemainingBalance);
        this.Calculation={
          "id":Year,
          "Year": Year,
          "Balance":this.Balance,
          "Interest":this.YearlyInterest,
          "Principal":this.YearlyAmount,
          "RBalance":this.RemainingBalance
        };
        this.ds.pushdata(this.Calculation).subscribe(data=>console.log(data));
        this.Balance=this.RemainingBalance;
      }
    }
    // this.ds.getdata().subscribe(data=>console.log(data));
  }
}
