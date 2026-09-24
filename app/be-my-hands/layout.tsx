export default function BeMyHandsLayout({
  children,
}: LayoutProps<"/be-my-hands">) {
  return (
    <div className="experiment experiment--be-my-hands">{children}</div>
  );
}
