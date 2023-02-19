import Button from '@/components/Buttons/Button';
import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import { Timestamp } from 'firebase/firestore';

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
  return (
    <div>
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
                <form>
                  <InputField
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
            <div>
              {project.image && <img src={project.image} alt={project.title} />}
              <h3>{project.title}</h3>
              <h6>
                {project.startDate.toDate().getFullYear()} -{' '}
                {project.endDate
                  ? project.endDate.toDate().getFullYear()
                  : 'present'}
              </h6>
              {project.collaborators.map((co, index) => (
                <div>
                  <p>{co.name} </p>
                </div>
              ))}
              <div>{project.description}</div>
              <div>
                {' '}
                <a href={project.repoLink}>{project.repoLink}</a>{' '}
              </div>
              <div>
                <a href={project.demoLink}>{project.demoLink}</a>{' '}
              </div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit project button */}
              {projectsEditing && projectsEditing[index] ? (
                <Button className="mr-2" type="submit">
                  Save Project
                </Button>
              ) : (
                <EditButton
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
