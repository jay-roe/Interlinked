import '@testing-library/jest-dom';
import { findByTestId, fireEvent, waitFor } from '@testing-library/react';
import { render } from '@/renderWrapper';
import ProfileCourses from '../ProfileCourses';

it('renders live profile courses', async () => {
  const { findByTestId } = render(
    <ProfileCourses
      // isEditable={false}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
    />
  );
  const liveCourses = await findByTestId('live-courses-0');
  expect(liveCourses).toBeInTheDocument();
});

it('tests render of editable version', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={true}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
      setCoursesEditing={mockSubmit}
    />
  );
  const couForm = await findByTestId('edit-courses-form');
  fireEvent.submit(couForm);
  await waitFor(() => expect(mockSubmit).toBeCalled);
});

it('tests filling input fields for adding/editing a course', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={true}
      coursesEditing={[true]}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
      setCourses={mockSet}
    />
  );
  const couTitle = await findByTestId('course-title-0');
  const couNum = await findByTestId('course-number-0');
  const couDesc = await findByTestId('course-desc-0');

  fireEvent.change(couTitle, { target: { value: 'Ride a unicorn' } });
  await waitFor(() => expect(mockSet).toBeCalledTimes(1));

  fireEvent.change(couNum, { target: { value: '*unicorn sounds*' } });
  await waitFor(() => expect(mockSet).toBeCalledTimes(2));

  fireEvent.change(couDesc, {
    target: { value: "It's like a horse, but with a horn on its head" },
  });
  await waitFor(() => expect(mockSet).toBeCalledTimes(3));
});

it('tests the courses edit button', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={true}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
      setCoursesEditing={mockSubmit}
    />
  );
  const couButton = await findByTestId('edit-course-button-0');
  fireEvent.click(couButton);
  await waitFor(() => expect(mockSubmit).toBeCalled);
});

it('tests the courses delete button', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={true}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
      setCourses={mockSubmit}
      setCoursesEditing={mockSubmit}
    />
  );
  const couButton = await findByTestId('delete-course-button-0');
  fireEvent.click(couButton);
  await waitFor(() => expect(mockSubmit).toBeCalledTimes(2));
});

it('tests the courses add button', async () => {
  const mockSubmit = jest.fn();
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={true}
      courses={[
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
      setCourses={mockSubmit}
      setCoursesEditing={mockSubmit}
    />
  );
  const couButton = await findByTestId('add-course-button');
  fireEvent.click(couButton);
  await waitFor(() => expect(mockSubmit).toBeCalledTimes(2));
});
