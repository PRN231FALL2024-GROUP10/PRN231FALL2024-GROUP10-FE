import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PostHome from "@/components/Layouts/PostHomeLayout";
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";

const Home = () => {
  // const router = useRouter();
  // const [notifications, setNotifications] = useState([]);
  
  // useEffect(() => {
  //   setNotifications([
  //     { id: 1, message: "New job match: Senior Developer at InnoTech" },
  //     { id: 2, message: "Sarah Lee viewed your profile" },
  //     { id: 3, message: "Reminder: Tech Networking Mixer today at 6 PM" },
  //   ]);
  // }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <DefaultLayout>
        <PostHomeLayout>
          <PostList key={''}>

          </PostList>
        </PostHomeLayout>
      </DefaultLayout>
    </div>
  );
};

export default Home;
