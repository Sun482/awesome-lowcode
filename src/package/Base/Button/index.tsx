export const Render = (props: any) => {
  const { item, onClick } = props;
  return <button onClick={onClick}>{item}</button>;
};
