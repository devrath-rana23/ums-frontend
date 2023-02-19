import ImageUrls from "../../utils/constants/ImageUrls";

export const Dashboard = () => {
  const { comingSoon } = ImageUrls;
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="w-2/5">
        <img src={comingSoon} alt="Coming Soon" className="w-full" />
      </span>
      <p className="font-inter text-2xl font-semibold leading-8	text-gray-900">
        Dashboard coming soon!!
      </p>
    </div>
  );
};
