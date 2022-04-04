class Observer {
  private targets: Map<Element, { action: () => any; context: any, once: boolean }>;
  private observer: IntersectionObserver;

  public constructor() {
    this.targets = new Map();
    this.observer = new IntersectionObserver(this.trigger.bind(this));
  }

  private trigger(actions: any) {
    actions.forEach((a: IntersectionObserverEntry) => {
      if (a.isIntersecting) {
        const target = this.targets.get(a.target);
        if (!target) {
          return;
        }
        target.action.call(target.context);
        target.once && this.deleteTarget(a.target);
      }
    })
  }

  public addTarget(target: Element, action: () => any, context?: any, once = true) {
    this.targets.set(target, {
      action,
      context,
      once
    });
    this.observer.observe(target);
  }

  public deleteTarget(target: Element) {
    this.observer.unobserve(target);
    this.targets.delete(target);
  }
}

const observer = new Observer();

export default observer;
