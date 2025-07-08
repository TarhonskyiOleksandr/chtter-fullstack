interface AvatarProps {
  name: string;
  avatar?: string;
}

export const Avatar = ({ name, avatar }: AvatarProps) => {
  return (
    <div className="avatar avatar-placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-12">
        {
          avatar ?
          <img src={avatar} alt={name} />
          :
          <span className="text-lg">{name[0].toUpperCase()}</span>
        }
      </div>
    </div>
  );
};
