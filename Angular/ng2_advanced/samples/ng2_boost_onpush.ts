@Component({
    template: `
      <h2>{{data.name}}</h2>
      <span>{{data.surname}}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  class WarriorComponent {
    @Input() data;
  }