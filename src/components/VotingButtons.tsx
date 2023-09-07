"use client";
import { Button } from "@nextui-org/react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

type VotingButtonsProps = {
  hasLiked: boolean;
  hasDisliked: boolean;
  likes: number | undefined;
  dislikes: number | undefined;
  onVote: (action: "like" | "dislike") => void;
};

const VotingButtons: React.FC<VotingButtonsProps> = ({
  hasLiked,
  hasDisliked,
  likes,
  dislikes,
  onVote,
}) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        color={hasLiked ? "primary" : "default"}
        variant="bordered"
        onClick={() => onVote("like")}
      >
        <MdThumbUp color={hasLiked ? "blue" : "black"} /> {likes}
      </Button>
      <Button
        color={hasDisliked ? "primary" : "default"}
        variant="bordered"
        onClick={() => onVote("dislike")}
      >
        <MdThumbDown color={hasDisliked ? "blue" : "black"} /> {dislikes}
      </Button>
    </div>
  );
};
export default VotingButtons;
