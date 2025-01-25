export const WrapperContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`${className ?? ""} px-4 sm:px-6 md:px-8 lg:px-10`}>
      {children}
    </div>
  );
};
