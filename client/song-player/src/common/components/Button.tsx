import Link from "next/link";

const Button = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link className="md:mx-0 mx-auto" href={`/${link}`}>
      <button
        type="button"
        className="text-white  bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800"
      >
        {title}
      </button>{" "}
    </Link>
  );
};

export default Button;
