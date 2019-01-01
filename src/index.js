/* @flow */

export const PULL_STREAM_BROKE_PROTOCOL = "Pull stream broke a protocol requirement.";

/* Synchronous Iteration */

export type SugarlessIteratorResult<Value> = {|
  done: false,
  value: Value,
|} | {|
  done: true | Error,
|};

export interface SugarlessIterator<Value> {
  next(): SugarlessIteratorResult<Value>;
}

export type Start<Initial, IteratorOutput> = (source: Initial) => SugarlessIterator<IteratorOutput>;

export type IteratorTransform<Input, Output> = (source: SugarlessIterator<Input>) => SugarlessIterator<Output>;

export type Finish<IteratorInput, Final> = (source: SugarlessIterator<IteratorInput>) => Final;

/* Asynchronous Iteration (these are pull streams) */

export type Source<Output> = (abort: null | true, put: (done: null | (true | Error), value: Output) => void) => void;

export type AsyncIteratorTransform<Input, Output> = (source: Source<Input>) => Source<Output>;

export type Sink<Input> = (source: Source<Input>) => void;
