import { db } from '@/config/firestore';
import { getDoc, doc } from 'firebase/firestore';

async function getUser(uid: string) {
  const res = await getDoc(doc(db.users, uid));
  return res.data();
}

export default async function linkLayout({ params, children }) {
  const user = await getUser(params.uid);
  if (!user || !user.name || !user.email || user.isCompany === true)
    return <h1 className="text-2xl font-extrabold">Invalid User.</h1>;

  return (
    <div className="container mx-auto text-white">
      <h1
        className="mb-3 text-left text-7xl font-extrabold"
        data-testid="title"
      >
        {`${user.name}'s Links`}
      </h1>
      {children}
      <div className="h-32"></div>
    </div>
  );
}
