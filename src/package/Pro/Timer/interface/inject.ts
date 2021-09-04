export type ButtonInject = {
  text: string; // 按钮文字
  onClick?: React.MouseEventHandler<HTMLElement>; // 点击事件
  onShow?: () => any; // onShow周期
};
