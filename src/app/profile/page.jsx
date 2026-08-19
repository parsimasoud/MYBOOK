import getCurrentUser from "@/lib/getCurrentUser";


export default async function ProfilePage() {

  const user = await getCurrentUser();


  return (
    <div className="p-10">

      <h1 className="text-3xl mb-6">
        Profile
      </h1>


      {user ? (
        <div>
          <p>
            Name: {user.name}
          </p>

          <p>
            Email: {user.email}
          </p>

          <p>
            Role: {user.role}
          </p>
        </div>
      ) : (
        <p>
          Not logged in
        </p>
      )}

    </div>
  );
}