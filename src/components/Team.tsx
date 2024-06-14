import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://media.licdn.com/dms/image/D4D03AQE2-wdkY6yEuA/profile-displayphoto-shrink_800_800/0/1705437751690?e=1723680000&v=beta&t=wTK6EKxFqaXDurxlW0xM0b3x3hrwPHK3ez6aayG9I-k",
    name: "Harsh Patel",
    position: "Team Lead",
    description: "Guiding visionary teams to deliver exceptional outcomes, fostering collaboration and innovation to achieve strategic goals effectively",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/harshpatel0904/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/5131.ha_/",
      },
    ],
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/D4D35AQGGOGwVD8wi_A/profile-framedphoto-shrink_800_800/0/1702410196521?e=1718967600&v=beta&t=S-LdBwpOcpqmwFEAzPnpVkNnZ8ogIheRhNeeihVyYr0",
    name: "Shivansh Mahajan",
    position: "AI/ML Lead",
    description: "Pioneering advancements in artificial intelligence and machine learning, transforming complex data into actionable insights and predictive models.",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/shivansh1976/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/shivansh_1976/",
      },
    ],
  },
  {
    imageUrl: "https://media.licdn.com/dms/image/D4D03AQGKX9kumw_STg/profile-displayphoto-shrink_200_200/0/1708521678033?e=2147483647&v=beta&t=06FJ_3SyuOwcDCfp1U2bmMEwvbd4Kh2PDtZ7ZDj7MCk",
    name: "Vansh Verma",
    position: "Web Developer",
    description: "Building captivating web experiences with intuitive user interfaces, blending creativity with technical expertise for optimal digital presence.",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/vansh-verma-b48290293/" },

      {
        name: "Instagram",
        url: "https://www.instagram.com/stfu_vanshhh/",
      },
    ],
  },
  {
    imageUrl: "https://pbs.twimg.com/profile_images/1777597329333510144/wVg8Z4sz_400x400.jpg",
    name: "Shashwat Singh",
    position: "Backend Developer",
    description: "Crafting robust server-side applications with efficiency and scalability, leveraging cutting-edge technologies to drive seamless functionality.",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/shashwatps/" },
      {
        name: "Instagram",
        url: "https://www.instagram.com/shashwatp_s/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        A dynamic team of innovators that built Sandesh at Innofusion.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks, description }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{description}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
