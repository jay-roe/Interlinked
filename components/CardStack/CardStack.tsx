import { animated, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import CardHorizontal from './CardHorizontal/CardHorizontal';

export default function CardStack({ children }: { children: JSX.Element[] }) {
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const [props, api] = useSprings(3, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above

  const dragger = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      currentTarget,
      velocity: [vx],
    }) => {
      if (!active) {
        console.log(currentTarget, xDir, vx);
        let isThrown = false;
        api.start((i) => {
          if (index !== i) return; // Skip all other cards

          if (vx > 1.0) {
            isThrown = true;
          }

          const x = isThrown ? (200 + window.innerWidth) * xDir : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
          const rot = mx / 100 + (isThrown ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
          const scale = active ? 1.1 : 1; // Active cards lift up a bit

          const stackCards: HTMLDivElement[] = [];

          for (let i = 1; i < children.length; i++) {
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
      }
    },
    { axis: 'x' }
  );

  console.log(children);

  return (
    <div className="relative min-w-[15rem] max-w-xl">
      <animated.div
        className="absolute top-10 z-20 w-full rounded-xl bg-[#2F263B] p-5"
        {...dragger()}
        style={{ touchAction: 'pan-y' }}
        key={children[0].key}
        id={children[0].props.id}
      >
        {children[0]}
      </animated.div>
      {children[1] && (
        <animated.div
          className="absolute top-5 left-5 z-10 rounded-xl bg-[#251E2F] p-5"
          {...dragger()}
          style={{ touchAction: 'pan-y', width: 'calc(100% - 2.5rem)' }}
          key={children[1].key}
          id={children[1].props.id}
        >
          {children[1]}
        </animated.div>
      )}
      {children[2] && (
        <animated.div
          className="absolute top-0 left-10 z-0 rounded-xl bg-[#1E1825] p-5"
          {...dragger()}
          style={{ touchAction: 'pan-y', width: 'calc(100% - 5rem)' }}
          key={children[2].key}
          id={children[2].props.id}
        >
          {children[2]}
        </animated.div>
      )}
      {/* <div
        className="absolute  p-5 top-5 left-5 z-10 rounded-xl bg-[#251E2F]"
        style={{ width: 'calc(100% - 2.5rem)' }}
      >
        <h2>Second Card</h2>
      </div>
      <div
        className="absolute p-5  left-10 z-0 rounded-xl bg-[#1E1825]"
        style={{ width: 'calc(100% - 5rem)' }}
      >
        <h2>Third Card</h2>
      </div> */}
      {/* {children} */}
    </div>
  );
}
