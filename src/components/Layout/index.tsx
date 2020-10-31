import { motion } from 'framer-motion';

import s from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={s.layout}
  >
    {children}
  </motion.div>
);

export default Layout;
