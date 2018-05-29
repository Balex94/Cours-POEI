import { Injectable } from '@angular/core';

@Injectable()
export class WarriorService {

    public getAll(): Promise<Object[]> {
        return Promise.resolve(
            [
                { name: "kenobi", surname: "obiwan" },
                { name: "vador", surname: "dark" }
            ]
        );
    }
}
