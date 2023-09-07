import Image from "next/image";

type AuthorSectionProps = {
  author: string;
  email: string;
  image: string;
  onClick: () => void;
};

const AuthorSection: React.FC<AuthorSectionProps> = ({
  author,
  email,
  image,
  onClick,
}) => (
  <div
    id="author-section"
    className="max-lg:-order-1 mx-auto flex items-center justify-self-center justify-start gap-3 cursor-pointer"
    onClick={onClick}
  >
    <Image
      src={image}
      alt="user_image"
      width={40}
      height={40}
      className="object-contain rounded-full"
    />
    <div className="flex flex-col">
      <h3 className="font-semibold text-gray-900">{author}</h3>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  </div>
);

export default AuthorSection;
