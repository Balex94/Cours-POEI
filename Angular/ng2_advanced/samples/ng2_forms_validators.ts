export class MyFormComponent implements OnInit {
    
        myForm: FormGroup;
    
        constructor(private formBuilder: FormBuilder) { }
    
        ngOnInit() {
    
            let data:Object = { 
                firstname: ['', Validators.required],
                details: this.formBuilder.group(
                    { 
                        age: ['', Validators.required], 
                    }
                )
            };
    
            this.myForm = this.formBuilder.group(data);
    
        }
    }