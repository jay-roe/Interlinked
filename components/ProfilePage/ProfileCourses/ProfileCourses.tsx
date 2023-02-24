import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import { Dispatch, SetStateAction } from 'react';
import CardStack from '@/components/CardStack/CardStack';

export default function ProfileCourses({
  courses,
  isEditable = false,
  coursesEditing,
  setCoursesEditing,
  setCourses,
}: {
  courses: User['courses'];
  isEditable?: boolean;
  coursesEditing?: boolean[];
  setCoursesEditing?: Dispatch<SetStateAction<boolean[]>>;
  setCourses?: Dispatch<SetStateAction<User['courses']>>;
}) {
  // live version
  if (!isEditable) {
    return (
      <CardStack height={10}>
        {courses.map((course, index) => (
          <div key={index} data-testid={`live-courses-${index}`}>
            <h3>{course.title}</h3>
            <h4>{course.courseNo}</h4>
            <p>{course.description}</p>
          </div>
        ))}
      </CardStack>
    );
  }
  // editable version
  return (
    <div className="mb-3">
      {courses.map((course, index) => (
        <form
          key={index}
          data-testid="edit-courses-form"
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setCoursesEditing((cedits) =>
              cedits.map((cou, i) => (i === index ? !cou : cou))
            );
          }}
        >
          {' '}
          {coursesEditing && coursesEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Title <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`course-title-${index}`}
                type="text"
                name="skill"
                id="profileSkill"
                value={course.title}
                onChange={(e) =>
                  setCourses((c) => {
                    let tempArr = [...c];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <p>Course Number</p>
              <TextArea
                data-testid={`course-number-${index}`}
                name="info"
                value={course.courseNo}
                onChange={(e) =>
                  setCourses((c) => {
                    let tempArr = [...c];
                    tempArr[index].courseNo = e.target.value;
                    return tempArr;
                  })
                }
              />
              <p>Description</p>
              <TextArea
                data-testid={`course-desc-${index}`}
                name="info"
                value={course.description}
                onChange={(e) =>
                  setCourses((c) => {
                    let tempArr = [...c];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div>
              <h3>{course.title}</h3>
              <h4>{course.courseNo}</h4>
              <div>{course.description}</div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit course button */}
              {coursesEditing && coursesEditing[index] ? (
                <Button
                  className="mr-2"
                  data-testid={`save-course-button-${index}`}
                  type="submit"
                >
                  Save Course
                </Button>
              ) : (
                <EditButton
                  data-testid={`edit-course-button-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCoursesEditing((cedits) =>
                      cedits.map((cou, i) => (i === index ? !cou : cou))
                    );
                  }}
                />
              )}
              {/* External delete course button */}
              <DeleteButton
                data-testid={`delete-course-button-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCourses((c) => c.filter((_, i) => index !== i));

                  setCoursesEditing((cedits) =>
                    cedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new courses, appears after all courses list */}
      {isEditable && (
        <Button
          className="inline"
          data-testid="add-course-button"
          onClick={() => {
            // Append new empty course to current array of courses
            setCourses((c) => [
              ...c,
              {
                title: '',
                courseNo: '',
                description: '',
              },
            ]);

            setCoursesEditing((cedits) => [...cedits, true]);
          }}
        >
          Add New Course
        </Button>
      )}
    </div>
  );
}
