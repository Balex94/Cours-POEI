import { TestBed, inject } from '@angular/core/testing';

import { WarriorService } from './warrior.service';

describe('WarriorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WarriorService]
        });
    });

    it('should return at least 2 warriors',
        inject([WarriorService],
            (service: WarriorService) => {
                service.getAll().then(
                    (tab: Object[]) => {
                        expect(tab.length).toBeGreaterThan(1);
                    }
                );
            }
        )
    );
});
