# Capnp-JS Tranforms

This repository exists solely as the source of truth for Capnp-JS Transform
patterns.

## Synchronous Iterator Transforms

Consider the `SugarlessIterator` interface:

```js
interface SugarlessIterator<Value> {
  next(): SugarlessIteratorResult<Value>;
}

type SugarlessIteratorResult<Value> = { done: true | Error } | { done: false, value: Value };
```

An iterator transform exposes a sugarless iterator over some `Input` type as an
iterator over some `Output` type:

```js
type IteratorTransform<Input, Output> = (source: SugarlessIterator<Input>) => SugarlessIterator<Output>;
```

This arrangement allows each transform to reuse a single, relatively small
buffer to transmit data through a chain of transformations with minimal memory
use.
Unless documented otherwise, every time a transform calls its source's `next()`
method, that transform should anticipate that the input from the prior `next()`
call has become corrupted.

# Asynchronous Iterator Transforms

These are actually [pull streams](https://github.com/pull-stream/pull-stream)
with naming kinda borrowed from the pull streams link and from
[this paper](http://www.sable.mcgill.ca/publications/techreports/2018-1/techrep.pdf).

Consider the `Source` interface:

```js
type Source<Output> = (abort: null | true, put: (done: null | (true | Error), value: Output) => void) => void;
```

An asynchronous iterator transform exposes a source of some `Input` type as a
source over some `Output` type:

```js
type AsyncIteratorTransform<Input, Output> = (source: Source<Input>) => Source<Output>;
```

This arrangement allows each transform to reuse a single, relatively small
buffer to transmit data through a chain of transformations with minimal memory
use.
Unless documented otherwise, every time a transform calls its source's `next()`
method, that transform should anticipate that the input from the prior `next()`
call has become corrupted.

Source consumers are called sinks, and they have the following shape:

```js
type Sink<Input> = (source: Source<Input>) => void;
```
