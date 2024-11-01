// components
import LinkButton from "./components/LinkButton";

// next auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <h1 className="header">Dashboard</h1>
      <p className="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quod neque
        vero reprehenderit nostrum amet, nesciunt veniam totam, doloribus
        laudantium quis nulla harum! Obcaecati magni cumque magnam, sunt tempore
        pariatur!
      </p>

      <div className="flex justify-center">
        {/* <button>View Tickets</button> */}
        <LinkButton text={"View Posts"} href="/posts" />
      </div>
    </main>
  );
}
