import React from 'react';
import ReactDOM from 'react-dom';
import IMap, { MapStr } from './IMap';


const plainIMap = new IMap({
  some: 'thing',
  foo: 'bar',
});

const mapped = plainIMap.map((value, key) => `${key}_${value}`);

const arrayedIMap = new IMap([
  ['this', 'that'],
  ['foo', 'bar'],
  ['fee', 'baz'],
]);

const plainMapStr = new MapStr([
  ['tra', 1],
  ['foo', 2],
  ['fee', 3],
]);


console.log(plainIMap.getStore());
console.log(mapped.getStore());
console.log(arrayedIMap.getStore());
console.log(plainMapStr.getStore());


ReactDOM.render(
  <div>
    <h4>plain IMap</h4>
    <pre>
      <code>{`
        const plainIMap = new IMap({
          some: 'thing',
          foo: 'bar',
        })

        console.log(plainIMap.getStore());
        // {some: "thing", foo: "bar"}`}
      </code>
    </pre>

    <h4>IMap.map()</h4>
    <pre>
      <code>{`
        const mapped = new IMap({
          some: 'thing',
          foo: 'bar',
        }).map((value, key) => \'$\{key\}_$\{value\}\`);


        console.log(mapped.getStore());
        // {some: "some_thing", foo: "foo_bar"}`}
      </code>
    </pre>


    <h4>arrayed IMap</h4>
    <pre>
      <code>{`
        const arrayedIMap = new IMap([
          ['this', 'that'],
          ['foo', 'bar'],
          ['fee', 'baz'],
        ]);

        console.log(arrayedIMap.getStore());
        // {this: "that", foo: "bar", fee: "baz"}`}
      </code>
    </pre>


    <h4>MapStr</h4>
    <pre>
      <code>{`
        const plainMapStr = new MapStr([
          ['tra', 1],
          ['foo', 2],
          ['fee', 3],
        ]);

        console.log(plainMapStr.getStore());
        // {tra: "1", foo: "2", fee: "3"}`}
      </code>
    </pre>

  </div>,
  document.getElementById('app')
);

module.hot.accept();
