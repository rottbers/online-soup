import s from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => <div className={s.layout}>{children}</div>;

export default Layout;
