import { Observable } from "rxjs";

export function createHttpObservable(url: string) {

  const controller = new AbortController();
  const signal = controller.signal;

  return Observable.create(observer => {
    fetch(url, { signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error('Req failed with code: ' + response.status);
        }
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}