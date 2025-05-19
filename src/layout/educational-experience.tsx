import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2018 - 2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            I completed my B.Tech. in Information Technology from the
            <br />
            <b>University Of Calcutta</b>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            CGPA : <b>8.1</b>
          </p>
        </div>
      ),
    },
    {
      title: "Early 2017",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            I have completed my Higher Secondary Education from <br />
            <b>Jhargram Banitirtha High School</b>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            Percentage : <b>86.40</b>
          </p>
        </div>
      ),
    },
    {
      title: "Early 2015",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            I have completed my Secondary Education from <br />
            <b>Baikunthapur H. F. C. M. High School</b>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            Percentage : <b>89.72</b>
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="container mx-auto px-4 py-16">
      <Timeline data={data} />
    </div>
  );
}
