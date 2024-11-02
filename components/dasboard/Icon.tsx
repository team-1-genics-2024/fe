const HomeIcon = ({ className }: { className: string }) => {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" />
    </svg>
  );
};
const SertivIcon = ({ className }: { className: string }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12H12V10H8V12ZM8 9H16V7H8V9ZM8 6H16V4H8V6ZM6 16C5.45 16 4.97917 15.8042 4.5875 15.4125C4.19583 15.0208 4 14.55 4 14V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H6ZM6 14H18V2H6V14ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4H2V18H16V20H2Z" />
    </svg>
  );
};
const FavIcon = ({ className }: { className: string }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" />
    </svg>
  );
};
const BurgerIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12L0 10L18 10V12L0 12ZM0 7L0 5L18 5V7L0 7ZM0 2L0 0L18 0V2L0 2Z" />
    </svg>
  );
};

export { HomeIcon, SertivIcon, FavIcon, BurgerIcon };
