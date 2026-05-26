export interface Observer<T> {
    update(event: T): void;
}

export interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(event: T): void;
}

export class DomainEventPublisher<T> implements Subject<T> {
    private observers: Observer<T>[] = [];

    attach(observer: Observer<T>): void {
        this.observers.push(observer);
    }

    detach(observer: Observer<T>): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(event: T): void {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }
}
