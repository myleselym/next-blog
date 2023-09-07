type PostTagsProps = {
  tags: string[];
  onTagClick: (tag: string) => void;
};

const PostTags: React.FC<PostTagsProps> = ({ tags, onTagClick }) => (
  <p className="justify-self-end">
    {tags.map((tag) => (
      <span
        key={tag}
        className="cursor-pointer font-inter self-end text-blue-500 hover:text-blue-400 active:text-blue-800"
        onClick={() => onTagClick(tag)}
      >
        {tag}{" "}
      </span>
    ))}
  </p>
);

export default PostTags;
