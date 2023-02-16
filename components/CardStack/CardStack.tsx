'use client';

import { animated, useSprings, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';
import { GrNext, GrPowerReset } from 'react-icons/gr';
import Button from '../Button/Button';

// Background color by card index (Front = 0, Second = 1, Third = 2, Any other = none, not shown)
const backgroundColors = ['#2F263B', '#251E2F', '#1E1825'];

const draggingSpring = () => ({
  x: 0,
  scale: 1,
  display: 'block',
});
const trans = (s: number) => `scale(${s})`;

export default function CardStack({ children }: { children: JSX.Element[] }) {
  // Set of thrown card indexes
  const [thrownCards] = useState(() => new Set<number>());

  // Index of card in front of stack
  const [frontCardIndex, setFrontCardIndex] = useState<number>(0);

  // Create a spring animator for each card (given by children)
  const [props, animator] = useSprings(children.length, () => ({
    to: draggingSpring(),
    from: draggingSpring(),
  }));

  // Resets deck and clears thrown cards
  function resetCards() {
    setFrontCardIndex(0);
    setTimeout(() => {
      thrownCards.clear();
      animator.start(() => draggingSpring());
    }, 300);
  }

  // Add delay on animation when clicking next
  function nextClick() {
    animator.start((i) => {
      if (frontCardIndex === i)
        return {
          x: 200,
          config: {
            friction: 100,
            tension: 500,
          },
        };
    });
    setTimeout(() => {
      nextCard(true);
    }, 150);
  }

  // Go to the next card after being thrown
  function nextCard(isClicked: boolean = false) {
    thrownCards.add(frontCardIndex);
    setTimeout(() => {
      animator.start((i) => {
        if (frontCardIndex === i) {
          if (isClicked) {
            return {
              scale: 1,
              x: 200,
              display: 'none',
            };
          }
          return {
            scale: 1,
            display: 'none',
          };
        }
      });
    }, 100);
    if (frontCardIndex === children.length - 1) {
      resetCards();
    } else {
      setTimeout(() => {
        setFrontCardIndex(frontCardIndex + 1);
      }, 200);
    }
  }

  // Triggered whenever user drags on a card
  const dragger = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
      cancel,
    }) => {
      animator.start((i) => {
        // Only affect selected card
        if (index !== i) return;

        // Front card if previous card has been thrown
        const isFrontCard =
          (thrownCards.size === 0 && index === 0) || thrownCards.has(index - 1);
        if (!isFrontCard) return;

        // Thrown if it's been added to thrown set
        const isThrown = thrownCards.has(index);

        // If let go with high velocity, or dragging too far, remove card
        if ((!active && vx > 0.2) || (active && Math.abs(mx) > 300.0)) {
          // Stop animating (avoids any unwanted physics)
          cancel();

          // Go to next card
          nextCard();
        }

        // Throw card 200px in desired direction, and goes back to zero if let go
        const x = isThrown ? 200 * xDir : active ? mx : 0;

        // Card grows when held
        const scale = active ? 1.1 : 1;

        return {
          x,
          scale,
          display: 'block',
          config: {
            friction: 100,
            tension: active ? 800 : 500,
          },
        };
      });
      // Just threw the last card, reset
      if (!active && thrownCards.size === children.length) {
        resetCards();
      }
    },
    // Only move on x axis
    { axis: 'x' }
  );

  console.log(frontCardIndex);

  return (
    <>
      <div className="relative flex min-h-[15rem] min-w-[15rem] max-w-xl items-center justify-center">
        {children.map((child, index) => (
          <animated.div
            className="absolute rounded-xl p-5"
            {...dragger(index)}
            style={{
              // Don't do any animation if user is scrolling vertically (avoids bad scrolling UX)
              touchAction: 'pan-y',

              // Pretty scaling interpolating
              transform: interpolate([props[index].scale], trans),

              // Props to move back to original position
              ...props[index],

              // Calculations for giving correct styles based on how many positions the card is away from the front card
              zIndex: (frontCardIndex - index) * 5 + 10,
              backgroundColor:
                index - frontCardIndex <= 2
                  ? backgroundColors[index - frontCardIndex]
                  : 'none',
              width: `calc(100% - ${(index - frontCardIndex) * 2.5}rem)`,
              top: `${(index - frontCardIndex) * -1.25 + 0.5}rem`,
            }}
            id={`stack_card_${index}`}
            key={index}
          >
            {child}
          </animated.div>
        ))}
      </div>
      <Button onClick={() => resetCards()}>
        <GrPowerReset size={30} />
      </Button>
      <Button onClick={() => nextClick()}>
        <GrNext size={30} />
      </Button>
    </>
  );
}
