import Link from 'next/link';
import { BiArrowBack, BiCart, BiX } from 'react-icons/bi';

import s from './RoundLink.module.scss';

interface Props {
  href: string;
  type: 'cart' | 'back' | 'close';
  badge?: boolean;
  badgeContent?: string | number;
}

const RoundLink: React.FC<Props> = ({ href, type, badge, badgeContent }) => {
  const icon = (() => {
    switch (type) {
      case 'cart':
        return <BiCart />;
      case 'back':
        return <BiArrowBack />;
      case 'close':
        return <BiX />;
    }
  })();

  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={s.roundLink}>
        {icon}
        {badge && <span>{badgeContent}</span>}
      </a>
    </Link>
  );
};

export default RoundLink;
