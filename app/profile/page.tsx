/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import DeleteAccountPopup from "@/components/DeleteAccountPopup/DeleteAccountPopup";
import { useRouter } from "next/navigation";
import SocialIconGroup from "@/components/SocialIconGroup/SocialIconGroup";
import Button from "@/components/Button/Button";
import LinkIcon from "@/components/LinkIcon/LinkIcon";

export default function Profile() {
  const router = useRouter();

  const { currentUser, authUser, deleteAccount } = useAuth();

  const [isModalShow, setIsModalShow] = useState(false);

  async function onDeleteAccount() {
    try {
      await deleteAccount();

      // Redirect to home page, with state saying account was just deleted
      router.push("/"); // TODO reintroduce deleted account alert, { state: { deletedAccount: true } });
      setIsModalShow(false);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <>
        <h1>Your Profile</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to edit your profile.
        </h2>
        <Button href="login">Login</Button>
        <Button href="register">Register</Button>
      </>
    );
  }

  // User logged in
  return (
    <div className="container mx-auto text-white">
      <div className="mb-5 block gap-5 md:flex md:max-w-xl">
        {currentUser.profilePicture && (
          <div className="row-auto">
            <img
              className="h-40 w-40 rounded-full md:w-52 m-auto"
              src={currentUser.profilePicture}
              alt={currentUser.name}
            />
          </div>
        )}
        <div className="row-auto place-self-start self-center text-center md:text-left">
          <h1 data-testid="profile-title" className="text-3xl font-extrabold">
            {currentUser?.name || "No name provided."}
          </h1>
          <p>{currentUser.bio || "No bio given."}</p>
        </div>
      </div>
      <div className="mb-3 mx-auto">
        <SocialIconGroup socials={currentUser.socials} />
      </div>
      <div className="mb-3 flex max-w-fit items-center gap-2 rounded-md bg-white bg-opacity-10 p-3 font-semibold">
        <LinkIcon />
        <p>{currentUser.connections.length} Links</p>
      </div>

      <h1 className="text-2xl font-extrabold">Link with {currentUser.name.split(' ')[0]}</h1>
      <p>
        ✉ <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>{" "}
        {/* TODO: Add to edit profile: <VerifiedIcon verified={authUser.emailVerified} showText /> */}
      </p>
      {currentUser.phone && (
        <p>
          📞 <a href={`telno:${currentUser.phone}`}>{currentUser.phone}</a>
        </p>
      )}

      <h2 className="text-2xl font-extrabold">Languages 🗨 </h2>
      <ul>
        {currentUser.languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-extrabold">Education 🏫 </h2>
      {currentUser.education.map((ed, index) => (
        <div
          key={index}
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          {ed.image && <img src={ed.image} alt={ed.name} />}
          <h3>{ed.name}</h3>
          <h4>{ed.location}</h4>
          <h6>
            {ed.startDate.toDate().getFullYear()} -{" "}
            {ed.endDate ? ed.endDate.toDate().getFullYear() : "present"}
          </h6>
          <div>{ed.description}</div>
        </div>
      ))}
      <h2 className="text-2xl font-extrabold">Courses 📚</h2>
      {currentUser.courses.map((course, index) => (
        <div
          key={index}
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          <h3>{course.title}</h3>
          <h4>{course.courseNo}</h4>
          <div>{course.description}</div>
        </div>
      ))}

      <h2 className="text-2xl font-extrabold">Experience 🏢</h2>
      {currentUser.experience.map((exp, index) => (
        <div
          key={index}
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          {exp.image && <img src={exp.image} alt={exp.title} />}
          <h3>{exp.title}</h3>
          <h4>{exp.employer}</h4>
          <h5>{exp.location}</h5>
          <h6>
            {exp.startDate.toDate().toLocaleDateString()}
            {exp.endDate
              ? " - " + exp.endDate.toDate().toLocaleDateString()
              : ""}
          </h6>
          <div>{exp.description}</div>
        </div>
      ))}
      <h2 className="text-2xl font-extrabold">Projects 🛠</h2>
      {currentUser.projects.map((project, index) => (
        <div
          key={index}
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          {project.image && <img src={project.image} alt={project.title} />}
          <h3>{project.title}</h3>
          <h6>
            {project.startDate.toDate().getFullYear()} -{" "}
            {project.endDate
              ? project.endDate.toDate().getFullYear()
              : "present"}
          </h6>
          <div>{project.description}</div>
          {project.repoLink && (
            <Button href={project.repoLink}>View Source</Button>
          )}
          {project.demoLink && (
            <Button href={project.demoLink}>View Demo</Button>
          )}
        </div>
      ))}
      <h2 className="text-2xl font-extrabold">Skills 💪</h2>
      <ul>
        {currentUser.skills.map((skill, index) => (
          <li key={index}>{skill.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-extrabold">Awards 🏆</h2>
      {currentUser.awards.map((award, index) => (
        <div
          key={index}
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "1em",
            marginBottom: "1em",
          }}
        >
          <h3>{award.title}</h3>
          <h6>{award.date.toDate().toLocaleDateString()}</h6>
          <div>{award.description}</div>
        </div>
      ))}

      <Button
        data-testid="danger-zone"
        variant="danger"
        onClick={() => setIsModalShow(true)}
      >
        Delete account
      </Button>
      <DeleteAccountPopup
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}
