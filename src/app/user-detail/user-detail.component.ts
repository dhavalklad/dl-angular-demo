import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

    userId!: number;

    paramSubscription!: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {

        //best practice to extract route parameters.

        // this.userId = Number(this.route.snapshot.paramMap.get('id'));

        this.paramSubscription = this.route.params.subscribe((param: Params) => {
            this.userId = param['id'];
        });

        //fetch user detail
    }

    ngOnDestroy(): void {
        this.paramSubscription.unsubscribe();
    }


}
