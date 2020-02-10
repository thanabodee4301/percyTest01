import Link from 'next/link';
import style from './menu.less';

const Menu = () => (
  <div>
    <Link href="/">
      <a className={style.linkStyle}>Facebook</a>
    </Link>
    <Link href="/google">
      <a className={style.linkStyle}>Google</a>
    </Link>
    <Link href="/email">
      <a className={style.linkStyle}>Email</a>
    </Link>
    <Link href="/line">
      <a className={style.linkStyle}>Line</a>
    </Link>
  </div>
);

export default Menu;