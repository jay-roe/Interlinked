import '@testing-library/jest-dom';
import {
  findByTestId,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import ProfileCourses from '../ProfileCourses';

it('renders live profile courses', async () => {
  const { findByTestId } = render(
    <ProfileCourses
      isEditable={false}
      courses={[
        {
          title: 'COURSE',
          courseNo: '123',
          description: 'very descriptive ;)',
        },
        {
          title: 'Ride a horse on a carousell',
          courseNo: 'neigh, whinney',
          description: 'CHARGE! Full speed ahead!',
        },
      ]}
    />
  );
  const liveCourses = await findByTestId('live-courses');
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
  const couTitle = await findByTestId('course-title');
  const couNum = await findByTestId('course-number');
  const couDesc = await findByTestId('course-desc');

  fireEvent.change(couTitle, { target: { value: 'Ride a unicorn' } });
  await waitFor(() => expect(mockSet).toBeCalledTimes(1));

  fireEvent.change(couNum, { target: { value: '*unicorn sounds*' } });
  await waitFor(() => expect(mockSet).toBeCalledTimes(1));

  fireEvent.change(couDesc, {
    target: { value: "It's like a horse, but with a horn on its head" },
  });
  await waitFor(() => expect(mockSet).toBeCalledTimes(1));
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
  const couButton = await findByTestId('edit-course-button');
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
  const couButton = await findByTestId('delete-course-button');
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
