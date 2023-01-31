import { Button, Container, Image } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import VerifiedIcon from '../../components/VerifiedIcon/VerifiedIcon';
import { useState } from 'react';
import DeleteAccountPopup from '../../components/DeleteAccountPopup/DeleteAccountPopup';
import { useNavigate } from 'react-router-dom';
import SocialIconGroup from '../../components/SocialIconGroup/SocialIconGroup';

export default function Profile() {
    const navigate = useNavigate()

    const { currentUser, authUser, deleteAccount } = useAuth();

    const [isModalShow, setIsModalShow] = useState(false);

    async function onDeleteAccount() {
        try {
            await deleteAccount();

            // Redirect to home page, with state saying account was just deleted
            navigate('/', { state: { deletedAccount: true } });
            setIsModalShow(false);
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    // User not logged in
    if (!currentUser || !authUser) {
        return (
            <>
                <h1>Your Profile</h1>
                <h2>You must be logged in to edit your profile.</h2>
                <Button href='login'>Login</Button>
                <Button href='register'>Register</Button>
            </>
        )
    }

    // User logged in
    return (
        <Container>
            <h1>Your Information</h1>
            {currentUser.profilePicture && <Image src={currentUser.profilePicture} />}
            <p>{currentUser?.name || 'No name provided.'}</p>
            <p>Email: {currentUser.email} <VerifiedIcon verified={authUser.emailVerified} showText /></p>
            
            <h1>Profile Preview</h1>
            <h2>About</h2>
            <p>{currentUser.bio || 'No bio given.'}</p>
            <h2>Contact Info</h2>
                <p>✉ <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a></p>
                {currentUser.phone && <p>📞 <a href={`telno:${currentUser.phone}`}>{currentUser.phone}</a></p>}
            <h2>Socials 📫 </h2>
            <SocialIconGroup socials={currentUser.socials} />
            <h2>Languages 🗨 </h2>
            <ul>
            {
                currentUser.languages.map((lang, index) => <li key={index}>{lang}</li>)
            }
            </ul>
            <h2>Education 🏫 </h2>
            {
                currentUser.education.map((ed, index) => (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '6px', padding: '1em', marginBottom: '1em' }}>
                        {ed.image && <Image src={ed.image} />}
                        <h3>{ed.name}</h3>
                        <h4>{ed.location}</h4>
                        <h6>{ed.startDate.toDate().getFullYear()} - {ed.endDate ? ed.endDate.toDate().getFullYear() : 'present'}</h6>
                        <div>{ed.description}</div>
                    </div>
                ))
            }
            <h2>Courses 📚</h2>
            {
                currentUser.courses.map((course, index) => (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '6px', padding: '1em', marginBottom: '1em' }}>
                        <h3>{course.title}</h3>
                        <h4>{course.courseNo}</h4>
                        <div>{course.description}</div>
                    </div>
                ))
            }

            <h2>Experience 🏢</h2>
            {
                currentUser.experience.map((exp, index) => (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '6px', padding: '1em', marginBottom: '1em' }}>
                        {exp.image && <Image src={exp.image} />}
                        <h3>{exp.title}</h3>
                        <h4>{exp.employer}</h4>
                        <h5>{exp.location}</h5>
                        <h6>{exp.startDate.toDate().toLocaleDateString()}{exp.endDate ? ' - ' + exp.endDate.toDate().toLocaleDateString() : ''}</h6>
                        <div>{exp.description}</div>
                    </div>
                ))
            }
            <h2>Projects 🛠</h2>
            {
                currentUser.projects.map((project, index) => (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '6px', padding: '1em', marginBottom: '1em' }}>
                        {project.image && <Image src={project.image} />}
                        <h3>{project.title}</h3>
                        <h6>{project.startDate.toDate().getFullYear()} - {project.endDate ? project.endDate.toDate().getFullYear() : 'present'}</h6>
                        <div>{project.description}</div>
                        {project.repoLink && <Button href={project.repoLink}>View Source</Button>}
                        {project.demoLink && <Button href={project.demoLink}>View Demo</Button>}
                    </div>
                ))
            }
            <h2>Skills 💪</h2>
            <ul>
            {
                currentUser.skills.map((skill, index) => <li key={index}>{skill.name}</li>)
            }
            </ul>

            <h2>Awards 🏆</h2>
            {
                currentUser.awards.map((award, index) => (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '6px', padding: '1em', marginBottom: '1em' }}>
                        <h3>{award.title}</h3>
                        <h6>{award.date.toDate().toLocaleDateString()}</h6>
                        <div>{award.description}</div>
                    </div>
                ))
            }

            <Button variant='danger' onClick={() => setIsModalShow(true)}>Delete account</Button>
            <DeleteAccountPopup show={isModalShow} onHide={() => setIsModalShow(false)} onDeleteAccount={onDeleteAccount} />
        </Container>
    )
}
