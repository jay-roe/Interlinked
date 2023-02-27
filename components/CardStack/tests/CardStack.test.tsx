import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CardStack from '../CardStack';

const children = [
  <div key="1">1</div>,
  <div key="2">2</div>,
  <div key="3">3</div>,
];

it('renders button for card reset', async () => {
  const { findByTestId } = render(<CardStack>{children}</CardStack>);

  const resetButton = await findByTestId('reset-button');

  await act(async () => {
    fireEvent.click(resetButton);
    await new Promise((r) => setTimeout(r, 400));
  });
  expect(resetButton).toBeInTheDocument();
});

it('renders next button', async () => {
  const { findByTestId } = render(<CardStack>{children}</CardStack>);

  const nextButton = await findByTestId('next-button');
  await act(async () => {
    fireEvent.click(nextButton);
    await new Promise((r) => setTimeout(r, 400));
  });
  expect(nextButton).toBeInTheDocument();
});

it('resets the card stack after one skipped', async () => {
  const { findByTestId } = render(<CardStack>{children}</CardStack>);
  const nextButton = await findByTestId('next-button');
  const resetButton = await findByTestId('reset-button');

  const frontCard = await findByTestId('stack_card_0');

  expect(frontCard).toHaveStyle({
    display: 'block',
  });

  await act(async () => {
    fireEvent.click(nextButton);
    await new Promise((r) => setTimeout(r, 400));
  });

  expect(frontCard).toHaveStyle({
    display: 'none',
  });

  await act(async () => {
    fireEvent.click(resetButton);
    await new Promise((r) => setTimeout(r, 400));
  });

  expect(frontCard).toHaveStyle({
    display: 'block',
  });
});

// it('throws card when dragged', async () => {
//   const { findByTestId } = render(<CardStack>{children}</CardStack>);
//   const frontContent = await findByTestId('card_stack_test_1');
//   const frontCard = frontContent.parentElement;

//   const { left, top, right, bottom } = frontCard.getBoundingClientRect();
//   const startCenter = {
//     clientX: Math.floor((left + right) / 2),
//     clientY: Math.floor((top + bottom) / 2),
//   };

//   const targetCenter = {
//     clientX: Math.floor((left + right) / 2 + 350),
//     clientY: Math.floor((top + bottom) / 2),
//   };

//   expect(frontCard).toHaveStyle({
//     display: 'block',
//   });

//   await act(async () => {
//     fireEvent.mouseMove(frontCard, startCenter);
//     fireEvent.mouseEnter(frontCard, startCenter);
//     fireEvent.mouseOver(frontCard, startCenter);
//     fireEvent.mouseDown(frontCard, startCenter);

//     const isDragStarted = fireEvent.dragStart(frontCard, startCenter);
//     if (!isDragStarted) return;

//     fireEvent.drag(frontCard, startCenter);
//     fireEvent.mouseMove(frontCard, startCenter);

//     fireEvent.drag(frontCard, targetCenter);
//     fireEvent.mouseMove(frontCard, targetCenter);

//     console.log(frontCard.getBoundingClientRect());

//     fireEvent.drop(frontCard, targetCenter);
//     fireEvent.dragEnd(frontCard, targetCenter);
//     fireEvent.mouseUp(frontCard, targetCenter);
//     await new Promise((r) => setTimeout(r, 600));
//   });

//   expect(frontCard).toHaveStyle({
//     display: 'none',
//   });
// });
