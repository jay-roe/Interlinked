import Button from '@/components/Buttons/Button';
import type { User } from '@/types/User';
import Link from 'next/link';

export default function ProfileProjects({
  currentUser,
}: {
  currentUser: User;
}) {
  return (
    <div>
      {currentUser.projects.map((project, index) => (
        <div
          key={index}
          style={{
            border: '1px solid white',
            borderRadius: '6px',
            padding: '1em',
            marginBottom: '1em',
          }}
        >
          {project.image && <img src={project.image} alt={project.title} />}
          <h3>{project.title}</h3>
          <h6>
            {project.startDate.toDate().getFullYear()} -{' '}
            {project.endDate
              ? project.endDate.toDate().getFullYear()
              : 'present'}
          </h6>
          <div>{project.description}</div>
          {project.repoLink && (
            <Link href={project.repoLink}>
              <Button>View Source</Button>
            </Link>
          )}
          {project.demoLink && (
            <Link href={project.demoLink}>
              <Button>View Demo</Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
