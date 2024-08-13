import { Component, Input, signal, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // NO ASYNC
    // before render: corre antes de que se renderice, corre solo una vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render: corre antes y durante que la renderización
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log('Changes:', changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue != duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    // after render: corre después de que se renderice, corre solo una vez
    // async, then, subscribe
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);

    // Asegurar que el código se ejecuta solo en el entorno del navegador
    if (typeof window !== 'undefined') {
      this.counterRef = window.setInterval(() => {
        console.log('run interval');
        this.counter.update((statePrev) => statePrev + 1);
      }, 1000);
    }
  }

  ngAfterViewInit() {
    // after render: corre después de que se renderice
    // hijos ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));

    // Asegurar que el código se ejecuta solo en el entorno del navegador
    if (typeof window !== 'undefined' && this.counterRef) {
      window.clearInterval(this.counterRef); // Destruye el intervalo
    }
  }

  doSomething() {
    console.log('change duration');
    // async
  }
}
