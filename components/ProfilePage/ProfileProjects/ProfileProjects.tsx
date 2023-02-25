import Button from '@/components/Buttons/Button';
import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import CardStack from '@/components/CardStack/CardStack';

export default function ProfileProjects({
  projects,
  isEditable = false,
  projectsEditing,
  setProjectsEditing,
  setProjects,
}: {
  projects: User['projects'];
  isEditable?: boolean;
  projectsEditing?: boolean[];
  setProjectsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setProjects?: Dispatch<SetStateAction<User['projects']>>;
}) {
  if (!isEditable) {
    return (
      <CardStack height={20}>
        {projects.map((proj, index) => (
          <div key={index} data-testid="live-proj">
            {proj.image && <img src={proj.image} alt={proj.title} />}
            <h3>{proj.title}</h3>
            <h6>
              {proj.startDate.toDate().getFullYear()} -{' '}
              {proj.endDate ? proj.endDate.toDate().getFullYear() : 'present'}
            </h6>
            <div>{proj.description}</div>
            {proj.collaborators.map((co, index) => (
              <Link
                key={index}
                href={`/profile/${co.id}`}
                className="inline-block"
              >
                <div className="my-2 flex w-fit items-center gap-2 rounded-md bg-white bg-opacity-10 p-3">
                  {co.profilePicture && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={co.profilePicture}
                      alt={co.name}
                    />
                  )}
                  <p>{co.name} </p>
                </div>
              </Link>
            ))}
            <div className="flex gap-2">
              {proj.repoLink && (
                <div>
                  <a href={proj.repoLink}>
                    <Link href={proj.repoLink}>
                      <Button>View Repo</Button>
                    </Link>
                  </a>
                </div>
              )}
              {proj.demoLink && (
                <div>
                  <a href={proj.demoLink}>
                    <Link href={proj.demoLink}>
                      <Button>View Demo</Button>
                    </Link>
                  </a>{' '}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardStack>
    );
  }
  return (
    <div className="mb-3">
      {projects.map((project, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setProjectsEditing((proedits) =>
              proedits.map((proj, i) => (i === index ? !proj : proj))
            );
          }}
        >
          {projectsEditing && projectsEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Title <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid="edit-proj-title"
                type="text"
                name="project"
                id="profileProject"
                value={project.title}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Collaborators <span className="text-yellow-600">*</span>
              </label>

              {project.collaborators.map((co, index) => (
                <form key={index}>
                  <InputField
                    data-testid="edit-proj-collaborators"
                    type="text"
                    name="collab"
                    id="profileCollabs"
                    value={co.name}
                    onChange={(e) =>
                      setProjects((pro) => {
                        let tempArr = [...pro];
                        //tempArr[index].collaborators= e.target.value;
                        return tempArr;
                      })
                    }
                  />
                </form>
              ))}
              {/* Adding new collaborators, appears after all collaborators list */}
              {isEditable && (
                <Button
                  className="inline"
                  // Add new text field
                >
                  Add New Collaborator
                </Button>
              )}

              <p>Description</p>
              <TextArea
                data-testid="edit-proj-description"
                name="info"
                value={project.description}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
              <div className="flex flex-wrap gap-2">
                <div className="w-full">
                  <label>
                    Start Date <span className="text-yellow-600">*</span>
                  </label>
                  <InputField
                    data-testid="edit-proj-startDate"
                    type="date"
                    name="startdate"
                    value={project.startDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setProjects((pro) => {
                        if (!e.target.valueAsDate) return pro;

                        let tempArr = [...pro];
                        tempArr[index].startDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    max={project.endDate?.toDate().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>End Date</label>
                  <InputField
                    data-testid="edit-proj-endDate"
                    type="date"
                    name="enddate"
                    value={project.endDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setProjects((pro) => {
                        let tempArr = [...pro];
                        tempArr[index].endDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    min={
                      project.startDate?.toDate().toISOString().split('T')[0]
                    }
                  />
                </div>
              </div>
              <label> Repo Link </label>
              <InputField
                data-testid="edit-proj-repoLink"
                type="link"
                name="repoLink"
                value={project.repoLink}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].repoLink = e.target.value;
                    return tempArr;
                  })
                }
              ></InputField>
              <label> Demo Link </label>
              <InputField
                data-testid="edit-proj-demoLink"
                type="link"
                name="demolink"
                value={project.demoLink}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].demoLink = e.target.value;
                    return tempArr;
                  })
                }
              ></InputField>
            </div>
          ) : (
            <div data-testid="editable-proj">
              {project.image && <img src={project.image} alt={project.title} />}
              <h3>{project.title}</h3>
              <h6>
                {project.startDate.toDate().getFullYear()} -{' '}
                {project.endDate
                  ? project.endDate.toDate().getFullYear()
                  : 'present'}
              </h6>
              <div>{project.description}</div>
              {project.collaborators.map((co, index) => (
                <Link key={index} href={`/profile/${co.id}`}>
                  <div className="my-2 flex w-fit items-center gap-2 rounded-md bg-white bg-opacity-10 p-3">
                    {co.profilePicture && (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={co.profilePicture}
                        alt={co.name}
                      />
                    )}
                    <p>{co.name} </p>
                  </div>
                </Link>
              ))}
              <div className="flex gap-2">
                {project.repoLink && (
                  <div>
                    <Link href={project.repoLink}>
                      <Button>View Repo</Button>
                    </Link>
                  </div>
                )}
                {project.demoLink && (
                  <div>
                    <Link href={project.demoLink}>
                      <Button>View Demo</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit project button */}
              {projectsEditing && projectsEditing[index] ? (
                <Button
                  className="mr-2"
                  type="submit"
                  data-testid="proj-save-button"
                >
                  Save Project
                </Button>
              ) : (
                <EditButton
                  data-testid="proj-edit-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setProjectsEditing((proedits) =>
                      proedits.map((proj, i) => (i === index ? !proj : proj))
                    );
                  }}
                />
              )}
              {/* External delete project button */}
              <DeleteButton
                data-testid="proj-delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  setProjects((pro) => pro.filter((_, i) => index !== i));

                  setProjectsEditing((proedits) =>
                    proedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new skills, appears after all project list */}
      {isEditable && (
        <Button
          data-testid="proj-add-button"
          className="inline"
          onClick={() => {
            // Append new empty skill to current array of projects
            setProjects((pro) => [
              ...pro,
              {
                title: '',
                description: '',
                collaborators: [],
                repoLink: '',
                demoLink: '',
                startDate: Timestamp.now(),
                endDate: Timestamp.now(),
                image: '',
              },
            ]);

            setProjectsEditing((proedits) => [...proedits, true]);
          }}
        >
          Add New Project
        </Button>
      )}
    </div>
  );
}
