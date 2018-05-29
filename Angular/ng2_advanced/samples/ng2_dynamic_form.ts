export class MyFormComponent implements OnInit {

    myForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        let data:Object = { 
            firstname: '',
            details: this.formBuilder.group({ age: '', })
        };

        this.myForm = this.formBuilder.group(data);

    }
}