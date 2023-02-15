'use client';

import {
  animated,
  useSprings,
  to as interpolate,
  useSpring,
} from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import CardHorizontal from './CardHorizontal/CardHorizontal';

const to = (i: number) => ({
  x: 0,
  y: 0,
  // y: i * -4,
  scale: 1,
  rot: 0,
  // rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 });
const trans = (s: number) => `scale(${s})`;
// const trans = (r: number, s: number) =>
// `rotateX(30deg) rotateY(${r / 10}deg) scale(${s})`

export default function CardStack({ children }: { children: JSX.Element[] }) {
  // const [props, api] = useSprings(1, (i) => ({
  //   ...to(i),
  //   from: from(i),
  // })); // Create a bunch of springs using the helpers above
  const [props, api] = useSpring(() => ({ x: 0, scale: 1 }));

  let cardList = children;

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
      console.log(currentTarget, xDir, vx);
      let isThrown = false;
      api.start((i) => {
        if (index !== i) return; // Skip all other cards

        if (!active && vx > 1.0) {
          isThrown = true;
          setTimeout(() => {
            console.log(
              'timeout on: ',
              document.getElementById(`stack_card_${index}`)
            );
            document.getElementById(`stack_card_${index}`).remove();
          }, 100);
        }

        const x = isThrown ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isThrown ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit

        const stackCards: HTMLDivElement[] = [];

        for (let i = 0; i < children.length; i++) {
          stackCards.push(
            document.querySelector<HTMLDivElement>(`#stack_card_${i}`)
          );
        }

        console.log('Stack cards: ', stackCards);

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: {
            friction: 50,
            tension: active ? 800 : isThrown ? 200 : 500,
          },
        };
      });
      // }
      // else {

      // }
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
        <animated.div
          className="flex items-center justify-center"
          key={0}
          style={{}}
        >
          <animated.div
            className="absolute top-10 z-20 w-full rounded-xl bg-[#2F263B] p-5"
            {...dragger(0)}
            style={{
              touchAction: 'pan-y',
              transform: interpolate([props.scale], trans),
              x: props.x,
            }}
            id={`stack_card_0`}
          >
            {children[0]}
          </animated.div>
          <animated.div
            className="absolute top-5 z-10 rounded-xl bg-[#251E2F] p-5"
            // {...dragger(1)}
            style={{ touchAction: 'pan-y', width: 'calc(100% - 2.5rem)' }}
            id={`stack_card_1`}
          >
            {children[1]}
          </animated.div>
          <animated.div
            className="absolute top-0 z-0 rounded-xl bg-[#1E1825] p-5"
            // {...dragger(2)}
            style={{ touchAction: 'pan-y', width: 'calc(100% - 5rem)' }}
            id={`stack_card_2`}
          >
            {children[2]}
          </animated.div>
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
