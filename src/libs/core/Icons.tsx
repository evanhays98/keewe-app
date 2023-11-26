import React from 'react';
import { createUseStyles } from 'react-jss';
import { AiOutlineHome } from 'react-icons/ai';
import { RiHistoryFill, RiTokenSwapLine } from 'react-icons/ri';
import { Colors, Theme, theme } from '../theme';
import classnames from 'classnames';
import {
  IoCheckmarkCircle,
  IoCloseCircleSharp,
  IoReloadSharp,
} from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

const useStyles = createUseStyles<string, { size: number; color: Colors }, any>(
  (theme: Theme) => ({
    icon: (props) => ({
      fontSize: props.size,
      color: theme.colors[props.color],
      fontWeight: 700,
      position: 'relative',
      height: 24,
      width: 24,
    }),
  }),
);

export enum Icon {
  home = 'home',
  swap = 'swap',
  load = 'load',
  payment = 'payment',
  history = 'history',
  send = 'send',
  receive = 'receive',
  exchange = 'exchange',
  success = 'success',
  fail = 'fail',
}

interface Props {
  icon: Icon;
  size?: number;
  color?: Colors;
  className?: string;
  style?: React.CSSProperties;
}

export const Icons = ({ icon, size, color, className, style }: Props) => {
  const classes = useStyles({
    size: size || theme.icon.large,
    color: color || 'black',
    theme,
  });
  const classNames = classnames(classes.icon, className);
  return (
    <>
      {icon === Icon.home && (
        <AiOutlineHome className={classNames} style={style} />
      )}
      {icon === Icon.swap && (
        <RiTokenSwapLine className={classNames} style={style} />
      )}
      {icon === Icon.load && (
        <div className={classNames} style={style}>
          <IoReloadSharp />
        </div>
      )}
      {icon === Icon.payment && (
        <div className={classNames} style={style}>
          <MdOutlinePayment />
        </div>
      )}
      {icon === Icon.history && (
        <div className={classNames} style={style}>
          <RiHistoryFill />
        </div>
      )}
      {icon === Icon.send && (
        <div className={classNames} style={style}>
          <FaArrowRight />
        </div>
      )}
      {icon === Icon.receive && (
        <div className={classNames} style={style}>
          <FaArrowLeft />
        </div>
      )}
      {icon === Icon.exchange && (
        <div className={classNames} style={style}>
          <FaArrowRightArrowLeft />
        </div>
      )}
      {icon === Icon.success && (
        <div className={classNames} style={style}>
          <IoCheckmarkCircle />
        </div>
      )}
      {icon === Icon.fail && (
        <div className={classNames} style={style}>
          <IoCloseCircleSharp />
        </div>
      )}
    </>
  );
};
