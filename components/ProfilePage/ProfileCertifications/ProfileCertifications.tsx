import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import CardStack from '@/components/CardStack/CardStack';
import Link from 'next/link';
export default function ProfileCertifications({
  certifications,
  isEditable = false,
  certificationsEditing,
  setCertificationsEditing,
  setCertifications,
}: {
  certifications: User['certifications'];
  isEditable?: boolean;
  certificationsEditing?: boolean[];
  setCertificationsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setCertifications?: Dispatch<SetStateAction<User['certifications']>>;
}) {
  // Live version of certifications component
  if (!isEditable) {
    if (!certifications || !certifications[0]) return;

    return (
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold">Certifications</h2>
        <CardStack>
          {certifications.map((cert, index) => (
            <div key={index} data-testid={`live-certification-${index}`}>
              <h3 className="text-xl font-bold">{cert.name}</h3>
              <h4 className="text-lg">{cert.issuer}</h4>
              <h6 className="mb-3">
                {`${cert.date.toDate().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`}
              </h6>
              {cert.link && (
                <Link href={cert.link}>
                  <Button>View Credential</Button>
                </Link>
              )}
            </div>
          ))}
        </CardStack>
      </div>
    );
  }

  // Editable version of certifications component
  return (
    <div>
      <h2 className="text-2xl font-extrabold">Certifications</h2>
      {certifications?.map((cert, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setCertificationsEditing((awdedits) =>
              awdedits.map((awd, i) => (i === index ? !awd : awd))
            );
          }}
        >
          {certificationsEditing && certificationsEditing[index] ? (
            <div className="mr-2 mb-3 w-full max-w-xs">
              <label>
                Certification Name <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`certifications-name-box-${index}`}
                type="text"
                name="name"
                id="certName"
                value={cert.name}
                onChange={(e) =>
                  setCertifications((certs) => {
                    let tempArr = [...certs];
                    tempArr[index].name = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Issuer <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`certifications-issuer-box-${index}`}
                type="text"
                name="issuer"
                id="certIssuer"
                value={cert.issuer}
                onChange={(e) =>
                  setCertifications((certs) => {
                    let tempArr = [...certs];
                    tempArr[index].issuer = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Date <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`certifications-date-box-${index}`}
                type="date"
                name="date"
                value={cert.date?.toDate().toISOString().substring(0, 10)}
                onChange={(e) =>
                  setCertifications((certs) => {
                    if (!e.target.valueAsDate) return certs;
                    let tempArr = [...certs];
                    tempArr[index].date = Timestamp.fromDate(
                      e.target.valueAsDate
                    );
                    return tempArr;
                  })
                }
                required
              />
              <label>Certification Link</label>
              <InputField
                data-testid={`certifications-link-box-${index}`}
                type="text"
                name="link"
                id="certLink"
                value={cert.link}
                onChange={(e) =>
                  setCertifications((certs) => {
                    let tempArr = [...certs];
                    tempArr[index].link = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div key={index} data-testid="editable-certifications">
              <h3 className="text-xl font-semibold">{cert.name}</h3>
              <h3>{cert.issuer}</h3>
              <h6>
                {`${cert.date.toDate().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`}
              </h6>
              {cert.link && (
                <Link href={cert.link}>
                  <Button>View Credential</Button>
                </Link>
              )}
            </div>
          )}
          <div className="flex items-center">
            {/* External edit award button */}
            {certificationsEditing && certificationsEditing[index] ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid={`certifications-save-btn-${index}`}
              >
                Save Certification
              </Button>
            ) : (
              <EditButton
                data-testid={`certifications-edit-btn-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCertificationsEditing((awdsedits) =>
                    awdsedits.map((awd, i) => (i === index ? !awd : awd))
                  );
                }}
              />
            )}
            {/* External delete award button */}
            <DeleteButton
              data-testid={`certifications-delete-btn-${index}`}
              onClick={(e) => {
                e.preventDefault();
                setCertifications((awds) => awds.filter((_, i) => index !== i));
                setCertificationsEditing((awdedits) =>
                  awdedits.filter((_, i) => index !== i)
                );
              }}
            />
          </div>
        </form>
      ))}
      {/* Adding new award, appears after all award cards */}
      <Button
        data-testid="certifications-add-button"
        className="inline"
        onClick={() => {
          // Append new empty award to current array of certifications
          setCertifications((certs) => [
            ...certs,
            {
              name: '',
              issuer: '',
              date: Timestamp.now(),
            },
          ]);
          setCertificationsEditing((certs) => [...certs, true]);
        }}
      >
        Add New Certification
      </Button>
    </div>
  );
}
