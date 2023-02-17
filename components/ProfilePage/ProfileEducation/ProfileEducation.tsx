import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
export default function ProfileEducation({
  currentUser,
  education,
  isEditable = false,
  educationEditing = false,
  setEducationEditing,
  setEducation,
  addEducation,
  setNewEducation,
}: {
  currentUser: User;
  education: User['education'];
  isEditable?: boolean;
  educationEditing?: boolean;
  setEducationEditing?: Dispatch<SetStateAction<boolean>>;
  addEducation?: Dispatch<SetStateAction<boolean>>;
  setEducation?: (education: User['education']) => void;
  setNewEducation?: (education: User['education']) => void;
}) {
  return (
    <div>
      {currentUser.education.map((ed, index) => (
        <div
          key={index}
          style={{
            border: '1px solid white',
            borderRadius: '6px',
            padding: '1em',
            marginBottom: '1em',
          }}
        >
          <div>
            {isEditable}{' '}
            <div>
              {educationEditing ? (
                <form
                  className="mb-2 mt-2 block min-h-[75px] w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  style={{
                    border: '1px solid white',
                    width: '250px',
                    marginBottom: '2em',
                  }}
                  name="education"
                  //rows={4}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <div style={{ marginBottom: '1em', marginLeft: '1em' }}>
                    <p>School:</p>
                    <input
                      name="name"
                      value={ed.name}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                    <p>Location: </p>
                    <input type="text" name="location" value={ed.location} />
                    <p>Program: </p>
                    <input type="text" name="program" value={ed.program} />
                    <p>Years</p>
                    <input type="text" name="startdate" />
                    <p>Extra Info</p>
                    <input type="text" name="info" />
                  </div>

                  <Button onClick={() => setEducationEditing((curr) => !curr)}>
                    Save Education
                  </Button>
                </form>
              ) : (
                <p>
                  {' '}
                  {ed.image && <img src={ed.image} alt={ed.name} />}
                  <h3>
                    {ed.name}{' '}
                    <EditButton
                      className="inline"
                      onClick={() => setEducationEditing((curr) => !curr)}
                    />
                  </h3>
                  <h4>{ed.location}</h4>
                  <h6>
                    {ed.startDate.toDate().getFullYear()} -{' '}
                    {ed.endDate ? ed.endDate.toDate().getFullYear() : 'present'}
                  </h6>
                  <div>{ed.description}</div>
                </p>
              )}
            </div>
            <Button
              className="inline"
              onClick={() => setEducationEditing((curr) => !curr)}
            >
              {' '}
              Add New Education
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
