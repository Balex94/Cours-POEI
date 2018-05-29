// exemple d'une classe de composant JediComponent
@Component(
    { 
        selector: 'jedi', 
        template: 'Hello Jedi {{rank}} !' 
    }
)
class JediComponent {
    rank: string = 'Master';
}