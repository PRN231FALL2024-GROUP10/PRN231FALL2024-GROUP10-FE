import { authOptions } from '@/libs/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    redirect('/auth/signin');
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
