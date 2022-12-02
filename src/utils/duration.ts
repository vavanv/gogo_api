import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getDuration = (start: dayjs.Dayjs) => {
  dayjs.extend(duration);
  const d = dayjs.duration(dayjs().diff(dayjs(start)));
  return d.asMilliseconds();
};
