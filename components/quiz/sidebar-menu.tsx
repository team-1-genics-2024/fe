const SidebarMenu = ({
  children,
  title,
  active,
  onClick,
  menuOpen,
}: {
  title: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  menuOpen: boolean;
}) => {
  // console.log(active);
  return (
    <div
      onClick={onClick}
      className={`${
        active ? "bg-[#2f8ac71a]" : ""
      }   flex justify-between mx-3  py-4 px-3 rounded-[100px] hover:cursor-pointer hover:bg-[#2f8ac71a] group`}
    >
      <div className="flex items-center">
        {children}
        <div>
          <p
            className={`${active ? "text-[#2F8AC7]" : "text-[#454B4F]"} ${
              menuOpen ? "block" : "hidden"
            }   duration-300 ease-in-out md:block  m-0 p-0 ml-3 text-xs group-hover:text-[#2F8AC7]`}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
