'use client';

import {
  animated,
  useSprings,
  to as interpolate,
  useSpring,
} from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { GrNext, GrPowerReset } from 'react-icons/gr';
import Button from '../Button/Button';

// Background color by card index (Front = 0, Second = 1, Third = 2, Any other = none, not shown)
const backgroundColors = ['#2F263B', '#251E2F', '#1E1825'];

const to = (i?: number) => ({
  x: 0,
  // y: i * -4,
  scale: 1,
  display: 'block',
  // rot: -10 + Math.random() * 20,
  delay: 100,
});
const from = (i: number) => ({
  x: 0,
  scale: 1,
  display: 'block',
});
const trans = (s: number) => `scale(${s})`;
// const trans = (r: number, s: number) =>
// `rotateX(30deg) rotateY(${r / 10}deg) scale(${s})`

export default function CardStack({ children }: { children: JSX.Element[] }) {
  const [thrownCards] = useState(() => new Set<number>());
  const [frontCardIndex, setFrontCardIndex] = useState<number>(0);
  const [props, api] = useSprings(children.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // const [props, api] = useSpring(() => ({ x: 0, scale: 1 }));
  const [otherCardProps, otherCardApi] = useSprings(children.length, (i) => ({
    from: { display: i <= 2 + frontCardIndex ? 'block' : 'none' },
    to: { display: i <= 2 + frontCardIndex ? 'block' : 'none' },
  }));

  function resetCards() {
    setFrontCardIndex(0);
    setTimeout(() => {
      thrownCards.clear();
      api.start((i) => to(i));
    }, 400);
  }

  function nextCard() {
    thrownCards.add(frontCardIndex);
    setTimeout(() => {
      api.start((i) => {
        if (frontCardIndex === i) {
          return {
            scale: 1,
            x: -200,
            display: 'none',
          };
        }
      });
      otherCardApi.start((i) => to(i));
    }, 100);
    if (frontCardIndex === children.length - 1) {
      resetCards();
    } else {
      setTimeout(() => {
        setFrontCardIndex((index) => index + 1);
      }, 100);
    }
  }

  const dragger = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
      cancel,
    }) => {
      // if (!active) {
      api.start((i) => {
        if (index !== i) return; // Skip all other cards

        // Front card if previous card has been thrown
        const isFrontCard =
          (thrownCards.size === 0 && index === 0) || thrownCards.has(index - 1);
        if (!isFrontCard) return;

        const isThrown = thrownCards.has(index);

        // If let go with high velocity, or dragging too far, remove card
        if ((!active && vx > 0.2) || (active && Math.abs(mx) > 300.0)) {
          thrownCards.add(index);
          cancel();
          setTimeout(() => {
            api.start((i) => {
              if (index === i) {
                return {
                  scale: 1,
                  display: 'none',
                };
              }
            });
            otherCardApi.start((i) => to(i));
          }, 100);
          if (index === children.length - 1) {
            resetCards();
          } else {
            setTimeout(() => {
              setFrontCardIndex(index + 1);
            }, 100);
          }
        }

        const x = isThrown ? 200 * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const scale = active ? 1.1 : 1; // Active cards lift up a bit

        return {
          x,
          scale,
          delay: undefined,
          opacity: 1,
          display: 'block',
          config: {
            friction: 100,
            tension: active ? 800 : isThrown ? 500 : 500,
          },
        };
      });
      if (!active && thrownCards.size === children.length) {
        resetCards();
      }
    },
    { axis: 'x' }
  );

  console.log(frontCardIndex);

  return (
    <>
      <div className="relative flex min-h-[15rem] min-w-[15rem] max-w-xl items-center justify-center">
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
          // <animated.div
          //   className="flex items-center justify-center"
          //   style={{
          //     x: otherCardProps.x,
          //     y: otherCardProps.y,
          //   }}
          // >
        }
        <animated.div
          className="absolute top-10 w-full rounded-xl p-5"
          {...dragger(0)}
          style={{
            touchAction: 'pan-y',
            transform: interpolate([props[0].scale], trans),
            ...otherCardProps[0],
            ...props[0],
            zIndex: 10,
            backgroundColor: backgroundColors[0],
            top: `${frontCardIndex * -1.25 + 3.75}rem`,
          }}
          id={`stack_card_0`}
        >
          {children[0]}
        </animated.div>
        {children[1] && (
          <animated.div
            className="absolute rounded-xl p-5"
            {...dragger(1)}
            style={{
              touchAction: 'pan-y',
              transform: interpolate([props[1].scale], trans),
              ...otherCardProps[1],
              ...props[1],
              zIndex: (frontCardIndex - 1) * 5 + 10,
              backgroundColor: backgroundColors[1 - frontCardIndex],
              width: `calc(100% - ${(1 - frontCardIndex) * 2.5}rem)`,
              top: `${(1 - frontCardIndex) * -1.25 + 3.75}rem`,
            }}
            id={`stack_card_1`}
          >
            {children[1]}
          </animated.div>
        )}
        {children[2] && (
          <animated.div
            className="absolute rounded-xl p-5"
            {...dragger(2)}
            style={{
              touchAction: 'pan-y',
              transform: interpolate([props[2].scale], trans),
              ...otherCardProps[2],
              ...props[2],
              zIndex: (frontCardIndex - 2) * 5 + 10,
              backgroundColor: backgroundColors[2 - frontCardIndex],
              width: `calc(100% - ${(2 - frontCardIndex) * 2.5}rem)`,
              top: `${(2 - frontCardIndex) * -1.25 + 3.75}rem`,
            }}
            id={`stack_card_2`}
          >
            {children[2]}
          </animated.div>
        )}
        {children.slice(3).map((child, index) => {
          // Skip first 3 elements, already considered before
          index += 3;
          return (
            <animated.div
              className="absolute rounded-xl p-5"
              {...dragger(index)}
              style={{
                touchAction: 'pan-y',
                transform: interpolate([props[index].scale], trans),
                ...otherCardProps[index],
                ...props[index],
                zIndex: (frontCardIndex - index) * 5 + 10,
                backgroundColor:
                  index - frontCardIndex <= 2
                    ? backgroundColors[index - frontCardIndex]
                    : 'none',
                width: `calc(100% - ${(index - frontCardIndex) * 2.5}rem)`,
                top: `${(index - frontCardIndex) * -1.25 + 3.75}rem`,
              }}
              id={`stack_card_${index}`}
              key={index}
            >
              {child}
            </animated.div>
          );
        })}
        {/* </animated.div> */}

        {
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
      <Button onClick={() => resetCards()}>
        <GrPowerReset size={40} />
      </Button>
      <Button onClick={() => nextCard()}>
        <GrNext size={40} />
      </Button>
    </>
  );
}
