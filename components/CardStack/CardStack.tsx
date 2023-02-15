'use client';

import {
  animated,
  useSprings,
  to as interpolate,
  useSpring,
} from '@react-spring/web';
import { getNodeText } from '@testing-library/react';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import CardHorizontal from './CardHorizontal/CardHorizontal';

const to = (i?: number) => ({
  x: 0,
  y: 0,
  // y: i * -4,
  scale: 1,
  rot: 0,
  opacity: 1,
  display: 'block',
  // rot: -10 + Math.random() * 20,
  delay: 100,
});
const from = (_i: number) => ({
  x: 0,
  rot: 0,
  scale: 1,
  y: 0,
  opacity: 1,
  display: 'block',
});
const trans = (s: number) => `scale(${s})`;
// const trans = (r: number, s: number) =>
// `rotateX(30deg) rotateY(${r / 10}deg) scale(${s})`

export default function CardStack({ children }: { children: JSX.Element[] }) {
  const [thrownCards] = useState(() => new Set());
  const [props, api] = useSprings(children.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // const [props, api] = useSpring(() => ({ x: 0, scale: 1 }));
  const [otherCardProps, otherCardApi] = useSpring(() => ({
    from: { x: 0, y: 0 },
    to: { x: 0, y: -10 },
  }));

  const dragger = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      currentTarget,
      velocity: [vx],
    }) => {
      // if (!active) {
      console.log(currentTarget, index);
      api.start((i) => {
        if (index !== i) return; // Skip all other cards

        if (!active && vx > 1.0) {
          thrownCards.add(index);
          setTimeout(() => {
            console.log(
              'timeout on: ',
              document.getElementById(`stack_card_${index}`)
            );
            api.stop();
            otherCardApi.start(() => ({
              x: 0,
              y: 20,
            }));
            // document.getElementById(`stack_card_${index}`).style.opacity = "0";
            document.getElementById(`stack_card_${index}`).style.display =
              'none';
            document.getElementById(`stack_card_${index}`).hidden = true;
          }, 100);
        }

        const isThrown = thrownCards.has(index);

        const x = isThrown ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isThrown ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit

        // const stackCards: HTMLDivElement[] = [];

        // for (let i = 0; i < children.length; i++) {
        //   stackCards.push(
        //     document.querySelector<HTMLDivElement>(`#stack_card_${i}`)
        //   );
        // }

        // console.log('Stack cards: ', stackCards);

        console.log(thrownCards.size, children.length);

        return {
          x,
          rot,
          scale,
          delay: undefined,
          opacity: 1,
          display: 'block',
          config: {
            friction: 50,
            tension: active ? 800 : isThrown ? 200 : 500,
          },
        };
      });
      if (!active && thrownCards.size === children.length) {
        setTimeout(() => {
          console.log(
            'timeout on: ',
            document.getElementById(`stack_card_${index}`)
          );
          thrownCards.clear();
          api.start((i) => to(i));
        }, 400);
      }
    },
    { axis: 'x' }
  );

  console.log(children);

  return (
    <div className="relative min-h-[15rem] min-w-[15rem] max-w-xl">
      {
        // props.map(({ x, y, rot, scale }, i) => (
        // !!children[i] &&
        //   <animated.div className="absolute flex items-center justify-center" key={i} style={{ x, y }}>
        //     <animated.div
        //       className="z-20 w-full rounded-xl bg-[#2F263B] p-5"
        //       {...dragger(i)}
        //       style={{ touchAction: 'pan-y', transform: interpolate([rot, scale], trans) }}
        //       key={children[i].key}
        //       id={`stack_card_${i}`}
        //     >
        //       {children[i]}
        //     </animated.div>
        //   </animated.div>
        // children.map((card, i) => (
        // <animated.div
        //   className="flex items-center justify-center"
        //   key={0}
        //   style={{
        //     x: otherCardProps.x,
        //     y: otherCardProps.y
        //   }}
        // >
        //   <animated.div
        //     className="absolute top-10 z-20 w-full rounded-xl bg-[#2F263B] p-5"
        //     {...dragger(0)}
        //     style={{
        //       touchAction: 'pan-y',
        //       transform: interpolate([props.scale], trans),
        //       x: props.x,
        //     }}
        //     id={`stack_card_0`}
        //   >
        //     {children[0]}
        //   </animated.div>
        //   <animated.div
        //     className="absolute top-5 z-10 rounded-xl bg-[#251E2F] p-5"
        //     // {...dragger(1)}
        //     style={{ touchAction: 'pan-y', width: 'calc(100% - 2.5rem)' }}
        //     id={`stack_card_1`}
        //   >
        //     {children[1]}
        //   </animated.div>
        //   <animated.div
        //     className="absolute top-0 z-0 rounded-xl bg-[#1E1825] p-5"
        //     // {...dragger(2)}
        //     style={{ touchAction: 'pan-y', width: 'calc(100% - 5rem)' }}
        //     id={`stack_card_2`}
        //   >
        //     {children[2]}
        //   </animated.div>
        // </animated.div>
        <animated.div
          className="flex items-center justify-center"
          style={{
            x: otherCardProps.x,
            y: otherCardProps.y,
          }}
        >
          {/* {children.slice(0, 3).map((child, index) => (
            <animated.div
              className={`absolute top-${(2 - index) * 5} z-${(2 - index) * 10} ${index === 0 && 'w-full'} rounded-xl bg-[${index === 0 ? '#2F263B' : index === 1 ? '#251E2F': '#1E1825'}] p-5`}
              style={{
                touchAction: 'pan-y',
                transform: interpolate([props.scale], trans),
                x: props.x,
                width: `calc(100% - ${2.5 * index}rem)`
              }}
              {...dragger(index)}
              id={`stack_card_${index}`}
              key={index}
            >
              {child}
            </animated.div>
          ))} */}
          <animated.div
            className="absolute top-10 z-20 w-full rounded-xl bg-[#2F263B] p-5"
            {...dragger(0)}
            style={{
              touchAction: 'pan-y',
              transform: interpolate([props[0].scale], trans),
              x: props[0].x,
              opacity: props[0].opacity,
              display: props[0].display,
            }}
            id={`stack_card_0`}
          >
            {children[0]}
          </animated.div>
          {children[1] && (
            <animated.div
              className="absolute top-5 z-10 rounded-xl bg-[#251E2F] p-5"
              {...dragger(1)}
              style={{
                touchAction: 'pan-y',
                width: 'calc(100% - 2.5rem)',
                transform: interpolate([props[1].scale], trans),
                x: props[1].x,
                opacity: props[1].opacity,
                display: props[1].display,
              }}
              id={`stack_card_1`}
            >
              {children[1]}
            </animated.div>
          )}
          {children[2] && (
            <animated.div
              className="absolute top-0 z-0 rounded-xl bg-[#1E1825] p-5"
              {...dragger(2)}
              style={{
                touchAction: 'pan-y',
                width: 'calc(100% - 5rem)',
                transform: interpolate([props[2].scale], trans),
                x: props[2].x,
                opacity: props[2].opacity,
                display: props[2].display,
              }}
              id={`stack_card_2`}
            >
              {children[2]}
            </animated.div>
          )}
          {children.slice(3).map((child, index) => (
            <animated.div
              className="absolute top-10 z-20 hidden w-full rounded-xl bg-[#2F263B] p-5"
              {...dragger(index)}
              style={{
                touchAction: 'pan-y',
                transform: interpolate([props[index].scale], trans),
                x: props[index].x,
                opacity: props[index].opacity,
                display: props[index].display,
              }}
              id={`stack_card_${index}`}
              key={index}
            >
              {child}
            </animated.div>
          ))}
        </animated.div>

        //   {/* {children[1] && (
        //     <div
        //       className="z-10 rounded-xl bg-[#251E2F] p-5"
        //       style={{ width: 'calc(100% - 2.5rem)' }}
        //       key={children[1].key}
        //       id={`stack_card_${i}`}
        //       >
        //       {children[1]}
        //     </div>
        //   )}
        //   {children[2] && (
        //     <div
        //       className="z-0 rounded-xl bg-[#1E1825] p-5"
        //       style={{ width: 'calc(100% - 5rem)' }}
        //       key={children[2].key}
        //       id={children[2].props.id}
        //     >
        //       {children[2]}
        //     </div>
        //   )} */}
        //   {/*
        //   <div
        //     className="absolute  p-5 top-5 left-5 z-10 rounded-xl bg-[#251E2F]"
        //     style={{ width: 'calc(100% - 2.5rem)' }}
        //   >
        //     <h2>Second Card</h2>
        //   </div>
        //   <div
        //     className="absolute p-5  left-10 z-0 rounded-xl bg-[#1E1825]"
        //     style={{ width: 'calc(100% - 5rem)' }}
        //   >
        //     <h2>Third Card</h2>
        //   </div> */}
        //   {/* {children} */}
        // // </animated.div>
        // ))
      }
    </div>
  );
}
