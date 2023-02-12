import type { User } from '@/types/User';

export default function ProfileCourses({ currentUser }: { currentUser: User }) {
  return (
    <div>
      {currentUser.courses.map((course, index) => (
        <div
          key={index}
          style={{
            border: '1px solid white',
            borderRadius: '6px',
            padding: '1em',
            marginBottom: '1em',
          }}
        >
          <h3>{course.title}</h3>
          <h4>{course.courseNo}</h4>
          <div>{course.description}</div>
        </div>
      ))}
    </div>
  );
}
