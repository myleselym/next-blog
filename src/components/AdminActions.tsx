import { Button } from "@nextui-org/react";

type AdminActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const AdminActions: React.FC<AdminActionsProps> = ({ onEdit, onDelete }) => (
  <div className="gap-4 border-t border-gray-100 flex justify-center">
    <Button variant="bordered" onClick={onEdit}>
      Edit
    </Button>
    <Button variant="bordered" onClick={onDelete}>
      Delete
    </Button>
  </div>
);

export default AdminActions;
